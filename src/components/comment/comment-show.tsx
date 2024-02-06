"use client";

import type { Comment, User } from "@prisma/client";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@nextui-org/react";
import CreateCommentForm from "./create-comment-form";

interface CommentShowProps {
  commentId: string;
  comments: (Comment & { user: Partial<User> })[];
}

export default function CommentShow({ commentId, comments }: CommentShowProps) {
  const [open, setOpen] = useState(false);
  const comment = comments.find((c) => c.id === commentId);

  if (!comment) {
    return null;
  }

  const children = comments.filter((c) => c.parentId === commentId);
  const renderedChildren = children.map((child) => {
    return (
      <CommentShow key={child.id} commentId={child.id} comments={comments} />
    );
  });

  return (
    <div className="p-4 border mt-2 mb-1">
      <div className="flex gap-3">
        <Image
          src={comment.user.image || ""}
          alt="user image"
          width={40}
          height={40}
          className="w-10 h-10 rounded-full"
        />
        <div className="flex-1 space-y-3">
          <p className="text-sm font-medium text-gray-500">
            {comment.user.name}
          </p>
          <p className="text-gray-900">{comment.content}</p>
          <Button size="sm" variant="light" onClick={() => setOpen(!open)}>
            Reply
          </Button>
          {open && (
            <CreateCommentForm
              onCommentCreate={() => setOpen(false)}
              postId={comment.postId}
              parentId={comment.id}
            />
          )}
        </div>
      </div>
      <div className="pl-4">{renderedChildren}</div>
    </div>
  );
}
