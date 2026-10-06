// Shared Postgres counters keep the limits effective across Vercel instances.
export async function reserveChatRequest(pool, visitor) {
  await pool.query(`CREATE TABLE IF NOT EXISTS public.portfolio_chat_limits (
    key TEXT PRIMARY KEY, count INTEGER NOT NULL, resets_at TIMESTAMPTZ NOT NULL
  )`);
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await client.query("SET LOCAL statement_timeout = '4000ms'");
    for (const [key, limit, seconds] of [["global", 200, 86400], [`visitor:${visitor}`, 10, 3600]]) {
      const result = await client.query(`INSERT INTO public.portfolio_chat_limits (key, count, resets_at)
        VALUES ($1, 1, NOW() + $3 * INTERVAL '1 second')
        ON CONFLICT (key) DO UPDATE SET
          count = CASE WHEN public.portfolio_chat_limits.resets_at <= NOW() THEN 1 ELSE public.portfolio_chat_limits.count + 1 END,
          resets_at = CASE WHEN public.portfolio_chat_limits.resets_at <= NOW() THEN EXCLUDED.resets_at ELSE public.portfolio_chat_limits.resets_at END
        WHERE public.portfolio_chat_limits.resets_at <= NOW() OR public.portfolio_chat_limits.count < $2
        RETURNING count`, [key, limit, seconds]);
      if (!result.rowCount) {
        await client.query("ROLLBACK");
        return false;
      }
    }
    await client.query("DELETE FROM public.portfolio_chat_limits WHERE resets_at < NOW() - INTERVAL '1 day'");
    await client.query("COMMIT");
    return true;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}
