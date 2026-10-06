import ContainerBlock from "@components/ContainerBlock";
import Hero from "@components/Hero";
import userData from "@constants/data";
import { getEpisodes, withAudioStatus } from "@lib/dailyDrop";

export default function Home({ latestEpisode }) {
  return <ContainerBlock title="Naveen Chatlapalli - Open Source & AI Architecture" description={userData.contributions.description} image="/og-open-source.png">
    <Hero latestEpisode={latestEpisode} />
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
    "public, s-maxage=300, stale-while-revalidate=600"
  );
  try {
    const episodes = await getEpisodes();
    return { props: { latestEpisode: await withAudioStatus(episodes[0]) } };
  } catch {
    res.setHeader("Cache-Control", "public, s-maxage=30, stale-while-revalidate=60");
    return { props: { latestEpisode: null } };
  }
};
