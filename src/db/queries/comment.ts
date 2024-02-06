import { Comment } from "@prisma/client";
import { db } from "..";

export type CommentWithData = Comment & {
  user: { name: string; image: string };
};

export async function getAllCommentsByPostId(
  postId: string
): Promise<CommentWithData[]> {
  return db.comment.findMany({
    where: {
      postId: postId,
    },
    include: {
      user: { select: { name: true, image: true } },
    },
  });
}
