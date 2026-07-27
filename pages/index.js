import ContainerBlock from "../components/ContainerBlock";
import Hero from "../components/Hero";
import getLatestRepos from "@lib/getLatestRepos";
import userData from "@constants/data";
import AboutMe from "@components/AboutMe";
import Link from "next/link";

export default function Home({ repositories }) {
  return (
    <ContainerBlock
      title="Naveen Chatlapalli — AI & Solution Architecture"
      description="AI product and solution architecture leadership, selected work, and public contributions."
    >
      <Hero />
      <AboutMe />
      <section className="border-y border-[#d8ddd8] bg-white/60 dark:border-[#34413d] dark:bg-[#18211f]/50"><div className="site-container page-section"><div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"><div><p className="eyebrow">Selected evidence</p><h2 className="section-title mt-4">Work that holds up to a closer look.</h2></div><Link href="/recognition" className="text-link">View all recognition →</Link></div><div className="mt-10 grid gap-5 md:grid-cols-3"><article className="paper-card"><p className="eyebrow">Recognition</p><h3 className="mt-4 text-2xl">UiPath MVP</h3><p className="mt-3 leading-7 text-[#5f6864] dark:text-[#b7c0bb]">Three-time community recognition for technical contribution and thought leadership.</p></article><article className="paper-card"><p className="eyebrow">Judging</p><h3 className="mt-4 text-2xl">Globee Awards</h3><p className="mt-3 leading-7 text-[#5f6864] dark:text-[#b7c0bb]">Selected to evaluate technology and business award submissions.</p></article><article className="paper-card"><p className="eyebrow">Applied AI</p><h3 className="mt-4 text-2xl">Risk Orbit</h3><p className="mt-3 leading-7 text-[#5f6864] dark:text-[#b7c0bb]">A multi-agent supply-chain risk system recognized in a UiPath challenge.</p></article></div></div></section>
      <section className="site-container page-section"><div className="paper-card flex flex-col gap-6 bg-[#e9eff8] dark:bg-[#172c3c] md:flex-row md:items-center md:justify-between"><div><p className="eyebrow">Let’s connect</p><h2 className="mt-3 text-3xl">Interested in a conversation about AI systems?</h2></div><Link href="/contact" className="button-primary shrink-0">Get in touch →</Link></div></section>
    </ContainerBlock>
  );
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

  const token = process.env.GITHUB_AUTH_TOKEN;
  const repositories = await getLatestRepos(userData, token);

  return {
    props: {
      repositories,
    },
  };
};

