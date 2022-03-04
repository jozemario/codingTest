// postsdb/[id].tsx

import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { Fragment } from "react";
import { getOrCreateConnection } from '../../common/lib/api/get-db-connection';
import Post from '../../modules/client/post/api/post.entity'
import PostsService from '../../modules/client/post/api/posts.service'

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id } = context.params;
  /* const conn = await getOrCreateConnection();
  const postRepo = conn.getRepository<Post>("Post");
  const post = JSON.stringify(
    await postRepo.findOneOrFail(parseInt(id as string))
  ); */
  const postsService = new PostsService();
    const post = await postsService.getPost(parseInt(id as string));
    console.log('postsService.getPosts():', post)
    console.log(`${post.id} post fetched from the database`); 

  return {
    props: { post }
  };
}
export default function PostDetailPage({
  post
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const postObj = post as Post;
  return (
    <Fragment>
      <h1 className="m-4 text-center text-3xl text-red-400">{postObj.id} - {postObj.title}</h1>
      <p className="m-8">{postObj.body}</p>
    </Fragment>
  );
}