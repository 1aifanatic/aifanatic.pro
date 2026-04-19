import Head from "next/head";
import styles from "../styles/Home.module.css";
import ContainerBlock from "../components/ContainerBlock";
import Hero from "../components/Hero";
import getLatestRepos from "@lib/getLatestRepos";
import userData from "@constants/data";
import AboutMe from "@components/AboutMe";
import Upcoming from "@components/Upcoming";
import Highlight from "@components/Highlight";

export default function Home({ repositories }) {
  return (
    <ContainerBlock
      title="Naveen Chatlapalli - Manager of Solution Architecture, UiPath Community Leader, Solopreneur"
      description="Welcome to my personal web site to learn more about me, my activities, and my past work."
    >
      <Hero />
      <AboutMe />
      {/* <Upcoming /> */}
      <Highlight />
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

