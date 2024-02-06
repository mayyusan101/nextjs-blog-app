import { PostWithData } from "@/db/queries/post";
import path from "@/utils/path";
import Link from "next/link";
import React from "react";

interface PostListPageProps {
  fetchData: () => Promise<PostWithData[]>;
}
async function PostListPage({ fetchData }: PostListPageProps) {
  const posts = await fetchData();

  return (
    <div>
      {posts.map((post) => (
        <Link
          href={path.postShow(post.topic.slug, post.id)}
          key={post.id}
          className="p-3 border border-gray-900 block"
        >
          <h1 className="text-xl font-semibold mb-3">{post.title}</h1>
          <p className="text-base mb-2">Author-{post.user.name}</p>
          <p className="text-xs">Comment - {post._count.comments}</p>
        </Link>
      ))}
    </div>
  );
}

export default PostListPage;
