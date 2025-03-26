"use server";

import { authenticatedAction, ActionResult } from "@/lib/action";
import { z } from "zod";
import { CourseFormSchema } from "./course.schema";
import { prisma } from "@/lib/prisma";

const CourseActionEditProps = z.object({
  adminCourseId: z.string(),
  data: CourseFormSchema,
});

export const courseActionEdit = authenticatedAction
  .schema(CourseActionEditProps)
  .action(
    async ({
      parsedInput: { adminCourseId, data },
      ctx: { userId },
    }): Promise<ActionResult<typeof data>> => {
      try {
        const course = await prisma.course.update({
          where: {
            id: adminCourseId,
            creatorId: userId,
          },
          data: data,
        });

        return {
          // message: "Course updated successfully",
          data: course,
        };
      } catch (error) {
        console.error(error);
        return {
          // serverError: error.message,
        };
      }
    }
  );

export const courseActionCreate = authenticatedAction
  .schema(CourseFormSchema)
  .action(
    async ({
      parsedInput: data,
      ctx: { userId },
    }): Promise<ActionResult<typeof data>> => {
      try {
        if (!userId) {
          throw new Error("User ID is required");
        }

        const courseData = {
          ...data,
          creatorId: userId,
        };

        const course = await prisma.course.create({
          data: courseData,
        });

        return {
          // message: "Course created successfully",
          data: course,
        };
      } catch (error) {
        console.error(error);
        return {
          // serverError: error.message,
        };
      }
    }
  );
