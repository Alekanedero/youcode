import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/layout";
import { getAuthSession } from "@/lib/auth";
import { notFound } from "next/navigation";
import { getCourse } from "../../course.query";

export default async function LessonPage({
  params,
}: {
  params: {
    courseId: string;
    lessonId: string;
  };
}) {
  const session = await getAuthSession();
  const course = await getCourse({
    courseId: params.courseId,
    userId: session?.user.id,
  });

  if (!course) {
    notFound();
  }

  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Lesson</LayoutTitle>
      </LayoutHeader>
      <LayoutContent></LayoutContent>
    </Layout>
  );
}
