import Icon from "./Icon";

/**
 * Long-form documentation for a Catalog, rendered above its skill grid.
 *
 * Optional: only catalogs whose registry entry carries an `overview` show this.
 * A catalog holding a single Skill needs the project explained on the page
 * itself, because one card explains nothing.
 */
export default function CatalogOverview({ overview }) {
  if (!overview) return null;

  return (
    <>
      <section className="border-t border-[#d8ddd8] bg-white/60 dark:border-[#34413d] dark:bg-[#18211f]/50">
        <div className="site-container page-section grid gap-12 lg:grid-cols-[1fr_1fr]">
          <div>
            <p className="eyebrow">What it does for you</p>
            <ul className="mt-6 space-y-3.5">
              {overview.outcomes.map((outcome) => (
                <li key={outcome} className="flex gap-3 leading-7">
                  <span
                    aria-hidden="true"
                    className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#174b8b] dark:bg-[#a8c7ee]"
                  />
                  <span className="text-[#46514c] dark:text-[#c5cec8]">{outcome}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow">How the workflow runs</p>
            <ol className="mt-6 space-y-0">
              {overview.workflow.map((step, index) => (
                <li key={step} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-[#b9cce5] bg-[#e9eff8] font-mono text-[10px] font-bold text-[#174b8b] dark:border-[#315169] dark:bg-[#172c3c] dark:text-[#a8c7ee]">
                      {index + 1}
                    </span>
                    {index < overview.workflow.length - 1 && (
                      <span
                        aria-hidden="true"
                        className="my-1 w-px flex-1 bg-[#d8ddd8] dark:bg-[#34413d]"
                      />
                    )}
                  </div>
                  <span className="pb-4 pt-0.5 leading-6 text-[#46514c] dark:text-[#c5cec8]">
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="border-t border-[#d8ddd8] dark:border-[#34413d]">
        <div className="site-container page-section">
          <p className="eyebrow">Delivery modes</p>
          <h2 className="mt-3 text-3xl sm:text-4xl">Choose how far it takes you.</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {overview.deliveryModes.map((mode) => (
              <div key={mode.name} className="paper-card">
                <p className="font-mono text-sm font-bold text-[#174b8b] dark:text-[#a8c7ee]">
                  {mode.name}
                </p>
                <p className="mt-3 text-sm leading-6 text-[#5f6864] dark:text-[#b7c0bb]">
                  {mode.result}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-14 grid gap-12 lg:grid-cols-[1.1fr_.9fr]">
            <div>
              <p className="eyebrow">Try it</p>
              <p className="mt-4 leading-7 text-[#5f6864] dark:text-[#b7c0bb]">
                Invoke the skill by name, then describe the app and the delivery mode you
                want.
              </p>
              <pre className="mt-5 overflow-x-auto whitespace-pre-wrap break-words rounded-2xl border border-[#34413d] bg-[#0b1210] p-5 font-mono text-[13px] leading-7 text-[#d8e6f7]">
                <code>{overview.quickStart}</code>
              </pre>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                {overview.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#174b8b] dark:text-[#a8c7ee]"
                  >
                    {link.label} <Icon name="arrowRight" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <p className="eyebrow">Check readiness first</p>
              <p className="mt-4 leading-7 text-[#5f6864] dark:text-[#b7c0bb]">
                {overview.preflight.summary}
              </p>
              <pre className="mt-5 overflow-x-auto whitespace-pre-wrap break-words rounded-2xl border border-[#d8ddd8] bg-white p-4 font-mono text-xs leading-6 text-[#25332f] dark:border-[#34413d] dark:bg-[#0b1210] dark:text-[#d8e6f7]">
                <code>{overview.preflight.command}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-[#d8ddd8] bg-white/60 dark:border-[#34413d] dark:bg-[#18211f]/50">
        <div className="site-container page-section grid gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow">What it never does silently</p>
            <p className="mt-4 leading-7 text-[#5f6864] dark:text-[#b7c0bb]">
              Every consequential operation needs explicit authority first. It never asks
              for raw access tokens, passwords, or client secrets — interactive sign-in
              stays in the supported UiPath or GitHub flow.
            </p>
            <ul className="mt-6 space-y-2.5">
              {overview.neverDoesSilently.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-sm leading-6 text-[#46514c] dark:text-[#c5cec8]"
                >
                  <span aria-hidden="true" className="font-mono text-[#6b7670]">
                    ✕
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow">It coordinates, it does not duplicate</p>
            <p className="mt-4 leading-7 text-[#5f6864] dark:text-[#b7c0bb]">
              Product behaviour stays with the skills that own it. This one sequences them.
            </p>
            <dl className="mt-6 divide-y divide-[#d8ddd8] border-y border-[#d8ddd8] dark:divide-[#34413d] dark:border-[#34413d]">
              {overview.owners.map((owner) => (
                <div key={owner.name} className="py-4">
                  <dt className="font-mono text-sm font-semibold text-[#174b8b] dark:text-[#a8c7ee]">
                    {owner.name}
                  </dt>
                  <dd className="mt-1.5 text-sm leading-6 text-[#5f6864] dark:text-[#b7c0bb]">
                    {owner.owns}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
    </>
  );
}
