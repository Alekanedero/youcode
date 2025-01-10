"use server";

import { authenticatedAction } from "@/lib/action";
import { LessonDetailsSchema } from "./form/lesson.schema";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const LessonActionEditDetailsSchema = z.object({
  lessonId: z.string(),
  data: LessonDetailsSchema,
});

export const LessonActionEditDetails = authenticatedAction
  .schema(LessonActionEditDetailsSchema)
  .action(async ({ parsedInput: { lessonId, data }, ctx: { userId } }) => {
    const lesson = await prisma.lesson.update({
      where: {
        id: lessonId,
        course: {
          creatorId: userId,
        },
      },
      data: data,
    });

    return {
      message: "Lesson updated successfully",
      data: lesson,
    };
  });
