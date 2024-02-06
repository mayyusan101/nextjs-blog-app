import CommentList from "@/components/comment/comment-list";
import CreateCommentForm from "@/components/comment/create-comment-form";
import PostShow from "@/components/post/post-show";
import { getAllCommentsByPostId } from "@/db/queries/comment";
import { getPostById } from "@/db/queries/post";
import path from "@/utils/path";
import { Divider } from "@nextui-org/react";
import Link from "next/link";
import React from "react";

interface PostPageProps {
  params: {
    postId: string;
    slug: string;
  };
}

async function PostPage({ params }: PostPageProps) {
  const post = await getPostById(params.postId);
  const comments = await getAllCommentsByPostId(params.postId);
  return (
    <>
      <Link
        className="underline decoration-solid"
        href={path.topicShow(params.slug)}
      >
        {"< "}Back to {params.slug}
      </Link>
      <div className="min-w-[400px]  p-3">
        <PostShow post={post} />

        <CreateCommentForm postId={params.postId} />
        <Divider className="my-3" />
        <CommentList comments={comments} />
      </div>
    </>
  );
}

export default PostPage;
