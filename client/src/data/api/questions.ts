import qs from "qs";

import { handleError } from "@/lib/handlers/error";
import { getStrapiURL } from "@/lib/utils";
import { AskQuestionSchema } from "@/lib/validations";
import type { Question  } from "@/types";
import { StrapiResponse } from "@/types/action-response";

import { serverActionHandler } from "../action";
import { fetchData } from "../fetch-data";
import { mutateData } from "../mutate-data";

const baseUrl = getStrapiURL();

export async function getAllQuestions(
  queryString?: string,
  filters?: string,
  currentPage: number = 1
): Promise<StrapiResponse<Question[]>> {
  const PAGE_SIZE = 4;

  const query = qs.stringify({
    sort: ["createdAt:desc"],
    populate: {
      tags: true,
      userProfile: {
        populate: {
          image: {
            fields: ["url", "name", "alternativeText"],
          },
        },
      },
    },
    filters: {
      $or: [
        { title: { $containsi: queryString } },
        { content: { $containsi: queryString } },
        ...(filters ? [{ tags: { label: { $containsi: filters } } }] : []),
      ],
      type: {
        $eq: "question",
      },
    },
    pagination: {
      pageSize: PAGE_SIZE,
      page: currentPage,
    },
  });
  const url = new URL("/api/contents", baseUrl);
  url.search = query;
  return fetchData(url.href);
}

interface CreateQuestionParams {
  title: string;
  content: string;
  tags: string[];
}

export async function crateQuestion(
  payload: CreateQuestionParams
): Promise<StrapiResponse<Question>> {
  "use server";

  const validationResult = await serverActionHandler({
    payload,
    schema: AskQuestionSchema,
  });

  if (validationResult instanceof Error)
    return handleError(validationResult) as StrapiResponse<Question>;

  const url = new URL("/api/contents", baseUrl);
  return mutateData("POST", url.href, payload);
}

export const questions = {
  getAllQuestions,
  crateQuestion,
};
