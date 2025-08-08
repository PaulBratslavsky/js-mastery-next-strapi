import qs from "qs";

import { getStrapiURL } from "@/lib/utils";
import type { Tag } from "@/types";
import { StrapiResponse } from "@/types/action-response";

import { fetchData } from "../../fetch-data";


const baseUrl = getStrapiURL();

async function getAllTags(): Promise<StrapiResponse<Tag[]>> {
  const PAGE_SIZE = 25;

  const query = qs.stringify({
    sort: ["createdAt:desc"],
    pagination: {
      pageSize: PAGE_SIZE,
    },
  });
  const url = new URL("/api/tags", baseUrl);
  url.search = query;
  return fetchData(url.href);
}

export const tags = { getAllTags };
