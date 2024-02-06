import PostListPage from "@/components/post/post-list";
import CreateTopicForm from "@/components/topic/create-topic-form";
import TopicListPage from "@/components/topic/topic-list";
import { getTopPosts } from "@/db/queries/post";

export default function Home() {
  return (
    <>
      <div className="flex justify-between gap-4 container">
        <div className="flex-1">
          <h1 className="text-2xl font-semibold mb-5">Top Rated Posts</h1>
          <PostListPage fetchData={getTopPosts} />
        </div>
        <div className="flex-1 flex flex-col items-end gap-4 ">
          <CreateTopicForm />
          <TopicListPage />
        </div>
      </div>
    </>
  );
}
