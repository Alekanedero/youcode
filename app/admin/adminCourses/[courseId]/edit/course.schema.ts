import { z } from "zod";

export const CourseFormSchema = z.object({
  name: z.string().min(3).max(40),
  image: z.string().url(),
  presentation: z.string(),
  state: z.enum(["DRAFT", "PUBLISHED"]),
});

export type CourseFormSchema = z.infer<typeof CourseFormSchema>;
