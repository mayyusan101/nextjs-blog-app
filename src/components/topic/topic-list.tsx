import { db } from "@/db";
import path from "@/utils/path";
import Link from "next/link";
import React from "react";

export default async function TopicListPage() {
  const topics = await db.topic.findMany();
  return (
    <div className="p-3 border border-gray-600 px-8 mt-3">
      <h2 className="text-xl font-semibold mb-3">All Topics</h2>
      <div className="flex flex-col gap-1">
        {topics.map((topic) => (
          <Link
            className="underline hover:text-blue-400"
            href={path.topicShow(topic.slug)}
            key={topic.id}
          >
            {topic.slug}
          </Link>
        ))}
      </div>
    </div>
  );
}
