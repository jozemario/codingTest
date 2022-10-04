import { GetServerSideProps } from "next";
import type { Session } from "next-auth";
import { useSession, getSession } from "next-auth/client";
import { useState, useEffect } from "react";
import Layout from "../../components/layout";
import { getOrCreateConnection } from "../../common/lib/api/get-db-connection";
import Post from "../../modules/client/post/api/post.entity";
import PostsService from "../../modules/client/post/api/posts.service";
import { Fragment } from "react";
import { InferGetServerSidePropsType } from "next";

export default function Page({
  posts,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  // As this page uses Server Side Rendering, the `session` will be already
  // populated on render without needing to go through a loading stage.
  // This is possible because of the shared context configured in `_app.js` that
  // is used by `useSession()`.
  const [session, loading] = useSession();
  const [postObjs, setPostsObjs] = useState(posts.map((p) => p as Post));
  //const postObjs = posts.map(p => p as Post);
  console.log("postObjs:", postObjs);

  function ListItem(props) {
    // Correct! There is no need to specify the key here:
    return (
      <tr>
        <td>{props.value.id}</td>
        <td>{props.value.title}</td>
        <td>{props.value.body}</td>
      </tr>
    );
  }

  function PostList(props) {
    const posts = props;
    const listItems = postObjs.map((item) => {
      // Correct! Key should be specified inside the array.
      return <ListItem key={item.id.toString()} value={item} />;
    });
    return listItems;
  }

  return (
    <Layout>
      <h1>Posts from Postgres DB with typeORM SSR</h1>
      <p>
        This page uses the universal <strong>getSession()</strong> method in{" "}
        <strong>getServerSideProps()</strong>.
      </p>
      <p>
        Using <strong>getSession()</strong> in{" "}
        <strong>getServerSideProps()</strong> is the recommended approach if you
        need to support Server Side Rendering with authentication.
      </p>
      <p>
        The advantage of Server Side Rendering is this page does not require
        client side JavaScript.
      </p>
      <p>
        The disadvantage of Server Side Rendering is that this page is slower to
        render.
      </p>

      <Fragment>
        <div className="container">
          <div className="table-responsive">
            <table className="table table-sm table-bordered">
              <thead>
                <tr>
                  {Object.keys(posts[0]).map((key, index) => (
                    <th key={index}>{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/*<PostList posts={posts} />*/}
              </tbody>
            </table>
          </div>
        </div>
      </Fragment>
    </Layout>
  );
}

// Export the `session` prop to use sessions with Server Side Rendering
export const getServerSideProps: GetServerSideProps<{
  session: Session | null;
  posts: Post[] | [];
}> = async (context) => {
  const postsService = new PostsService();
  console.log("getServerSideProps: ", await getSession(context));
  const posts = await postsService.getPosts();
  console.log("postsService.getPosts():", posts);
  console.log(`${posts.length} posts fetched from the database`);

  return {
    props: {
      session: await getSession(context),
      posts: posts,
    },
  };
};
