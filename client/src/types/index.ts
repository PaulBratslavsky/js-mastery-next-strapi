export interface BaseParams {
  [key: string]: string | string[] | undefined;
}

export interface RouteParams extends BaseParams {
  slug?: string;
  id?: string;
  tag?: string;
  questionId?: string;
  url?: string;
}

export type Params = Promise<RouteParams>;
export type SearchParams = Promise<BaseParams>;

export type Tag = {
  documentId: string;
  label: string;
  value: string;
  questions?: number;
  showCount?: boolean;
  compact?: boolean;
};


export type UserProfile = {
  documentId: string;
  name: string;
  bio: string;
  reputation: number;
  public: boolean;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  image: {
    id: number;
    documentId: string;
    url: string;
    name: string;
    alternativeText: string;
  };
};

export type Question = {
  documentId: string;
  title: string;
  description: string;
  tags?: Tag[];
  userProfile?: UserProfile;
  upvotes: number;
  views: number;
  answers: number;
  createdAt: Date;
};

export type StrapiUserData = {
  id: number;
  documentId: string;
  username: string;
  email: string;
  userProfile: {
    id: number,
    documentId: string,
  }
}

export type StrapiUserProfileData = {
  id: number;
  documentId: string;
  name: string;
  githubLink: string;
  bio: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}