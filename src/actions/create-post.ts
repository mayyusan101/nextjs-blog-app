"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { authOptions } from "@/auth";
import { db } from "@/db";
import { Post } from "@prisma/client";
import { getServerSession } from "next-auth";
import { z } from "zod";
import path from "@/utils/path";

const createPostSchema = z.object({
  title: z.string().regex(/[a-z-]/, {
    message: "Title must be lower case letter without space",
  }),
  content: z
    .string()
    .min(5, { message: "Content must be 5 or more characters long" }),
});

interface CreatePostFormState {
  errors: {
    title?: string[];
    content?: string[];
    _form?: string[];
  };
}

export async function createPost(
  slug: string,
  formState: CreatePostFormState,
  formData: FormData
): Promise<CreatePostFormState> {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return {
      errors: {
        _form: ["You needs to login to create post"],
      },
    };
  }
  const result = createPostSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const topic = await db.topic.findFirst({
    where: {
      slug,
    },
  });
  let post: Post;
  try {
    post = await db.post.create({
      data: {
        title: result.data.title,
        content: result.data.content,
        userId: session.user.id,
        topicId: topic.id,
      },
    });
  } catch (err: any) {
    if (err instanceof Error) {
      return {
        errors: {
          _form: [err.message],
        },
      };
    } else {
      return {
        errors: {
          _form: ["Failed to create post"],
        },
      };
    }
  }

  revalidatePath(path.topicShow(slug));
  redirect(path.postShow(slug, post.id));
}
