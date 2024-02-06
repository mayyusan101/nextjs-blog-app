import React from "react";
import { Comment, User } from "@prisma/client";
import CommentShow from "@/components/comment/comment-show";

interface CommentListProps {
  comments: (Comment & { user: Partial<User> })[];
}
async function CommentList({ comments }: CommentListProps) {
  let topLevelComments = comments.filter((c) => c.parentId == null);

  const renderComments = topLevelComments.map((comment) => {
    return (
      <CommentShow
        key={comment.id}
        commentId={comment.id}
        comments={comments}
      />
    );
  });

  return (
    <div>
      <h1 className="text-lg font-bold">All {comments.length} comments</h1>
      <div className="my-3">{renderComments}</div>
    </div>
  );
}

export default CommentList;
