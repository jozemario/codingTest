import React from "react";
import useSWR from "swr";
import { Fragment } from "react";
import Layout from "../components/layout";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Page() {
  const { data, error } = useSWR(
    "https://api.github.com/repos/vercel/swr",
    fetcher
  );

  if (error) return "An error has occurred.";
  if (!data) return "Loading...";
  return (
    <Layout>
      <h1 className="m-4 text-center text-4xl text-red-500">SWR Basic</h1>
      <code>
        const {"{ data, error }"} = useSWR(
        "https://api.github.com/repos/vercel/swr", fetcher );
      </code>
      <Fragment>
        <div>
          <h1>{data.name}</h1>
          <p>{data.description}</p>
          <strong>👁 {data.subscribers_count}</strong>{" "}
          <strong>✨ {data.stargazers_count}</strong>{" "}
          <strong>🍴 {data.forks_count}</strong>
        </div>
      </Fragment>
    </Layout>
  );
}
/* 
const type = "users";

function useUsers(limit) {
  const { data, error } = useSWR(`/api/private/users/${limit}`, fetcher);

  return {
    users: data,
    isLoading: !error && !data,
    isError: error,
  };
}

// componente de la página

function Page() {
  return (
    <div>
      <Navbar />
      <Content />
    </div>
  );
}

// componentes hijos

function Navbar() {
  return (
    <div>
      ...
      <Avatar />
    </div>
  );
}

function Content() {
  const { users, isLoading } = useUsers();
  if (isLoading) return <Spinner />;
  return <h1>Welcome back, {users[0].name}</h1>;
}

function Avatar() {
  const { users, isLoading } = useUsers();
  if (isLoading) return <Spinner />;
  return <img src={users[0].avatar} alt={users[0].name} />;
}
 */
