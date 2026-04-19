import Head from "next/head";
import ContainerBlock from "../components/ContainerBlock";
import { useState } from "react";

export default function CareerProgression() {
  const [expandedPhases, setExpandedPhases] = useState({});

  const togglePhase = (phaseId) => {
    setExpandedPhases(prev => ({
      ...prev,
      [phaseId]: !prev[phaseId]
    }));
  };

  return (
    <ContainerBlock
      title="Career Progression & Promotion Plan - Naveen Chatlapalli"
      description="Structured 6-month career progression plan with OKRs for advancing into solution architecture leadership (Manager of Solution Architecture)."
    >
      <Head>
        <title>Career Progression & Promotion Plan - Naveen Chatlapalli</title>
        <meta name="description" content="Structured 6-month career progression plan with OKRs for advancing into solution architecture leadership (Manager of Solution Architecture)." />
      </Head>

      <div className="bg-white dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-20">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Career Progression Plan
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-4">
              Structured 6-Month Career Advancement Framework
            </p>
            <div className="inline-flex items-center bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-4 py-2 rounded-full text-sm font-medium">
              Role: Manager of Solution Architecture
            </div>
          </div>

          {/* Executive Summary */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Executive Summary</h2>
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900 dark:to-purple-900 rounded-lg p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Plan Overview</h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    This document outlines a structured 6-month career progression plan for Naveen, aligning business impact with professional growth. The goal is to establish clear Objectives & Key Results (OKRs) that provide a well-defined path for advancing into the Manager of Solution Architecture role.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-gray-700 dark:text-gray-300">Measurable contributions to technical excellence</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-gray-700 dark:text-gray-300">Strategic mentorship and thought leadership</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-gray-700 dark:text-gray-300">Alignment with leadership expectations</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Success Metrics</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center bg-white dark:bg-gray-800 rounded-lg p-4">
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">6</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Months Duration</div>
                    </div>
                    <div className="text-center bg-white dark:bg-gray-800 rounded-lg p-4">
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">13</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Core Objectives</div>
                    </div>
                    <div className="text-center bg-white dark:bg-gray-800 rounded-lg p-4">
                      <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">3</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Career Phases</div>
                    </div>
                    <div className="text-center bg-white dark:bg-gray-800 rounded-lg p-4">
                      <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">35+</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Key Results</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-blue-100 dark:bg-blue-800 rounded-lg">
                <p className="text-blue-800 dark:text-blue-200 font-medium">
                  <strong>Success Commitment:</strong> If Naveen successfully meets these OKRs and a business need exists, we will move forward with promotion to Manager of Solution Architecture, principal-equivalent technical leadership, or an equivalent role.
                </p>
              </div>
            </div>
          </div>

          {/* Career Progression Phases */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Career Progression Phases</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 italic">Click on each phase to view detailed objectives and key results.</p>
            
            {/* Phase 1: Months 1-2 */}
            <div className="mb-6 bg-white dark:bg-gray-700 rounded-lg shadow-lg">
              <button 
                onClick={() => togglePhase('phase1')}
                className="w-full p-6 text-left hover:bg-gray-50 dark:hover:bg-gray-600 rounded-lg transition-colors"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    Phase 1: Laying the Foundation & Quick Wins (Months 1-2)
                  </h3>
                  <span className="text-2xl text-gray-400">
                    {expandedPhases.phase1 ? '−' : '+'}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  5 Core Objectives • UnSloth Enhancement • Pre-Sales Excellence • Knowledge Base Creation
                </p>
              </button>
              {expandedPhases.phase1 && (
                <div className="px-6 pb-6 space-y-6 border-t border-gray-200 dark:border-gray-600 pt-6">
                  
                  {/* Objective 1 */}
                  <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-3">
                      🎯 Objective 1: Enhance & Standardize UnSloth for Internal Adoption
                    </h4>
                    <ul className="space-y-2 text-blue-700 dark:text-blue-300">
                      <li><strong>KR 1.1:</strong> Convert UnSloth to align with Ashling Azure standards (OAuth + VPN security)</li>
                      <li><strong>KR 1.2:</strong> Move UnSloth code to Ashling Azure DevOps for streamlined deployment</li>
                      <li><strong>KR 1.3:</strong> Track usability records (users, time saved, value created)</li>
                      <li><strong>KR 1.4:</strong> Generate at least 5 SDDs and 5 PDDs using UnSloth</li>
                    </ul>
                  </div>

                  {/* Objective 2 */}
                  <div className="bg-green-50 dark:bg-green-900 rounded-lg p-4">
                    <h4 className="font-semibold text-green-800 dark:text-green-200 mb-3">
                      🎯 Objective 2: Strengthen Pre-Sales & Technical Advisory Contributions
                    </h4>
                    <ul className="space-y-2 text-green-700 dark:text-green-300">
                      <li><strong>KR 2.1:</strong> Review and provide feedback on at least 6 pre-sales handoff documents</li>
                      <li><strong>KR 2.2:</strong> Contribute to shaping 2 high-value deals through technical advisory</li>
                      <li><strong>KR 2.3:</strong> Achieve at least 80% satisfaction rating on advisory inputs</li>
                    </ul>
                  </div>

                  {/* Objective 3 */}
                  <div className="bg-purple-50 dark:bg-purple-900 rounded-lg p-4">
                    <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-3">
                      🎯 Objective 3: Establish Internal Architecture Knowledge Base (Microsoft Loop)
                    </h4>
                    <ul className="space-y-2 text-purple-700 dark:text-purple-300">
                      <li><strong>KR 3.1:</strong> Create MVP knowledge base with at least 3 core sections</li>
                      <li><strong>KR 3.2:</strong> Publish 2 bite-sized internal training resources</li>
                      <li><strong>KR 3.3:</strong> Engage at least 5 architects for feedback</li>
                    </ul>
                  </div>

                  {/* Objective 4 */}
                  <div className="bg-orange-50 dark:bg-orange-900 rounded-lg p-4">
                    <h4 className="font-semibold text-orange-800 dark:text-orange-200 mb-3">
                      🎯 Objective 4: Improve DevOps Adherence & Project Health Visibility
                    </h4>
                    <ul className="space-y-2 text-orange-700 dark:text-orange-300">
                      <li><strong>KR 4.1:</strong> Work with at least 2 project teams on Azure DevOps best practices</li>
                      <li><strong>KR 4.2:</strong> Create project health tracking dashboard for executive review</li>
                      <li><strong>KR 4.3:</strong> Conduct 1 sprint ceremony audit with 2+ improvement opportunities</li>
                    </ul>
                  </div>

                  {/* Objective 5 */}
                  <div className="bg-teal-50 dark:bg-teal-900 rounded-lg p-4">
                    <h4 className="font-semibold text-teal-800 dark:text-teal-200 mb-3">
                      🎯 Objective 5: Kickstart UiPath MVP Candidate Mentorship
                    </h4>
                    <ul className="space-y-2 text-teal-700 dark:text-teal-300">
                      <li><strong>KR 5.1:</strong> Identify and engage with 2-3 potential MVP candidates</li>
                      <li><strong>KR 5.2:</strong> Conduct initial MVP mentorship session</li>
                      <li><strong>KR 5.3:</strong> Create personalized contribution roadmap for each candidate</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Phase 2: Months 3-4 */}
            <div className="mb-6 bg-white dark:bg-gray-700 rounded-lg shadow-lg">
              <button 
                onClick={() => togglePhase('phase2')}
                className="w-full p-6 text-left hover:bg-gray-50 dark:hover:bg-gray-600 rounded-lg transition-colors"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    Phase 2: Expanding Influence & Thought Leadership (Months 3-4)
                  </h3>
                  <span className="text-2xl text-gray-400">
                    {expandedPhases.phase2 ? '−' : '+'}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  4 Core Objectives • AI/Cloud Expertise • Thought Leadership • MVP Expansion • Technical Strategy
                </p>
              </button>
              {expandedPhases.phase2 && (
                <div className="px-6 pb-6 space-y-6 border-t border-gray-200 dark:border-gray-600 pt-6">
                  
                  {/* Objective 6 */}
                  <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-3">
                      🎯 Objective 6: Enhance AI & Cloud Technical Expertise
                    </h4>
                    <ul className="space-y-2 text-blue-700 dark:text-blue-300">
                      <li><strong>KR 6.1:</strong> Complete at least 1 AI or Cloud certification</li>
                      <li><strong>KR 6.2:</strong> Deliver 1 internal training session on AI/Cloud insights</li>
                      <li><strong>KR 6.3:</strong> Ensure 75% of team completes 1 Pluralsight/Ashling Academy module</li>
                    </ul>
                  </div>

                  {/* Objective 7 */}
                  <div className="bg-green-50 dark:bg-green-900 rounded-lg p-4">
                    <h4 className="font-semibold text-green-800 dark:text-green-200 mb-3">
                      🎯 Objective 7: Increase Thought Leadership Contributions
                    </h4>
                    <ul className="space-y-2 text-green-700 dark:text-green-300">
                      <li><strong>KR 7.1:</strong> Organize 2 internal knowledge-sharing sessions (70% attendance)</li>
                      <li><strong>KR 7.2:</strong> Publish 1 blog post/whitepaper on architecture best practices</li>
                      <li><strong>KR 7.3:</strong> Mentor 1-2 aspiring architects with structured feedback</li>
                    </ul>
                  </div>

                  {/* Objective 8 */}
                  <div className="bg-purple-50 dark:bg-purple-900 rounded-lg p-4">
                    <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-3">
                      🎯 Objective 8: Expand UiPath MVP Contributions
                    </h4>
                    <ul className="space-y-2 text-purple-700 dark:text-purple-300">
                      <li><strong>KR 8.1:</strong> Co-author 1 blog post/presentation with MVP candidate</li>
                      <li><strong>KR 8.2:</strong> Conduct at least 2 one-on-one MVP coaching sessions</li>
                      <li><strong>KR 8.3:</strong> Guide 2 mentees to contribute publicly (blogs, forums, webinars)</li>
                    </ul>
                  </div>

                  {/* Objective 9 */}
                  <div className="bg-orange-50 dark:bg-orange-900 rounded-lg p-4">
                    <h4 className="font-semibold text-orange-800 dark:text-orange-200 mb-3">
                      🎯 Objective 9: Optimize Technical Strategy for AI & Automation
                    </h4>
                    <ul className="space-y-2 text-orange-700 dark:text-orange-300">
                      <li><strong>KR 9.1:</strong> Draft AI & automation readiness framework</li>
                      <li><strong>KR 9.2:</strong> Work with 1 client project incorporating AI-driven automation</li>
                      <li><strong>KR 9.3:</strong> Conduct at least 1 executive review session on AI strategy</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Phase 3: Months 5-6 */}
            <div className="mb-6 bg-white dark:bg-gray-700 rounded-lg shadow-lg">
              <button 
                onClick={() => togglePhase('phase3')}
                className="w-full p-6 text-left hover:bg-gray-50 dark:hover:bg-gray-600 rounded-lg transition-colors"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    Phase 3: Proving Leadership Readiness & Driving Impact (Months 5-6)
                  </h3>
                  <span className="text-2xl text-gray-400">
                    {expandedPhases.phase3 ? '−' : '+'}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  4 Core Objectives • Knowledge Scaling • Career Framework • MVP Pipeline • Executive Readiness
                </p>
              </button>
              {expandedPhases.phase3 && (
                <div className="px-6 pb-6 space-y-6 border-t border-gray-200 dark:border-gray-600 pt-6">
                  
                  {/* Objective 10 */}
                  <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-3">
                      🎯 Objective 10: Lead and Scale Knowledge Initiatives
                    </h4>
                    <ul className="space-y-2 text-blue-700 dark:text-blue-300">
                      <li><strong>KR 10.1:</strong> Add 2 additional sections to Architecture Knowledge Base</li>
                      <li><strong>KR 10.2:</strong> Achieve 15% improvement in documentation search efficiency</li>
                      <li><strong>KR 10.3:</strong> Drive 2 advanced solution architecture trainings</li>
                    </ul>
                  </div>

                  {/* Objective 11 */}
                  <div className="bg-green-50 dark:bg-green-900 rounded-lg p-4">
                    <h4 className="font-semibold text-green-800 dark:text-green-200 mb-3">
                      🎯 Objective 11: Formalize Architecture Career Growth Framework
                    </h4>
                    <ul className="space-y-2 text-green-700 dark:text-green-300">
                      <li><strong>KR 11.1:</strong> Refine architecture career roadmap with progression benchmarks</li>
                      <li><strong>KR 11.2:</strong> Define Consultant-to-Principal competency expectations</li>
                      <li><strong>KR 11.3:</strong> Conduct career development workshop for Architecture teams</li>
                    </ul>
                  </div>

                  {/* Objective 12 */}
                  <div className="bg-purple-50 dark:bg-purple-900 rounded-lg p-4">
                    <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-3">
                      🎯 Objective 12: Strengthen UiPath MVP Pipeline & Community Engagement
                    </h4>
                    <ul className="space-y-2 text-purple-700 dark:text-purple-300">
                      <li><strong>KR 12.1:</strong> Nominate at least 1 mentee for UiPath MVP consideration</li>
                      <li><strong>KR 12.2:</strong> Guide 3 aspiring MVPs to complete high-value contributions</li>
                      <li><strong>KR 12.3:</strong> Present MVP mentorship retrospective to leadership</li>
                    </ul>
                  </div>

                  {/* Objective 13 */}
                  <div className="bg-orange-50 dark:bg-orange-900 rounded-lg p-4">
                    <h4 className="font-semibold text-orange-800 dark:text-orange-200 mb-3">
                      🎯 Objective 13: Solidify Leadership and Executive Readiness
                    </h4>
                    <ul className="space-y-2 text-orange-700 dark:text-orange-300">
                      <li><strong>KR 13.1:</strong> Present final executive report on OKR progress and business impact</li>
                      <li><strong>KR 13.2:</strong> Obtain leadership endorsement for formal promotion</li>
                      <li><strong>KR 13.3:</strong> Secure at least 1 senior leader as career advancement advocate</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Success Framework */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Success Framework & Accountability</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Progress Tracking */}
              <div className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900 dark:to-blue-900 rounded-lg p-6">
                <h3 className="text-2xl font-semibold text-green-800 dark:text-green-200 mb-4">
                  📊 Progress Tracking & Feedback
                </h3>
                <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    <div>
                      <strong>Monthly Check-ins:</strong> Regular progress reviews with sponsoring leadership (Rak/Zach/Adam)
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    <div>
                      <strong>Quarterly Reviews:</strong> Comprehensive assessment and course correction opportunities
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    <div>
                      <strong>360° Feedback:</strong> Input from peers, direct reports, and stakeholders
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    <div>
                      <strong>Impact Metrics:</strong> Quantifiable business value and team satisfaction scores
                    </div>
                  </li>
                </ul>
              </div>

              {/* Leadership Commitment */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900 dark:to-pink-900 rounded-lg p-6">
                <h3 className="text-2xl font-semibold text-purple-800 dark:text-purple-200 mb-4">
                  🤝 Leadership Commitment & Support
                </h3>
                <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2">•</span>
                    <div>
                      <strong>Transparency:</strong> Clear expectations and regular communication
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2">•</span>
                    <div>
                      <strong>Resource Access:</strong> Training budget, certification support, and tools
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2">•</span>
                    <div>
                      <strong>Mentorship:</strong> Executive guidance and career development discussions
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2">•</span>
                    <div>
                      <strong>Promotion Pathway:</strong> Defined criteria and timeline for advancement
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Final Commitment Statement */}
            <div className="mt-8 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg p-8 text-white">
              <h3 className="text-2xl font-semibold mb-4">🎯 Success Commitment</h3>
              <div className="text-center">
                <p className="text-lg font-medium mb-4">
                  This plan ensures alignment, sponsorship, and measurable career growth, while reinforcing Ashling's commitment to nurturing top technical leadership talent and serving business needs.
                </p>
                <div className="bg-white bg-opacity-20 rounded-lg p-4">
                  <p className="text-xl font-bold">
                    Upon successful completion of these OKRs and business need alignment, promotion to Manager of Solution Architecture (or principal-equivalent scope) will be formalized.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ContainerBlock>
  );
} 

