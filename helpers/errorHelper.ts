import { ValidationError } from "@/types";
import { ZodError } from "zod";

interface SchemaType<T> {
  parse: (object: T) => void;
}

export function getErrors<T extends SchemaType<U>, U>(schema: T, object: U) {
  const errors: ValidationError[] = [];

  try {
    schema.parse(object);
  } catch (error) {
    for (let issue of (error as ZodError).issues) {
      errors.push({
        field: issue.path[0] as string,
        message: issue.message,
      });
    }
  }
  return errors;
}

export function hasError(
  field: string,
  errors: ValidationError[]
): boolean | string {
  for (let error of errors) {
    if (error.field === field) {
      return error.message;
    }
  }
  return false;
}
