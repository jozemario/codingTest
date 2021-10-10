import React from "react";
import useSWR from "swr";
import { Fragment } from "react";
import Layout from "../components/layout";

// a fake API that returns data or error randomly
const fetchCurrentTime = async () => {
  // wait for 1s
  await new Promise((res) => setTimeout(res, 1000));

  // error!
  if (Math.random() < 0.4) throw new Error("An error has occurred!");

  // return the data
  return new Date().toLocaleString();
};

export default function Page() {
  const { data, error, mutate, isValidating } = useSWR(
    "/api",
    fetchCurrentTime,
    { dedupingInterval: 0 }
  );

  return (
    <Layout>
      <h1 className="m-4 text-center text-4xl text-red-500">
        SWR Error Handling
      </h1>
      <code></code>
      <Fragment>
        <div className="App">
          <h2>Current time: {data}</h2>
          <p>Loading: {isValidating ? "true" : "false"}</p>
          <button onClick={() => mutate()}>
            <span>Refresh</span>
          </button>
          {error ? <p style={{ color: "red" }}>{error.message}</p> : null}
        </div>
      </Fragment>
    </Layout>
  );
}
