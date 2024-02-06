"use server";
import { Post } from "@prisma/client";
import { db } from "..";
import { notFound } from "next/navigation";

export type PostWithData = Post & {
  topic: { slug: string };
  user: { name: string };
  _count: { comments: number };
};

export async function getPostsBySlug(slug: string): Promise<PostWithData[]> {
  return db.post.findMany({
    where: {
      topic: {
        slug: slug,
      },
    },
    include: {
      topic: { select: { slug: true } },
      user: { select: { name: true } },
      _count: { select: { comments: true } },
    },
  });
}

export async function getTopPosts(): Promise<PostWithData[]> {
  return db.post.findMany({
    take: 5,
    orderBy: {
      id: "asc",
    },
    include: {
      topic: { select: { slug: true } },
      user: { select: { name: true } },
      _count: { select: { comments: true } },
    },
  });
}

export async function getPostById(postId: string): Promise<Post> {
  try {
    let post: Post;
    post = await db.post.findFirst({
      where: {
        id: postId,
      },
    });

    if (post) return post;
    notFound();
  } catch (err: any) {
    throw new Error(err.message);
  }
}
