"use client";

import { useFormState } from "react-dom";
import { useEffect, useRef } from "react";
import { Textarea } from "@nextui-org/react";
import CreateButton from "../common/create-btn";
import { createComment } from "@/actions";

interface CommentCreateFormProps {
  postId: string;
  parentId?: string;
  onCommentCreate?: () => void;
}

export default function CommentCreateForm({
  postId,
  parentId,
  onCommentCreate,
}: CommentCreateFormProps) {
  const ref = useRef<HTMLFormElement | null>(null);
  const [formState, action] = useFormState(
    createComment.bind(null, { postId, parentId }),
    { errors: {} }
  );

  useEffect(() => {
    if (formState.success) {
      ref.current?.reset();

      if (onCommentCreate) {
        onCommentCreate();
      }
    }
  }, [formState, onCommentCreate]);

  return (
    <form action={action} ref={ref}>
      <div className="space-y-2 px-1">
        <Textarea
          name="content"
          label="Reply"
          labelPlacement="inside"
          placeholder="Enter your comment"
          isInvalid={!!formState.errors.content}
          errorMessage={formState.errors.content?.join(", ")}
        />

        {formState.errors._form ? (
          <div className="p-2 bg-red-200 border rounded border-red-400">
            {formState.errors._form?.join(", ")}
          </div>
        ) : null}

        <CreateButton />
      </div>
    </form>
  );
}
