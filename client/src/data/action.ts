"use server";

import { z, ZodError, ZodType } from "zod";

import { UnauthorizedError, ValidationError } from "@/lib/http-errors";
import { getAuthToken } from "@/services/get-token";

type ActionOptions<T> = {
  payload?: T;
  schema?: ZodType<T>;
};

export async function serverActionHandler<T>(props: ActionOptions<T>) {
  const { payload, schema } = props;

  const authToken = await getAuthToken();
  
  if (!authToken)
    return new UnauthorizedError(
      "You are not authorized to make this request!"
    );

  if (schema && payload) {
    try {
      schema.parse(payload);
    } catch (err) {
      if (err instanceof ZodError) {
        const flat = z.flattenError(err);
        // flat.fieldErrors: Record<string, string[]>
        return new ValidationError(flat.fieldErrors);
      } else {
        return new Error("Schema Validation Failed!");
      }
    }
  }

  return { payload };
}
