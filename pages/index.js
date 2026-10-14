import ContainerBlock from "@components/ContainerBlock";
import Hero from "@components/Hero";
import { Manifesto, ProofBento, BrandMarquee, SelectedFixes, FinalCta } from "@components/home/Sections";
import ImpactUniverse from "@components/home/ImpactUniverse";
import OrchestrationPlayground from "@components/home/OrchestrationPlayground";
import CareerTimeline from "@components/home/CareerTimeline";
import userData from "@constants/data";

export default function Home() {
  return <ContainerBlock immersive title="Naveen Chatlapalli - Agentic AI Architect, Open Source & AI Architecture" description={userData.homeSnapshot.description} image="/og-open-source.png">
    <div className="ix-home-body">
      <Hero />
      <Manifesto />
      <BrandMarquee />
      <ProofBento />
      <ImpactUniverse />
      <OrchestrationPlayground />
      <SelectedFixes />
      <CareerTimeline />
      <FinalCta />
    </div>
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
  return { props: {} };
};
