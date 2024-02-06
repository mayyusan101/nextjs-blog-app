import React from "react";
import PostCreateForm from "@/components/post/post-create-form";
import PostListPage from "@/components/post/post-list";
import { getPostsBySlug } from "@/db/queries/post";

interface TopicShowPageProps {
  params: {
    slug: string;
  };
}
async function TopicShowPage({ params }: TopicShowPageProps) {
  const action = getPostsBySlug.bind(null, params.slug);
  return (
    <div className="flex justify-between gap-4 p-4">
      <div className="flex-1">
        <h1 className="text-xl font-semibold mb-3">All Posts</h1>
        <PostListPage fetchData={action} />
      </div>
      <div className="flex-1 flex justify-end">
        <PostCreateForm slug={params.slug} />
      </div>
    </div>
  );
}

export default TopicShowPage;
