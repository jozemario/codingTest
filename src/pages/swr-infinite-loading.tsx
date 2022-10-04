import React, { useState } from "react";
import useSWRInfinite from "swr/infinite";
import { Fragment } from "react";
import Layout from "../components/layout";

const fetcher = (url) => fetch(url).then((res) => res.json());
const PAGE_SIZE = 6;

export default function Page() {
  const [repo, setRepo] = useState("reactjs/react-a11y");
  const [val, setVal] = useState(repo);

  const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite(
    (index) =>
      `https://api.github.com/repos/${repo}/issues?per_page=${PAGE_SIZE}&page=${
        //`https://api.github.com/repos/${repo}/issues?per_page=${PAGE_SIZE}&page=${
        index + 1
      }`,
    fetcher
  );

  const issues = data ? [].concat(...data) : [];
  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === "undefined");
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE);
  const isRefreshing = isValidating && data && data.length === size;

  return (
    <Layout>
      <h1 className="m-4 text-center text-4xl text-red-500">
        SWR Infinite Loading
      </h1>
      <code>
        useSWRInfinite gives us the ability to trigger a number of requests with
        one Hook. This is how it looks: import useSWRInfinite from
        'swr/infinite' // ... const{" "}
        {"{(data, error, isValidating, mutate, size, setSize)}"} =
        useSWRInfinite( getKey, fetcher?, options? ) Similar to useSWR, this new
        Hook accepts a function that returns the request key, a fetcher
        function, and options. It returns all the values that useSWR returns,
        including 2 extra values: the page size and a page size setter, like a
        React state. In infinite loading, one page is one request, and our goal
        is to fetch multiple pages and render them. API Parameters getKey: a
        function that accepts the index and the previous page data, returns the
        key of a page fetcher: same as useSWR's fetcher function options:
        accepts all the options that useSWR supports, with 3 extra options:
        initialSize = 1: number of pages should be loaded initially
        revalidateAll = false: always try to revalidate all pages persistSize =
        false: don't reset the page size to 1 (or initialSize if set) when the
        first page's key changes Note that the initialSize option is not allowed
        to change in the lifecycle. Return Values data: an array of fetch
        response values of each page error: same as useSWR's error isValidating:
        same as useSWR's isValidating mutate: same as useSWR's bound mutate
        function but manipulates the data array size: the number of pages that
        will be fetched and returned setSize: set the number of pages that need
        to be fetched
      </code>
      <Fragment>
        <div style={{ fontFamily: "sans-serif" }}>
          <input
            value={val}
            onChange={(e) => setVal(e.target.value)}
            //placeholder="reactjs/react-a11y"
            placeholder="talosdigital/cotu-js"
          />
          <button
            onClick={() => {
              setRepo(val);
              setSize(1);
            }}
          >
            load issues
          </button>
          <p>
            showing {size} page(s) of {isLoadingMore ? "..." : issues.length}{" "}
            issue(s){" "}
            <button
              disabled={isLoadingMore || isReachingEnd}
              onClick={() => setSize(size + 1)}
            >
              {isLoadingMore
                ? "loading..."
                : isReachingEnd
                ? "no more issues"
                : "load more"}
            </button>
            <button disabled={isRefreshing} onClick={() => mutate()}>
              {isRefreshing ? "refreshing..." : "refresh"}
            </button>
            <button disabled={!size} onClick={() => setSize(0)}>
              clear
            </button>
          </p>
          {isEmpty ? <p>Yay, no issues found.</p> : null}
          {issues.map((issue) => {
            return (
              <p key={issue.id} style={{ margin: "6px 0" }}>
                - {issue.title}
              </p>
            );
          })}
        </div>
      </Fragment>
    </Layout>
  );
}
