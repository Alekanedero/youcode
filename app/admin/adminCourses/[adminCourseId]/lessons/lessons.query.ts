import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const getCourseLessons = async ({
  adminCourseId,
  userId,
}: {
  adminCourseId: string;
  userId: string;
}) => {
  return await prisma.course.findFirst({
    where: {
      id: adminCourseId,
      creatorId: userId,
    },

    select: {
      id: true,
      name: true,
      lessons: {
        orderBy: {
          rank: "asc",
        },
        select: {
          id: true,
          name: true,
          state: true,
          courseId: true,
          rank: true,
        },
      },
    },
  });
};

export type AdminLessonItemType = NonNullable<
  Prisma.PromiseReturnType<typeof getCourseLessons>
>["lessons"][number];
