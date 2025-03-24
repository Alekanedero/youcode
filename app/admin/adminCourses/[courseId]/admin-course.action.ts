"use server";
import { getRequiredAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

type toggleAdminCourseStateType = {
  courseId?: string;
  state?: "PUBLISHED" | "DRAFT";
};

export async function toggleAdminCourseState({
  courseId,
  state,
}: toggleAdminCourseStateType) {
  {
    const session = await getRequiredAuthSession();
    const userId = session.user.id;

    if (!userId) {
      throw new Error("User is not auhtentificated.");
    }

    if (!state) {
      throw new Error("Course not found or not authorized.");
    }

    const newState = state === "DRAFT" ? "PUBLISHED" : "DRAFT";

    await prisma.course.update({
      where: {
        id: courseId,
        creatorId: userId,
      },
      data: { state: newState },
    });

    revalidatePath(`/admin/adminCourses/${courseId}`);
  }
}
