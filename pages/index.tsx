import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Wralith Blog</title>
        <meta name="description" content="Wralith's personal blog." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="flex min-h-screen margin-0 items-center justify-center text-5xl font-bold">
        Hello 👋
      </h1>
    </>
  );
};

export default Home;
