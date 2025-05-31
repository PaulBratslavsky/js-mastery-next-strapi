export interface BaseParams {
  [key: string]: string | string[] | undefined;
}

export interface RouteParams extends BaseParams {
  slug?: string;
  id?: string;
  tag?: string;
  questionId?: string;
}

export type Params = Promise<RouteParams>;
export type SearchParams = Promise<BaseParams>;