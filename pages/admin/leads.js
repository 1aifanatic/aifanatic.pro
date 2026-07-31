import { useEffect, useMemo, useState } from "react";
import ContainerBlock from "@components/ContainerBlock";
import Icon from "@components/Icon";

const ENTRIES_ENDPOINT = "/api/leads?kind=guestbook&limit=200";

const csvCell = (value) => `"${String(value ?? "").replace(/"/g, '""')}"`;

const formatDate = (value) =>
  new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));

export default function GuestBookAdmin() {
  const [entries, setEntries] = useState([]);
  const [authorized, setAuthorized] = useState(null);
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const loadEntries = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(ENTRIES_ENDPOINT, {
        credentials: "same-origin",
      });

      if (response.status === 401) {
        setAuthorized(false);
        setEntries([]);
        return false;
      }

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Unable to load the guest book");
      }

      setEntries(data.data || []);
      setAuthorized(true);
      return true;
    } catch (requestError) {
      setError(requestError.message || "Unable to load the guest book");
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch("/api/admin/session", {
          credentials: "same-origin",
        });
        const data = await response.json();

        if (data.authenticated) {
          await loadEntries();
        } else {
          setAuthorized(false);
          setLoading(false);
        }
      } catch (requestError) {
        setAuthorized(false);
        setError(requestError.message || "Unable to check admin access");
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ password }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to sign in");
      }

      setPassword("");
      await loadEntries();
    } catch (requestError) {
      setAuthorized(false);
      setError(requestError.message || "Unable to sign in");
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/session", {
      method: "DELETE",
      credentials: "same-origin",
    });
    setEntries([]);
    setAuthorized(false);
    setSearch("");
  };

  const filteredEntries = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return entries;
    return entries.filter((entry) =>
      `${entry.name} ${entry.email}`.toLowerCase().includes(query)
    );
  }, [entries, search]);

  const stats = useMemo(() => {
    const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    return {
      total: entries.length,
      unique: new Set(entries.map((entry) => entry.email)).size,
      recent: entries.filter(
        (entry) => new Date(entry.created_at).getTime() >= sevenDaysAgo
      ).length,
    };
  }, [entries]);

  const exportToCsv = () => {
    const rows = [
      ["Name", "Email", "Last access"],
      ...filteredEntries.map((entry) => [
        entry.name,
        entry.email,
        new Date(entry.created_at).toISOString(),
      ]),
    ];
    const csv = rows.map((row) => row.map(csvCell).join(",")).join("\r\n");
    const url = window.URL.createObjectURL(
      new Blob([csv], { type: "text/csv;charset=utf-8" })
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = `guest-book-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  if (authorized !== true) {
    return (
      <ContainerBlock
        title="Private Guest Book - Naveen Chatlapalli"
        description="Private portfolio guest-book administration."
        noIndex
      >
        <section className="grid min-h-screen place-items-center bg-[#111716] px-5 py-12 text-[#eef1ed]">
          <div className="w-full max-w-md rounded-[1.75rem] border border-[#34413d] bg-[#18211f] p-7 shadow-[0_28px_80px_rgba(0,0,0,.28)] sm:p-9">
            <div className="flex items-center justify-between gap-4">
              <p className="text-[10px] font-semibold uppercase tracking-[.18em] text-[#a8c7ee]">
                Private administration
              </p>
              <span className="grid h-10 w-10 place-items-center rounded-full border border-[#46514c] text-[#a8c7ee]">
                <Icon name="shield" className="h-5 w-5" />
              </span>
            </div>
            <h1 className="mt-7 text-4xl sm:text-5xl">Guest book</h1>
            <p className="mt-4 leading-7 text-[#b7c0bb]">
              Sign in with your private admin access key to view submitted names
              and email addresses.
            </p>

            <form onSubmit={handleLogin} className="mt-8">
              <label htmlFor="admin-password" className="text-sm font-semibold">
                Admin access key
              </label>
              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                  if (error) setError("");
                }}
                autoComplete="current-password"
                required
                autoFocus
                className="mt-2 min-h-[50px] w-full rounded-xl border border-[#46514c] bg-[#111716] px-4 text-[#eef1ed] focus:border-[#a8c7ee] focus:outline-none focus:ring-2 focus:ring-[#315169]"
              />
              {error && (
                <p
                  role="alert"
                  className="mt-4 rounded-xl border border-red-900 bg-red-950/50 px-4 py-3 text-sm text-red-200"
                >
                  {error}
                </p>
              )}
              <button
                type="submit"
                disabled={loading || !password}
                className="mt-5 inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-[#eef1ed] px-5 text-sm font-semibold text-[#18211f] transition hover:bg-[#a8c7ee] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Checking access…" : "Open guest book"}
                {!loading && <Icon name="arrowRight" />}
              </button>
            </form>
            <p className="mt-5 text-xs leading-5 text-[#96a09a]">
              The access key stays server-side. Visitor passwords are never
              collected or displayed.
            </p>
          </div>
        </section>
      </ContainerBlock>
    );
  }

  return (
    <ContainerBlock
      title="Private Guest Book - Naveen Chatlapalli"
      description="Private portfolio guest-book administration."
      noIndex
    >
      <section className="min-h-screen bg-[#f8f7f3] px-5 py-8 text-[#18211f] dark:bg-[#111716] dark:text-[#eef1ed] sm:px-8">
        <div className="mx-auto max-w-6xl">
          <header className="flex flex-col gap-5 border-b border-[#d8ddd8] pb-7 dark:border-[#34413d] sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow">Private administration</p>
              <h1 className="mt-3 text-4xl sm:text-5xl">Guest-book entries</h1>
              <p className="mt-3 text-[#5f6864] dark:text-[#b7c0bb]">
                People who requested access to UiPath Boost on GitHub.
              </p>
            </div>
            <button type="button" onClick={handleLogout} className="button-secondary self-start px-4 py-2.5 sm:self-auto">
              Sign out
            </button>
          </header>

          {error && (
            <p role="alert" className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-900 dark:bg-red-950/50 dark:text-red-200">
              {error}
            </p>
          )}

          <div className="mt-7 grid gap-4 sm:grid-cols-3">
            {[
              ["Entries", stats.total],
              ["Unique emails", stats.unique],
              ["Last 7 days", stats.recent],
            ].map(([label, value]) => (
              <div key={label} className="rounded-[1.25rem] border border-[#d8ddd8] bg-white p-5 dark:border-[#34413d] dark:bg-[#18211f]">
                <p className="font-serif text-4xl">{value}</p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-[.12em] text-[#5f6864] dark:text-[#b7c0bb]">
                  {label}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-7 overflow-hidden rounded-[1.4rem] border border-[#d8ddd8] bg-white dark:border-[#34413d] dark:bg-[#18211f]">
            <div className="flex flex-col gap-4 border-b border-[#d8ddd8] p-5 dark:border-[#34413d] sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl">Access list</h2>
                <p className="mt-1 text-sm text-[#5f6864] dark:text-[#b7c0bb]" aria-live="polite">
                  Showing {filteredEntries.length} of {entries.length}
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <label className="sr-only" htmlFor="guest-search">Search guest book</label>
                <input
                  id="guest-search"
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search name or email"
                  className="min-h-[44px] rounded-full border border-[#c7cfca] bg-[#f8f7f3] px-4 text-sm focus:border-[#174b8b] focus:outline-none focus:ring-2 focus:ring-[#91aed2] dark:border-[#46514c] dark:bg-[#111716]"
                />
                <button type="button" onClick={exportToCsv} disabled={!filteredEntries.length} className="button-secondary px-4 py-2.5 disabled:cursor-not-allowed disabled:opacity-50">
                  Export CSV <Icon name="download" />
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse text-left">
                <thead>
                  <tr className="bg-[#e9eff8]/60 text-[10px] uppercase tracking-[.14em] text-[#46514c] dark:bg-[#172c3c] dark:text-[#b7c0bb]">
                    <th scope="col" className="px-5 py-3 font-semibold">Name</th>
                    <th scope="col" className="px-5 py-3 font-semibold">Email</th>
                    <th scope="col" className="px-5 py-3 font-semibold">Last access</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEntries.map((entry) => (
                    <tr key={entry.id} className="border-t border-[#e5e8e4] dark:border-[#34413d]">
                      <td className="whitespace-nowrap px-5 py-4 font-semibold">{entry.name}</td>
                      <td className="whitespace-nowrap px-5 py-4 text-sm text-[#5f6864] dark:text-[#b7c0bb]">
                        <a href={`mailto:${entry.email}`} className="hover:text-[#174b8b] hover:underline dark:hover:text-[#a8c7ee]">
                          {entry.email}
                        </a>
                      </td>
                      <td className="whitespace-nowrap px-5 py-4 text-sm text-[#5f6864] dark:text-[#b7c0bb]">
                        {formatDate(entry.created_at)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {!loading && !filteredEntries.length && (
              <div className="border-t border-[#e5e8e4] px-5 py-14 text-center dark:border-[#34413d]">
                <p className="font-serif text-2xl">No matching entries</p>
                <p className="mt-2 text-sm text-[#5f6864] dark:text-[#b7c0bb]">
                  New guest-book submissions will appear here automatically.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </ContainerBlock>
  );
}

export const getServerSideProps = async ({ res }) => {
  res.setHeader("Cache-Control", "no-store");
  return { props: {} };
};
