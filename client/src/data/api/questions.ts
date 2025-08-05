import qs from "qs";

import { getStrapiURL } from "@/lib/utils";
import { Question } from "@/types";
import { StrapiResponse } from "@/types/action-response";

import { fetchData } from "../fetch-data";

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
