import { z } from "zod";

export const entrySchema = z.object({
  title: z
    .string()
    .min(10, { message: "Title must contain at least 10 characters" })
    .max(200),
  body: z
    .string()
    .min(10, { message: "Body must contain at least 10 characters" })
    .max(200),
});
