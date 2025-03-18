import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/layout";
import { getAuthSession } from "@/lib/auth";
import { getLesson } from "./lesson.query";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { LessonsNavigation } from "./LessonsNavigation";
import { Lesson } from "./Lesson";
import { Suspense } from "react";
import { LessonsNavigationSkeleton } from "./LessonsNavigationSkeleton";
import { LessonSkeleton } from "./LessonSkeleton";

export default async function LessonPage({
  params,
}: {
  params: {
    courseId: string;
    lessonId: string;
  };
}) {
  const session = await getAuthSession();
  const lesson = await getLesson(params.lessonId, session?.user.id);

  if (!lesson) {
    notFound();
  }

  const isAutorized = await prisma.course.findUnique({
    where: {
      id: params.courseId,
    },
    select: {
      users: {
        where: {
          userId: session?.user.id ?? "-",
          canceledAt: null,
        },
      },
    },
  });

  if (lesson.state !== "PUBLIC" && !isAutorized?.users.length) {
    return (
      <Layout>
        <LayoutHeader>
          <LayoutTitle>
            You need to be enrolled in this course to view this lesson.
          </LayoutTitle>
        </LayoutHeader>
        <LayoutContent>
          <Link
            href={`/courses/${params.courseId}`}
            className={buttonVariants()}
          >
            Join now
          </Link>
        </LayoutContent>
      </Layout>
    );
  }

  return (
    <div className="flex items-start gap-4 p-4">
      <Suspense fallback={<LessonsNavigationSkeleton />}>
        <LessonsNavigation courseId={params.courseId} />
      </Suspense>
      <Suspense fallback={<LessonSkeleton />}>
        <Lesson {...params} />
      </Suspense>
    </div>
  );
}
