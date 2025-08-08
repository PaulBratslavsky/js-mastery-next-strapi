export const ROUTES = {
  HOME: "/",
  SIGN_UP: "/sign-up",
  SIGN_IN: "/sign-in",
  COMMUNITY: "/community",
  JOBS: "/jobs",
  COLLECTIONS: "/collections",
  ASK_QUESTION: "questions/ask-question",
  TAGS: (id: string) => `/tags/${id}`,
  PROFILE: (id: string) => `/profile/${id}`,
  QUESTIONS: (documentId: string) => `/questions/${documentId}`,
} as const;
