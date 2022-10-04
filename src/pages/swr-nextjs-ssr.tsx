import useSWR, { SWRConfig } from "swr";
import { Fragment } from "react";
import Layout from "../components/layout";

const fetcher = (url) => fetch(url).then((res) => res.json());
const API = "https://api.github.com/repos/vercel/swr";

export async function getServerSideProps() {
  const repoInfo = await fetcher(API);
  return {
    props: {
      fallback: {
        [API]: repoInfo,
      },
    },
  };
}

export function Repo() {
  const { data, error } = useSWR(API);

  // there should be no `undefined` state
  console.log("Is data ready?", !!data);

  if (error) return "An error has occurred.";
  if (!data) return "Loading...";
  return (
    <Layout>
      <h1 className="m-4 text-center text-4xl text-red-500">SWR Nextjs SSR</h1>
      <code></code>
      <div>
        <h1>{data.name}</h1>
        <p>{data.description}</p>
        <strong>👀 {data.subscribers_count}</strong>{" "}
        <strong>✨ {data.stargazers_count}</strong>{" "}
        <strong>🍴 {data.forks_count}</strong>
      </div>
    </Layout>
  );
}

export default function Page({ fallback }) {
  return (
    <SWRConfig value={{ fallback }}>
      {/*<Repo />*/}
    </SWRConfig>
  );
}
