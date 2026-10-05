import ContainerBlock from "@components/ContainerBlock";
import Hero from "@components/Hero";
import userData from "@constants/data";

export default function Home() {
  return <ContainerBlock title="Naveen Chatlapalli - Open Source & AI Architecture" description={userData.contributions.description} image="/og-open-source.png">
    <Hero />
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
  return { props: {} };
};
