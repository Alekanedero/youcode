import { getAuthSession } from "@/lib/auth";
import { notFound } from "next/navigation";
import { Course } from "../../../courses/[courseId]/Course";
import { getCourse } from "../../../courses/[courseId]/course.query";
import { CourseDialog } from "./CourseDialog";

export default async function ModalCoursePage({
  params: { courseId },
}: {
  params: {
    courseId: string;
  };
}) {
  const session = await getAuthSession();
  const course = await getCourse({
    courseId: courseId,
    userId: session?.user.id,
  });

  if (!course) {
    notFound();
  }

  return (
    <CourseDialog course={course}>
      <Course course={course} userId={session?.user.id} />
    </CourseDialog>
  );
}
