import ContainerBlock from "@components/ContainerBlock";
import Hero from "@components/Hero";
import getRepoMetrics from "@lib/getRepoMetrics";
import userData from "@constants/data";

export default function Home({ boostMetrics }) {
  return <ContainerBlock title="Naveen Chatlapalli — Solution Architecture & AI Agents" description="Enterprise solution architecture, AI-agent systems, selected work, and public contributions by Naveen Chatlapalli.">
    <Hero boostMetrics={boostMetrics} />
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
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=300, stale-while-revalidate=3600"
  );
  const boostMetrics = await getRepoMetrics(
    userData.uipathBoost.repository,
    process.env.GITHUB_AUTH_TOKEN
  );
  return { props: { boostMetrics } };
};
