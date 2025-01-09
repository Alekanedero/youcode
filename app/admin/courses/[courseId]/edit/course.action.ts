"use server";

import { authenticatedAction } from "@/lib/action";
import { z } from "zod";
import { CourseFormSchema } from "./course.schema";
import { prisma } from "@/lib/prisma";

const CourseActionEditProps = z.object({
  courseId: z.string(),
  data: CourseFormSchema,
});

export const courseActionEdit = authenticatedAction
  .schema(CourseActionEditProps)
  .action(async ({ parsedInput: { courseId, data }, ctx: { userId } }) => {
    await prisma.course.update({
      where: {
        id: courseId,
        creatorId: userId,
      },
      data: data,
    });

    return "Course updated successfully";
  });
