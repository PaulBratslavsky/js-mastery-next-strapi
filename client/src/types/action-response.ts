import { NextResponse } from "next/server";

/*

{
  "data": null,
  "error": {
    "status": 404,
    "name": "NotFoundError",
    "message": "Not Found",
    "details": {}
  }
    "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 4,
      "pageCount": 1,
      "total": 1
    }
  }
}
}

*/

export type StrapiResponse<T = null> = {
  success: boolean;
  data?: T;
  error?: {
    status: number;
    name: string;
    message: string;
    details?: Record<string, string[]>;
  };
  meta?: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
  status: number;
};

export type SuccessResponse<T = null> = StrapiResponse<T> & { success: true };
export type ErrorResponse = StrapiResponse<undefined> & { success: false };

export type APIErrorResponse = NextResponse<ErrorResponse>;
export type APIResponse<T = null> = NextResponse<SuccessResponse<T>> | ErrorResponse;
