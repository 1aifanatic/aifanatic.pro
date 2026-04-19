import React from "react";
import Link from "next/link";

export default function Work() {
  const projects = [
    {
      id: "risk-orbit",
      name: "Risk Orbit",
      problem: "Supply chain risk management requires real-time monitoring of multiple data sources and rapid assessment of potential disruptions.",
      role: "Manager of Solution Architecture & Lead Developer",
      built: [
        "Multi-agent system using UiPath Coded Agents with LangChain integration",
        "Context grounding with MCP (Model Context Protocol) for accurate risk assessment",
        "Real-time data aggregation from multiple supply chain data sources",
        "UiPath SDK-supported automation workflows for risk response actions",
        "Intelligent agent orchestration for parallel risk analysis tasks",
      ],
      results: [
        "Top 7 Winner in UiPath Specialist Coded Agent Challenge",
        "Recognized as innovative approach to enterprise AI agent architecture",
      ],
      links: [
        {
          label: "Ashling Article",
          url: "https://ashling.ai/resources/risk-orbit-uipath-coded-agents-meet-real-world-supply-chain-risk",
        },
        {
          label: "UiPath Forum Discussion",
          url: "https://forum.uipath.com/t/risk-orbit-uipath-coded-agent-with-langchain-mcp-context-grounding-uipath-sdk-supported/5676124",
        },
      ],
      artifacts: [
        // Placeholder - artifacts would be added when available
        // { label: "Case Study PDF", url: "/artifacts/risk-orbit-case-study.pdf" },
        // { label: "Architecture Diagram", url: "/artifacts/risk-orbit-architecture.png" },
      ],
    },
  ];

  return (
    <section className="bg-white dark:bg-gray-800">
      <div className="max-w-6xl mx-auto h-32 bg-white dark:bg-gray-800">
        <h1 className="text-5xl md:text-6xl font-bold py-12 text-center md:text-left">
          Selected Work
        </h1>
      </div>
      <div className="bg-[#F1F1F1] dark:bg-gray-900 px-4">
        <div className="max-w-6xl mx-auto pt-12 pb-24">
          <p className="text-xl text-gray-700 dark:text-gray-300 mb-12">
            A curated set of projects, write-ups, and systems I've led or architected. Each entry includes context, what I did, and supporting links.
          </p>

          {projects.map((project) => (
            <div
              key={project.id}
              id={project.id}
              className="mb-16 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 md:p-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-200 mb-6">
                {project.name}
              </h2>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Problem
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {project.problem}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Role
                </h3>
                <p className="text-gray-600 dark:text-gray-400">{project.role}</p>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  Built
                </h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
                  {project.built.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  Results
                </h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
                  {project.results.map((result, idx) => (
                    <li key={idx}>{result}</li>
                  ))}
                </ul>
              </div>

              {project.links && project.links.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    Links
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {project.links.map((link, idx) => (
                      <a
                        key={idx}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {project.artifacts && project.artifacts.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    Artifacts
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {project.artifacts.map((artifact, idx) => (
                      <a
                        key={idx}
                        href={artifact.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors"
                      >
                        {artifact.label}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

