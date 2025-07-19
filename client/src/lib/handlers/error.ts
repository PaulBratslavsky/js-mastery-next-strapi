import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { RequestError, ValidationError } from "../http-errors";
import { logger } from "../logger";

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

const handleError = (error: unknown, responseType: ResponseType = "server") => {
  if (error instanceof RequestError) {
    logger.error("Request error occurred", {
      statusCode: error.statusCode,
      message: error.message,
      errors: error.errors,
      responseType,
    });

    return formatResponse(
      responseType,
      error.statusCode,
      error.message,
      error.errors
    );
  }

  if (error instanceof ZodError) {
    const validationError = new ValidationError(
      error.flatten().fieldErrors as Record<string, string[]>
    );

    logger.error("Validation error occurred", {
      statusCode: validationError.statusCode,
      message: validationError.message,
      errors: validationError.errors,
      responseType,
    });

    return formatResponse(
      responseType,
      validationError.statusCode,
      validationError.message,
      validationError.errors
    );
  }

  if (error instanceof Error) {
    logger.error("Generic error occurred", {
      statusCode: 500,
      message: error.message,
      stack: error.stack,
      responseType,
    });

    return formatResponse(responseType, 500, error.message);
  }

  logger.error("Unknown error occurred", {
    statusCode: 500,
    message: "An unexpected error occurred",
    error: String(error),
    responseType,
  });

  return formatResponse(responseType, 500, "An unexpected error occurred");
};

export { handleError };
