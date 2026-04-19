import React from "react";
import userData from "@constants/data";

export default function Bio() {
  const focusAreas = [
    "Enterprise automation and solution architecture",
    "AI systems, agents, and LLM workflows",
    "UiPath ecosystem strategy and delivery",
    "Tech writing and community education",
  ];

  const recognitionLinks = [
    {
      label: "Wired feature on AI agent liability",
      url: "https://www.wired.com/story/ai-agents-legal-liability-issues/",
    },
    {
      label: "TechX Awards finalist (AI Innovation Award)",
      url: "https://www.chattanoogapulse.com/local-news/business-news/chatech-announces-finalists-for-the-6th-annual-techx-awards/",
    },
  ];

  return (
    <section className="bg-white dark:bg-gray-800">
      <div className="max-w-6xl mx-auto px-4 pt-12 pb-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
          Biography
        </p>
        <h1 className="mt-3 text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">
          About Naveen
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
          Manager of Solution Architecture, Gen AI Engineer, and tech writer focused on building
          practical automation systems for enterprise teams.
        </p>
      </div>

      <div className="bg-[#F1F1F1] dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 pb-16">
          <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
            <aside className="space-y-6">
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  At a glance
                </h2>
                <div className="mt-4 space-y-4 text-sm text-gray-600 dark:text-gray-300">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                      Role
                    </p>
                    <p className="font-semibold text-gray-800 dark:text-gray-100">
                      {userData.designation}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                      Location
                    </p>
                    <p className="font-semibold text-gray-800 dark:text-gray-100">
                      {userData.address}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                      Current
                    </p>
                    <a
                      href={userData.about.currentPositionUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-gray-800 hover:text-blue-600 dark:text-gray-100 dark:hover:text-blue-400"
                    >
                      {userData.about.currentPosition}
                    </a>
                  </div>
                </div>
                <div className="mt-6 flex flex-col gap-3">
                  <a
                    href={`mailto:${userData.email}`}
                    className="inline-flex items-center justify-center rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow transition hover:-translate-y-0.5 hover:bg-slate-800"
                  >
                    Email me
                  </a>
                  <a
                    href={userData.socialLinks.topmate}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-gray-300 hover:text-blue-600 dark:border-gray-700 dark:text-gray-200 dark:hover:text-blue-400"
                  >
                    Book time
                  </a>
                </div>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Links
                </h2>
                <div className="mt-4 grid gap-2">
                  <a
                    href={userData.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm font-medium text-gray-700 hover:border-blue-300 hover:text-blue-600 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:text-blue-400"
                  >
                    LinkedIn
                    <span className="text-xs text-gray-400">Connect</span>
                  </a>
                  <a
                    href={userData.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm font-medium text-gray-700 hover:border-blue-300 hover:text-blue-600 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:text-blue-400"
                  >
                    GitHub
                    <span className="text-xs text-gray-400">Code</span>
                  </a>
                  <a
                    href={userData.socialLinks.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm font-medium text-gray-700 hover:border-blue-300 hover:text-blue-600 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:text-blue-400"
                  >
                    YouTube
                    <span className="text-xs text-gray-400">Videos</span>
                  </a>
                  <a
                    href={userData.socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm font-medium text-gray-700 hover:border-blue-300 hover:text-blue-600 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:text-blue-400"
                  >
                    Twitter
                    <span className="text-xs text-gray-400">Updates</span>
                  </a>
                </div>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Focus areas
                </h2>
                <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  {focusAreas.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1 h-2 w-2 rounded-full bg-blue-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Recognition
                </h2>
                <div className="mt-4 grid gap-2">
                  {recognitionLinks.map((item) => (
                    <a
                      key={item.url}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm font-medium text-gray-700 hover:border-blue-300 hover:text-blue-600 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:text-blue-400"
                    >
                      {item.label}
                      <span className="text-xs text-gray-400">Read</span>
                    </a>
                  ))}
                </div>
              </div>
            </aside>

            <div className="space-y-6">
              <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Overview
                </h2>
                <div className="mt-4 space-y-4 text-base leading-relaxed text-gray-600 dark:text-gray-300">
                  {userData.bio.description?.map((desc, idx) => (
                    <p key={idx}>{desc}</p>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Collaboration
                </h2>
                <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
                  Interested in enterprise automation, AI adoption, or technical
                  writing support? Reach out and I will respond quickly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

