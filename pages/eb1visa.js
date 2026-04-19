import Head from "next/head";
import ContainerBlock from "../components/ContainerBlock";
import { useState } from "react";

export default function EB1Visa() {
  const [expandedCriteria, setExpandedCriteria] = useState({});

  const toggleCriteria = (criteriaId) => {
    setExpandedCriteria(prev => ({
      ...prev,
      [criteriaId]: !prev[criteriaId]
    }));
  };

  return (
    <ContainerBlock
      title="EB-1A Visa Case - Naveen Chatlapalli"
      description="Professional achievements and EB-1A criteria mapping for extraordinary ability in RPA and AI architecture."
    >
      <Head>
        <title>EB-1A Visa Case - Naveen Chatlapalli</title>
        <meta name="description" content="Professional achievements and EB-1A criteria mapping for extraordinary ability in RPA and AI architecture." />
      </Head>

      <div className="bg-white dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-20">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              EB-1A Visa Case
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Demonstrating Extraordinary Ability in RPA & AI Architecture
            </p>
          </div>

          {/* About Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">About Naveen</h2>
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-8">
              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Professional Summary</h3>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  Naveen Chatlapalli is a distinguished Manager of Solution Architecture with 12+ years of specialized expertise in RPA (Robotic Process Automation) and AI architecture. Based in Dallas, Texas, he serves as Manager of Solution Architecture at Ashling Partners, where he leads multimillion-dollar automation programs for Fortune 500 clients.
                </p>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  His extraordinary ability in the field is evidenced by his recognition as a two-time UiPath Most Valuable Professional (MVP) for 2024 and 2025, placing him among an elite group of ~120 professionals worldwide who receive this prestigious, peer-reviewed award annually.
                </p>
              </div>
              
              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">What Makes Naveen Qualified</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Technical Leadership</h4>
                    <ul className="text-gray-700 dark:text-gray-300 space-y-2">
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        Architect of innovative AI solutions adopted by multiple Fortune 500 companies
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        Inventor of Unsloth AI documentation agent with widespread adoption
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Industry Recognition</h4>
                    <ul className="text-gray-700 dark:text-gray-300 space-y-2">
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        Two-time UiPath MVP (global recognition among 120 professionals)
                      </li>                      
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        Senior IEEE Member (top 10% professional grade)
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        Invited for exclusive UiPath Maestro - Agentic Orchestration beta testing by UiPath VP Arun Mehta (invite-only group for 3 MVPs)
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Community Impact & Thought Leadership</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Content Creation & Education</h4>
                    <ul className="text-gray-700 dark:text-gray-300 space-y-2">
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        20+ technical articles with 10,000+ collective reads
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        Featured speaker at major industry conferences (UiPath DevCon, MVP Summit)
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        UiPath Dallas Chapter Lead with 2,000+ community members
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Expert Evaluation & Judging</h4>
                    <ul className="text-gray-700 dark:text-gray-300 space-y-2">
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        Globee Awards Judge (multiple categories)
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        IEEE ICME Conference peer reviewer
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        HackSharks Finals Judge
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-200 mb-3">Key Qualifications Summary</h3>
                <ul className="text-blue-700 dark:text-blue-300 space-y-2">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-3">✓</span>
                    <strong>12+ years of specialized expertise</strong> in RPA & AI architecture with proven track record
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-3">✓</span>
                    <strong>Global recognition</strong> through prestigious awards and selective memberships
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-3">✓</span>
                    <strong>Original innovations</strong> adopted by Fortune 500 companies and external clients
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-3">✓</span>
                    <strong>Thought leadership</strong> through publications, speaking engagements, and community building
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-3">✓</span>
                    <strong>Peer recognition</strong> as expert judge and reviewer in multiple professional capacities
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* EB-1A Criteria Mapping */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">EB-1A Criteria Mapping</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 italic">Click on each criterion to view detailed evidence and explanations.</p>
            
            {/* Criterion 1 - Awards */}
            <div className="mb-6 bg-white dark:bg-gray-700 rounded-lg shadow-lg">
              <button 
                onClick={() => toggleCriteria('criterion1')}
                className="w-full p-6 text-left hover:bg-gray-50 dark:hover:bg-gray-600 rounded-lg transition-colors"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    Criterion 1 – Awards ✅
                  </h3>
                  <span className="text-2xl text-gray-400">
                    {expandedCriteria.criterion1 ? '−' : '+'}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  Two-time UiPath MVP • North America Hackathon Winner • Innovation Challenge Champion
                </p>
              </button>
              {expandedCriteria.criterion1 && (
                <div className="px-6 pb-6 space-y-4 border-t border-gray-200 dark:border-gray-600 pt-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200">Two-time UiPath MVP (2024 & 2025)</h4>
                    <p className="text-gray-600 dark:text-gray-300">Global, peer-reviewed award bestowed on ~120 professionals worldwide each year.</p>
                    <p className="text-sm text-blue-600 dark:text-blue-400 italic">Why this matters: Sustained national & international acclaim for outstanding contributions in RPA/AI.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200">UiPath North America Hackathon – 1st Place (2019)</h4>
                    <p className="text-gray-600 dark:text-gray-300">Top accolade among 50+ teams.</p>
                    <p className="text-sm text-blue-600 dark:text-blue-400 italic">Why this matters: Competitive wins provide persuasive evidence of exceptional ability.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200">Ashling Partners Innovation Challenge Winner (2024)</h4>
                    <p className="text-gray-600 dark:text-gray-300">Best internal innovation as judged by executive panel.</p>
                    <p className="text-sm text-blue-600 dark:text-blue-400 italic">Why this matters: Demonstrates peer-based recognition of original work.</p>
                  </div>
                </div>
              )}
            </div>

            {/* Criterion 2 - Selective Memberships */}
            <div className="mb-6 bg-white dark:bg-gray-700 rounded-lg shadow-lg">
              <button 
                onClick={() => toggleCriteria('criterion2')}
                className="w-full p-6 text-left hover:bg-gray-50 dark:hover:bg-gray-600 rounded-lg transition-colors"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    Criterion 2 – Selective Memberships ✅
                  </h3>
                  <span className="text-2xl text-gray-400">
                    {expandedCriteria.criterion2 ? '−' : '+'}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  Senior IEEE Member • UiPath MVP Community
                </p>
              </button>
              {expandedCriteria.criterion2 && (
                <div className="px-6 pb-6 space-y-4 border-t border-gray-200 dark:border-gray-600 pt-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200">Senior Member, IEEE</h4>
                    <p className="text-gray-600 dark:text-gray-300">Top ~10% grade requiring documented professional achievements.</p>
                    <p className="text-sm text-blue-600 dark:text-blue-400 italic">Why this matters: Selective memberships validate stature in the field.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200">UiPath MVP Community</h4>
                    <p className="text-gray-600 dark:text-gray-300">Invite-only expert cohort.</p>
                    <p className="text-sm text-blue-600 dark:text-blue-400 italic">Why this matters: Selection by UiPath confirms extraordinary standing amongst practitioners.</p>
                  </div>
                </div>
              )}
            </div>

            {/* Criterion 3 - Published Material */}
            <div className="mb-6 bg-white dark:bg-gray-700 rounded-lg shadow-lg">
              <button 
                onClick={() => toggleCriteria('criterion3')}
                className="w-full p-6 text-left hover:bg-gray-50 dark:hover:bg-gray-600 rounded-lg transition-colors"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    Criterion 3 – Published Material About Me ✅
                  </h3>
                  <span className="text-2xl text-gray-400">
                    {expandedCriteria.criterion3 ? '−' : '+'}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  UiPath Spotlight • MVP Summit Interview • DevCon Feature • Wired Article
                </p>
              </button>
              {expandedCriteria.criterion3 && (
                <div className="px-6 pb-6 space-y-4 border-t border-gray-200 dark:border-gray-600 pt-4">
                  <ul className="text-gray-600 dark:text-gray-300 space-y-3">
                    
                    <li className="flex items-start">
                      <span className="text-green-500 mr-3">•</span>
                      <div>
                        <strong>Recorded interview at UiPath MVP Summit (Jan 2025)</strong>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Exclusive interview showcasing expertise and thought leadership</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-3">•</span>
                      <div>
                        <strong>Upcoming developer interview filmed at UiPath DevCon (May 2025)</strong>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Conference spotlight featuring innovation and technical expertise</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-3">•</span>
                      <div>
                        <strong>Featured article based on Wired reporter interview (2025)</strong>
                        <p className="text-sm text-gray-500 dark:text-gray-400">In-depth coverage of AI automation innovations by major tech publication</p>
                      </div>
                    </li>
                  </ul>
                  <p className="text-sm text-blue-600 dark:text-blue-400 italic mt-4">Why this matters: Independent media coverage about your work satisfies USCIS evidence of published material.</p>
                </div>
              )}
            </div>

            {/* Continue with remaining criteria... */}
            {/* Criterion 4 - Judging */}
            <div className="mb-6 bg-white dark:bg-gray-700 rounded-lg shadow-lg">
              <button 
                onClick={() => toggleCriteria('criterion4')}
                className="w-full p-6 text-left hover:bg-gray-50 dark:hover:bg-gray-600 rounded-lg transition-colors"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    Criterion 4 – Judging ✅
                  </h3>
                  <span className="text-2xl text-gray-400">
                    {expandedCriteria.criterion4 ? '−' : '+'}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  Globee Awards Judge • HackSharks Judge • IEEE Peer Reviewer
                </p>
              </button>
              {expandedCriteria.criterion4 && (
                <div className="px-6 pb-6 space-y-4 border-t border-gray-200 dark:border-gray-600 pt-4">
                  <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-3">•</span>
                      Globee Awards Judge (2024 & 2025 cycles)
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-3">•</span>
                      HackSharks Finals Judge (2023)
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-3">•</span>
                      Peer Reviewer, IEEE ICME Conference research papers (2025)
                    </li>
                  </ul>
                  <p className="text-sm text-blue-600 dark:text-blue-400 italic">Why this matters: Selecting winners and reviewing scholarly work shows recognition of your expertise.</p>
                </div>
              )}
            </div>

            {/* Criterion 5 - Original Contributions */}
            <div className="mb-6 bg-white dark:bg-gray-700 rounded-lg shadow-lg">
              <button 
                onClick={() => toggleCriteria('criterion5')}
                className="w-full p-6 text-left hover:bg-gray-50 dark:hover:bg-gray-600 rounded-lg transition-colors"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    Criterion 5 – Original Contributions ✅
                  </h3>
                  <span className="text-2xl text-gray-400">
                    {expandedCriteria.criterion5 ? '−' : '+'}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  Unsloth AI Agent • Value Monitoring Tool • Agentic Discovery Framework
                </p>
              </button>
              {expandedCriteria.criterion5 && (
                <div className="px-6 pb-6 space-y-4 border-t border-gray-200 dark:border-gray-600 pt-4">
                  <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-3">•</span>
                      Invented Unsloth AI documentation agent and launched to production which drives 75% of the documentation effort
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-3">•</span>
                      Architect & backend lead for Value Monitoring Tool, delivering live cost-savings metrics
                    </li>
                  </ul>
                  <p className="text-sm text-blue-600 dark:text-blue-400 italic">Why this matters: Original, widely-used innovations are prime evidence of impact on the field.</p>
                </div>
              )}
            </div>

            {/* Criterion 6 - Scholarly Articles */}
            <div className="mb-6 bg-white dark:bg-gray-700 rounded-lg shadow-lg">
              <button 
                onClick={() => toggleCriteria('criterion6')}
                className="w-full p-6 text-left hover:bg-gray-50 dark:hover:bg-gray-600 rounded-lg transition-colors"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    Criterion 6 – Scholarly Articles ✅
                  </h3>
                  <span className="text-2xl text-gray-400">
                    {expandedCriteria.criterion6 ? '−' : '+'}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  20+ Technical Articles • 10k+ Reads • Conference Proceedings
                </p>
              </button>
              {expandedCriteria.criterion6 && (
                <div className="px-6 pb-6 space-y-4 border-t border-gray-200 dark:border-gray-600 pt-4">
                  <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-3">•</span>
                      20+ technical articles on LinkedIn & Medium amassing 10k+ reads
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-3">•</span>
                      Conference presentation & proceedings: Agentic Orchestration, UiPath DevCon Austin 2025
                    </li>
                  </ul>
                  <p className="text-sm text-blue-600 dark:text-blue-400 italic">Why this matters: Publishing advances knowledge and demonstrates thought leadership.</p>
                </div>
              )}
            </div>

            {/* Criterion 7 - Exhibitions */}
            <div className="mb-6 bg-white dark:bg-gray-700 rounded-lg shadow-lg">
              <button 
                onClick={() => toggleCriteria('criterion7')}
                className="w-full p-6 text-left hover:bg-gray-50 dark:hover:bg-gray-600 rounded-lg transition-colors"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    Criterion 7 – Exhibitions / Showcase ✅
                  </h3>
                  <span className="text-2xl text-gray-400">
                    {expandedCriteria.criterion7 ? '−' : '+'}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  DevCon Main-stage Demo • Microsoft Azure AI Foundry Showcase
                </p>
              </button>
              {expandedCriteria.criterion7 && (
                <div className="px-6 pb-6 space-y-4 border-t border-gray-200 dark:border-gray-600 pt-4">
                  <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-3">•</span>
                      Main-stage live demo at UiPath DevCon (May 29 2025 – 150+ attendees)
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-3">•</span>
                      Conference Speaker at Scenic City Summit - Microsoft Azure AI foundry (2025)
                    </li>
                  </ul>
                  <p className="text-sm text-blue-600 dark:text-blue-400 italic">Why this matters: Exhibiting work at prestigious venues fulfills USCIS 'exhibition' criterion.</p>
                </div>
              )}
            </div>

            {/* Criterion 8 - Leading Role */}
            <div className="mb-6 bg-white dark:bg-gray-700 rounded-lg shadow-lg">
              <button 
                onClick={() => toggleCriteria('criterion8')}
                className="w-full p-6 text-left hover:bg-gray-50 dark:hover:bg-gray-600 rounded-lg transition-colors"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    Criterion 8 – Leading / Critical Role ✅
                  </h3>
                  <span className="text-2xl text-gray-400">
                    {expandedCriteria.criterion8 ? '−' : '+'}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  Manager of Solution Architecture • Community Chapter Lead
                </p>
              </button>
              {expandedCriteria.criterion8 && (
                <div className="px-6 pb-6 space-y-4 border-t border-gray-200 dark:border-gray-600 pt-4">
                  <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-3">•</span>
                       Manager of Solution Architecture leading multimillion-dollar automation programs for Fortune 500 clients
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-3">•</span>
                      UiPath Community Dallas Chapter Lead – organised 10+ events; membership surpassed 2,000
                    </li>
                  </ul>
                  <p className="text-sm text-blue-600 dark:text-blue-400 italic">Why this matters: Shows you occupy a critical leadership role in a distinguished organization.</p>
                </div>
              )}
            </div>

            {/* Criterion 9 - High Salary */}
            <div className="mb-6 bg-white dark:bg-gray-700 rounded-lg shadow-lg">
              <button 
                onClick={() => toggleCriteria('criterion9')}
                className="w-full p-6 text-left hover:bg-gray-50 dark:hover:bg-gray-600 rounded-lg transition-colors"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    Criterion 9 – High Salary ⚡
                  </h3>
                  <span className="text-2xl text-gray-400">
                    {expandedCriteria.criterion9 ? '−' : '+'}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  75th Percentile Compensation - Strong Foundation for Future Growth
                </p>
              </button>
              {expandedCriteria.criterion9 && (
                <div className="px-6 pb-6 space-y-4 border-t border-gray-200 dark:border-gray-600 pt-4">
                  <p className="text-gray-600 dark:text-gray-300">
                    Total compensation falls in the 75th percentile for solution architecture leadership in Irving, TX (salary survey evidence forthcoming).
                  </p>
                  <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-4">
                    <p className="text-sm text-blue-600 dark:text-blue-400 italic">
                      <strong>Current Status:</strong> While not yet meeting the highest salary criterion, the compensation reflects strong market recognition. The EB-1A approval will unlock opportunities for premium roles and consulting engagements, positioning for rapid advancement to top-tier compensation levels. With 8 other criteria already satisfied, this represents an area of future growth rather than a limitation.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Criterion 10 - Commercial Success */}
            <div className="mb-6 bg-white dark:bg-gray-700 rounded-lg shadow-lg">
              <button 
                onClick={() => toggleCriteria('criterion10')}
                className="w-full p-6 text-left hover:bg-gray-50 dark:hover:bg-gray-600 rounded-lg transition-colors"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    Criterion 10 – Commercial Success ⚡
                  </h3>
                  <span className="text-2xl text-gray-400">
                    {expandedCriteria.criterion10 ? '−' : '+'}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  Employee Role - Strategic Platform for Future Ventures
                </p>
              </button>
              {expandedCriteria.criterion10 && (
                <div className="px-6 pb-6 space-y-4 border-t border-gray-200 dark:border-gray-600 pt-4">
                  <p className="text-gray-600 dark:text-gray-300">
                    Currently employed as Manager of Solution Architecture rather than operating an independent business with documented commercial success.
                  </p>
                  <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-4">
                    <p className="text-sm text-blue-600 dark:text-blue-400 italic">
                      <strong>Strategic Positioning:</strong> While not currently qualifying under commercial success, the employee role provides invaluable experience with Fortune 500 clients and cutting-edge AI implementations. The Perplexity AI Business Fellowship qualification demonstrates entrepreneurial recognition and readiness for future commercial ventures. This criterion represents an exciting opportunity for post-EB1A business development rather than a current requirement.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Final Merit Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Final Merit & Community Impact</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Business Fellowship */}
              <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900 dark:to-blue-900 rounded-lg p-6">
                <h3 className="text-2xl font-semibold text-purple-800 dark:text-purple-200 mb-4">
                  🚀 Business Fellowship Recognition
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200">Perplexity AI Business Fellowship Program</h4>
                    <p className="text-gray-600 dark:text-gray-300">Qualified for exclusive business fellowship at Perplexity AI, one of the leading AI startup companies revolutionizing search and information discovery.</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border-l-4 border-purple-500">
                    <p className="text-sm text-purple-600 dark:text-purple-400 italic font-medium">
                      <strong>Why this matters:</strong> Selection for competitive fellowship programs at cutting-edge AI companies demonstrates recognition of entrepreneurial potential and advanced technical expertise. This validates extraordinary ability to contribute to emerging technologies and business innovation in the AI sector.
                    </p>
                  </div>
                </div>
              </div>

              {/* Volunteer Work */}
              <div className="bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900 dark:to-teal-900 rounded-lg p-6">
                <h3 className="text-2xl font-semibold text-green-800 dark:text-green-200 mb-4">
                  🤝 Community Service & Tech Enablement
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200">Nonprofit Technology Leadership</h4>
                    <ul className="text-gray-600 dark:text-gray-300 space-y-2 mt-2">
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">•</span>
                        <div>
                          <strong>Silicon Andhra Manabadi:</strong> Volunteer Telugu teacher (August 2024 - May 2025, weekly 2-hour sessions)
                        </div>
                      </li>                      
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">•</span>
                        <div>
                          <strong>Telugu Spelling Bee Program:</strong> Comprehensive tech enablement for world-class spelling competition for children ages 6-15, preserving cultural heritage through technology for their world-class Telugu spelling bee program using modern AI architecture
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border-l-4 border-green-500">
                    <p className="text-sm text-green-600 dark:text-green-400 italic font-medium">
                      <strong>Why this matters:</strong> Extensive volunteer work demonstrates commitment to using extraordinary abilities for broader societal benefit. USCIS values applicants who contribute to community development and cultural preservation. Technical leadership in nonprofit settings shows ability to apply skills beyond commercial interests, indicating lasting positive impact on U.S. communities.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Overall Merit Summary */}
            <div className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white">
              <h3 className="text-2xl font-semibold mb-4">📋 Comprehensive Merit Assessment</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">8/10</div>
                  <div className="text-sm opacity-90">EB-1A Criteria Met</div>
                  <div className="text-xs opacity-75">(Only 3 required)</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">12+</div>
                  <div className="text-sm opacity-90">Years Expertise</div>
                  <div className="text-xs opacity-75">RPA & AI Architecture</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">100%</div>
                  <div className="text-sm opacity-90">Documentation Ready</div>
                  <div className="text-xs opacity-75">Evidence Portfolio</div>
                </div>
              </div>
              <div className="mt-6 text-center">
                <p className="text-lg font-medium">
                  Comprehensive evidence demonstrates sustained extraordinary ability with significant impact on the field of RPA and AI architecture, combined with meaningful community contributions and recognition at the highest industry levels.
                </p>
              </div>
            </div>
          </div>

          {/* ROI Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">ROI for Ashling Partners</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white dark:bg-gray-700 rounded-lg shadow-lg">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">ROI Dimension</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Impact</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">Immigration cost savings</td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">Avoids $10k–$15k in legal/Gov fees and 100+ staff hours every three-year H-1B renewal cycle.</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">Expanded deal eligibility</td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">Green-card holders can staff projects subject to U.S. Federal or client security requirements where H-1B workers are restricted.</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">Agile global deployment</td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">Visa-free travel enables rapid on-site support for APAC/EMEA clients, boosting service quality and revenue.</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">Marketing & thought leadership</td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">Press release / case study: "Ashling employs EB-1A recognized AI architect" enhances credibility and attracts clients.</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">Reduced HR compliance burden</td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">Eliminates LCAs, public posting, and audit exposure associated with H-1B; HR focus shifts to strategic growth.</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">Innovation multiplier</td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">With immigration stability, Naveen can spearhead new AI product lines (e.g., Agentic platforms) generating incremental revenue.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* What I Need Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">What I Need From Leadership</h2>
            <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-8">
              <ul className="text-gray-700 dark:text-gray-300 space-y-4">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-3">•</span>
                  Executive endorsement letters (CEO, COO, VP Delivery) attesting to critical role and impact
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-3">•</span>
                  Permission to cite internal performance metrics and client success data
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-3">•</span>
                  Support with one-time legal fees and petition logistics
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-3">•</span>
                  Confirmation of ongoing role leveraging my extraordinary ability (future work statement)
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </ContainerBlock>
  );
} 
