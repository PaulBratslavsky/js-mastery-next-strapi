import qs from "qs";

import { getStrapiURL } from "@/lib/utils";
import { UserProfile } from "@/types";
import { StrapiResponse } from "@/types/action-response";

import { fetchData } from "../../fetch-data";

const baseUrl = getStrapiURL();

export async function getAllUsers(
  // queryString?: string,
  // filters?: string,
  currentPage: number = 1
): Promise<StrapiResponse<UserProfile[]>> {
  const PAGE_SIZE = 25;

  const query = qs.stringify({
    sort: ["createdAt:desc"],
    populate: {
      image: {
        fields: ["url", "name", "alternativeText"],
      },
    },
    filters: {
      $or: [
        // { title: { $containsi: queryString } },
        // { content: { $containsi: queryString } },
        // ...(filters ? [{ tags: { label: { $containsi: filters } } }] : []),
      ],
      public: {
        $eq: true,
      },
    },
    pagination: {
      pageSize: PAGE_SIZE,
      page: currentPage,
    },
  });
  const url = new URL("/api/user-profiles", baseUrl);
  url.search = query;
  return fetchData(url.href);
}

export const users = { getAllUsers };
