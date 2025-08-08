import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { RequestError, ValidationError } from "../http-errors";
// import { logger } from "../logger";

export type ResponseType = "api" | "server";

const formatResponse = (
  responseType: ResponseType,
  status: number,
  message: string,
  errors?: Record<string, string[]> | undefined
) => {
  const responseContent = {
    success: false,
    error: {
      message,
      details: errors,
    },
  };

  return responseType === "api"
    ? NextResponse.json(responseContent, { status })
    : { status, ...responseContent };
};

const handleError = (
  error: unknown,
  responseType: ResponseType = "server"
) => {
  let statusCode = 500;
  let message = "An unexpected error occurred";
  let errors: Record<string, string[]> | undefined;

  if (error instanceof RequestError) {
    statusCode = error.statusCode;
    message = error.message;
    errors = error.errors;

    // logger.error("Request error occurred", {
    //   statusCode,
    //   message,
    //   errors,
    //   responseType,
    // });
  } else if (error instanceof ZodError) {
    const validationError = new ValidationError(
      error.flatten().fieldErrors as Record<string, string[]>
    );

    statusCode = validationError.statusCode;
    message = validationError.message;
    errors = validationError.errors;

    // logger.error("Validation error occurred", {
    //   statusCode,
    //   message,
    //   errors,
    //   responseType,
    // });
  } else if (error instanceof Error) {
    message = error.message;

    // logger.error("Generic error occurred", {
    //   statusCode,
    //   message,
    //   stack: error.stack,
    //   responseType,
    // });
  } else {
    // logger.error("Unknown error occurred", {
    //   statusCode,
    //   message,
    //   error: String(error),
    //   responseType,
    // });
  }

  return formatResponse(responseType, statusCode, message, errors);
};

export { handleError };
