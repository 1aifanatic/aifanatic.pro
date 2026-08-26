import ContainerBlock from "@components/ContainerBlock";
import Hero from "@components/Hero";
import getRepoMetrics from "@lib/getRepoMetrics";
import userData from "@constants/data";

export default function Home({ boostMetrics, openSourceMetrics }) {
  return <ContainerBlock title="Naveen Chatlapalli - Agentic Automation Architect" description="Agentic automation architecture, enterprise AI agents, selected work, and public contributions by Naveen Chatlapalli.">
    <Hero boostMetrics={boostMetrics} openSourceMetrics={openSourceMetrics} />
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
  const token = process.env.GITHUB_AUTH_TOKEN;
  const [boostMetrics, ...openSourceMetrics] = await Promise.all(
    [
      getRepoMetrics(userData.uipathBoost.repository, token),
      ...(userData.openSource || []).map((repo) =>
        getRepoMetrics(repo.repo, token)
      ),
    ].map((promise) => promise.catch(() => null))
  );
  const metricsByRepo = {};
  (userData.openSource || []).forEach((repo, index) => {
    if (openSourceMetrics[index]) {
      metricsByRepo[repo.repo] = openSourceMetrics[index];
    }
  });
  return { props: { boostMetrics, openSourceMetrics: metricsByRepo } };
};
