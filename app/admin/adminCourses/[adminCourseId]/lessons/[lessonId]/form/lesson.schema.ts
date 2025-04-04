import { z } from "zod";

// Enumération des états possibles
// Utilisation de `as const` pour rendre le tableau un tableau de littéraux
export const LESSON_STATE = ["HIDDEN", "PUBLISHED", "PUBLIC"] as const;

export const LessonDetailsSchema = z.object({
  name: z
    .string()
    .min(3)
    .max(40, { message: "Le nom doit contenir entre 3 et 40 caractères." }),
  state: z.enum(LESSON_STATE), // Validation stricte des états
});

export type LessonDetailsSchema = z.infer<typeof LessonDetailsSchema>;

// ------------- Test fix mdx ---------------

export const LessonContentSchema = z.object({
  content: z.string().min(1, { message: "Le contenu ne peut pas être vide." }),
});

export type LessonContentSchema = z.infer<typeof LessonContentSchema>;
