import { useState } from "react";

/**
 * Copy-ready Install Commands, one line per Agent. Never gated —
 * see decisions/0006-catalog-stays-open.md.
 */
export default function InstallCommands({ commands, tone = "dark" }) {
  const [copied, setCopied] = useState("");

  const copy = async (agent, command) => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(agent);
      window.setTimeout(() => setCopied((current) => (current === agent ? "" : current)), 2000);
    } catch {
      setCopied("");
    }
  };

  const dark = tone === "dark";

  return (
    <div className="space-y-4">
      {commands.map((entry) => (
        <div key={entry.id}>
          <div className="flex items-center justify-between gap-4">
            <p
              className={`text-xs font-semibold uppercase tracking-[.16em] ${dark ? "text-[#a8c7ee]" : "text-[#5f6864] dark:text-[#b7c0bb]"}`}
            >
              {entry.label}
            </p>
            <button
              type="button"
              onClick={() => copy(entry.id, entry.command)}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-semibold transition ${
                dark
                  ? "border-[#46514c] text-[#b7c0bb] hover:border-[#a8c7ee] hover:text-white"
                  : "border-[#d8ddd8] text-[#5f6864] hover:border-[#174b8b] hover:text-[#174b8b] dark:border-[#46514c] dark:text-[#b7c0bb]"
              }`}
              aria-label={`Copy the ${entry.label} install command`}
            >
              {copied === entry.id ? "Copied" : "Copy"}
            </button>
          </div>
          <pre
            className={`mt-2 overflow-x-auto whitespace-pre-wrap break-words rounded-2xl border p-4 font-mono text-[13px] leading-7 ${
              dark
                ? "border-[#34413d] bg-[#0b1210] text-[#d8e6f7]"
                : "border-[#d8ddd8] bg-white text-[#25332f] dark:border-[#34413d] dark:bg-[#0b1210] dark:text-[#d8e6f7]"
            }`}
          >
            <code>{entry.command}</code>
          </pre>
        </div>
      ))}
    </div>
  );
}
