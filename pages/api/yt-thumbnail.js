/**
 * Same-origin proxy for YouTube poster images.
 * Tries multiple CDNs because some networks block one host but not the other.
 */
const ID_RE = /^[a-zA-Z0-9_-]{11}$/;

function thumbUrls(id) {
  return [
    `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
    `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
    `https://i.ytimg.com/vi/${id}/mqdefault.jpg`,
  ];
}

function looksLikeImage(buf, contentType) {
  const ct = (contentType || "").toLowerCase();
  if (ct.startsWith("image/")) return true;
  if (buf.length >= 3 && buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return true;
  if (
    buf.length >= 8 &&
    buf[0] === 0x89 &&
    buf[1] === 0x50 &&
    buf[2] === 0x4e &&
    buf[3] === 0x47
  ) {
    return true;
  }
  return false;
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  const raw = req.query.id;
  const id = Array.isArray(raw) ? raw[0] : raw;
  if (!id || !ID_RE.test(String(id))) {
    return res.status(400).json({ error: "Invalid or missing id" });
  }

  const safeId = String(id);

  try {
    for (const upstream of thumbUrls(safeId)) {
      const r = await fetch(upstream, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (compatible; aifanatic.pro-thumbnail-proxy/1.0; +https://aifanatic.pro)",
          Accept: "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
        },
      });

      if (!r.ok) continue;

      const buf = Buffer.from(await r.arrayBuffer());
      const ct = r.headers.get("content-type") || "image/jpeg";
      if (!looksLikeImage(buf, ct)) continue;

      res.setHeader("Content-Type", ct.split(";")[0].trim() || "image/jpeg");
      res.setHeader(
        "Cache-Control",
        "public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800"
      );
      return res.status(200).send(buf);
    }

    return res.status(404).end();
  } catch {
    return res.status(502).end();
  }
}
