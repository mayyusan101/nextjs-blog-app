"use server";

import { db } from "@/db";
import { Topic } from "@prisma/client";
import { notFound } from "next/navigation";

export async function getTopicBySlug(slug: string): Promise<Topic> {
  try {
    let topic: Topic;
    topic = await db.topic.findFirst({
      where: {
        slug: slug,
      },
    });

    if (topic) return topic;
    notFound();
  } catch (err: any) {
    throw new Error(err.message);
  }
}
