"use server";

import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const handleLessonStateSchema = z.object({
  lessonId: z.string(),
  progress: z.enum(["COMPLETED", "IN_PROGRESS"]),
});

export const handleLessonState = async ({
  input,
}: {
  input: { lessonId: string; progress: "COMPLETED" | "IN_PROGRESS" };
}) => {
  const session = await getAuthSession();
  const user = session?.user;

  if (!user) {
    throw new Error("You must be logged in to perform this action.");
  }

  const { lessonId, progress } = handleLessonStateSchema.parse(input);
  const userId = user.id;

  if (!userId) {
    throw new Error("User ID is undefined.");
  }

  const updatedLessonOnUser = await prisma.lessonOnUser.update({
    where: {
      userId_lessonId: {
        lessonId,
        userId,
      },
    },
    data: {
      progress,
    },
    select: {
      lesson: {
        select: {
          rank: true,
          courseId: true,
          id: true,
        },
      },
    },
  });

  const nextLesson = await prisma.lesson.findFirst({
    where: {
      courseId: updatedLessonOnUser.lesson.courseId,
      rank: {
        gt: updatedLessonOnUser.lesson.rank,
      },
      state: {
        not: "HIDDEN",
      },
    },
    orderBy: {
      rank: "asc",
    },
  });

  // refresh la page pour mettre a jour le contenu
  revalidatePath(
    `/courses/${updatedLessonOnUser.lesson.courseId}/lessons/${lessonId}`
  );

  if (!nextLesson) {
    return;
  }

  // rediriger vers la prochaine leçon
  redirect(
    `/courses/${updatedLessonOnUser.lesson.courseId}/lessons/${nextLesson.id}`
  );
};
