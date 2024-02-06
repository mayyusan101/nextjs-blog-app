"use client";

import React from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  Input,
} from "@nextui-org/react";
import { useFormState } from "react-dom";
import { createPost } from "@/actions";
import CreateButton from "../common/create-btn";

interface PostCreateFormProps {
  slug: string;
}
function PostCreateForm({ slug }: PostCreateFormProps) {
  const bindWithParamAction = createPost.bind(null, slug);

  const [formState, action] = useFormState(bindWithParamAction, {
    errors: {},
  });

  return (
    <div>
      <Popover placement="left-start" className="w-80">
        <PopoverTrigger>
          <Button>Create Post</Button>
        </PopoverTrigger>
        <PopoverContent>
          <form action={action} className="p-5 space-y-4 w-full">
            <h1 className="text-xl mb-6">Create Your Post</h1>
            <Input
              name="title"
              placeholder="enter title"
              autoFocus
              isInvalid={!!formState.errors.title}
              errorMessage={formState.errors.title}
              className="block w-full"
            />
            <Input
              name="content"
              placeholder="enter content"
              isInvalid={!!formState.errors.content}
              errorMessage={formState.errors.content}
              className="block w-full"
            />
            {formState.errors._form ? (
              <div className="p-1 bg-red-200 border border-red-400 rounded my-1">
                {formState.errors._form?.join(", ")}
              </div>
            ) : null}
            <div className="flex gap-1 my-3">
              <CreateButton />
            </div>
          </form>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default PostCreateForm;
