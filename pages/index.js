import Link from "next/link";
import ContainerBlock from "@components/ContainerBlock";
import Hero from "@components/Hero";
import AboutMe from "@components/AboutMe";
import Icon from "@components/Icon";
import getLatestRepos from "@lib/getLatestRepos";
import userData from "@constants/data";

const evidence = [
  { eyebrow: "Recognition · UiPath", title: "Three-time UiPath MVP", text: "Community recognition for sustained technical contribution and thought leadership.", href: "/recognition#distinctions", external: false },
  { eyebrow: "Judging · 2024", title: "Globee Awards judge", text: "Selected to evaluate technology and business award submissions.", href: "https://globeeawards.com/2024-business-awards-judge/", external: true },
  { eyebrow: "Applied AI · Case study", title: "Risk Orbit", text: "A multi-agent supply-chain risk system recognized in the UiPath Specialist Coded Agent Challenge.", href: "/work#risk-orbit", external: false },
];

export default function Home() {
  return <ContainerBlock title="Naveen Chatlapalli — Solution Architecture & AI Agents" description="Enterprise solution architecture, AI-agent systems, selected work, and public contributions by Naveen Chatlapalli.">
    <Hero />
    <AboutMe />
    <section className="border-y border-[#d8ddd8] bg-white/60 dark:border-[#34413d] dark:bg-[#18211f]/50"><div className="site-container page-section">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"><div><p className="eyebrow">Selected evidence</p><h2 className="section-title mt-4">Work that holds up to a closer look.</h2></div><Link href="/recognition" className="source-label">View all recognition <Icon name="arrowRight" /></Link></div>
      <div className="mt-10 grid gap-5 md:grid-cols-3">{evidence.map((item) => {
        const body = <><p className="eyebrow">{item.eyebrow}</p><h3 className="mt-4 text-2xl transition group-hover:text-[#174b8b] dark:group-hover:text-[#a8c7ee]">{item.title}</h3><p className="mt-3 leading-7 text-[#5f6864] dark:text-[#b7c0bb]">{item.text}</p><span className="mt-auto flex min-h-[44px] items-center gap-2 pt-6 text-sm font-semibold text-[#174b8b] dark:text-[#a8c7ee]">View evidence <Icon name={item.external ? "arrowUpRight" : "arrowRight"} /></span></>;
        const classes = "paper-card group flex min-h-[280px] flex-col transition hover:-translate-y-1 hover:border-[#91aed2] hover:shadow-[0_18px_45px_rgba(24,33,31,.08)]";
        return item.external ? <a key={item.title} href={item.href} target="_blank" rel="noopener noreferrer" className={classes}>{body}</a> : <Link key={item.title} href={item.href} className={classes}>{body}</Link>;
      })}</div>
    </div></section>
    <section className="site-container page-section"><div className="paper-card flex flex-col gap-6 bg-[#e9eff8] dark:bg-[#172c3c] md:flex-row md:items-center md:justify-between"><div><p className="eyebrow">Architecture conversations</p><h2 className="mt-3 text-3xl">Planning an automation or AI-agent system?</h2><p className="mt-3 max-w-2xl leading-7 text-[#5f6864] dark:text-[#b7c0bb]">Let’s connect the business outcome, architecture, governance, and delivery path.</p></div><Link href="/contact" className="button-primary shrink-0">Start a conversation <Icon name="arrowRight" /></Link></div></section>
  </ContainerBlock>;
}

export const getServerSideProps = async ({ res }) => {
  const link = [
    `</.well-known/api-catalog>; rel="api-catalog"`,
    `</openapi.json>; rel="service-desc"; type="application/vnd.oai.openapi+json"`,
    `</contact>; rel="service-doc"`,
    `</.well-known/agent-skills/index.json>; rel="describedby"`,
    `</sitemap.xml>; rel="alternate"; type="application/xml"`,
  ].join(", ");
  res.setHeader("Link", link);
  await getLatestRepos(userData, process.env.GITHUB_AUTH_TOKEN);
  return { props: {} };
};
