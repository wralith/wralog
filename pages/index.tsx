import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Spinner from "../components/UI/Spinner";
import Enter from "./enter";

const Home: NextPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center text-center justify-center">
      <Head>
        <title>Wralith Blog</title>
        <meta name="description" content="Wralith's personal blog." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="margin-0 items-center text-5xl font-bold">Hello 👋</h1>
      <div className="mb-5">
        <Link href={{ pathname: "/[username]", query: { username: "wra" } }}>
          Wra
        </Link>
      </div>
    </div>
  );
};

export default Home;
