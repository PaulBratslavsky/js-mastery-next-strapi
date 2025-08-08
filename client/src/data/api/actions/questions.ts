"use server";

import { serverActionHandler } from "@/data/action-handler";
import { mutateData } from "@/data/mutate-data";
import { logger } from "@/lib/logger";
import { getStrapiURL } from "@/lib/utils";
import { AskQuestionSchema } from "@/lib/validations";
import type { Tag, Question } from "@/types";
import { StrapiResponse } from "@/types/action-response";
const baseUrl = getStrapiURL();

interface CreateQuestionParams {
  title: string;
  content: string;
  tags: Tag[];
}

interface CreateQuestionPayload {
  data: {
    title: string;
    content: string;
    type: string;
    tags: {
      connect: string[]; // documentIds for Strapi
    }
  };
}

export async function createQuestion(
  formData: FormData
): Promise<StrapiResponse<{ data: Question }>> {
  // First reconstruct the form data for validation
  const formPayload: CreateQuestionParams = {
    title: formData.get("title") as string,
    content: formData.get("content") as string,
    tags: JSON.parse(formData.get("tags") as string), // Parse Tag objects from JSON
  };

  const validationResult = await serverActionHandler({
    payload: formPayload,
    schema: AskQuestionSchema,
  });

  if (validationResult instanceof Error) {
    console.error(validationResult);
    return {
      status: 400,
      success: false,
      data: undefined,
      error: {
        status: 400,
        name: validationResult.name,
        message: validationResult.message,
      },
    };
  }

  // Create payload for Strapi with documentIds
  const strapiPayload: CreateQuestionPayload = {
    data: {
      title: formPayload.title,
      content: formPayload.content,
      type: "question",
      tags: {
        connect: formPayload.tags.map((tag) => tag.documentId),
      }
    },
  };

  logger.info("Payload to send to Strapi", strapiPayload);

  const url = new URL("/api/contents", baseUrl);
  return await mutateData("POST", url.href, strapiPayload);
}


export async function updateQuestion(
  questionId: string,
  formData: FormData
): Promise<StrapiResponse<{ data: Question }>> {
  const formPayload: CreateQuestionParams = {
    title: formData.get("title") as string,
    content: formData.get("content") as string,
    tags: JSON.parse(formData.get("tags") as string),
  };

  const validationResult = await serverActionHandler({
    payload: formPayload,
    schema: AskQuestionSchema,
  });

  if (validationResult instanceof Error) {
    console.error(validationResult);
    return {
      status: 400,
      success: false,
      data: undefined,
      error: {
        status: 400,
        name: validationResult.name,
        message: validationResult.message,
      },
    };
  }

  const strapiPayload: CreateQuestionPayload = {
    data: {
      title: formPayload.title,
      content: formPayload.content,
      type: "question",
      tags: {
        connect: formPayload.tags.map((tag) => tag.documentId),
      }
    },
  };

  logger.info("Update payload to send to Strapi", strapiPayload);

  const url = new URL(`/api/contents/${questionId}`, baseUrl);
  return await mutateData("PUT", url.href, strapiPayload);
}