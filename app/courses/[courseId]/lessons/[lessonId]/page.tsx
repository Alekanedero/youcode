import { getAuthSession } from "@/lib/auth";
import { getLesson } from "./lesson.query";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import { MdxProse } from "./MdxProse";
import { SubmitButton } from "@/components/form/SubmitButton";
import { handleLessonState } from "./lesson.action";
import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/layout";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default async function LessonPage({
  params: { courseId, lessonId },
}: {
  params: {
    courseId: string;
    lessonId: string;
  };
}) {
  const session = await getAuthSession();
  const lesson = await getLesson(lessonId, session?.user.id);

  if (!lesson) {
    notFound();
  }

  //Cette fonction vérifie si un user est inscrit à un cours et si son inscription n'est pas annulée.
  const isAuthorized = await prisma.course.findUnique({
    where: {
      id: courseId,
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

  if (lesson.state !== "PUBLIC" && !isAuthorized?.users.length) {
    return (
      <Layout>
        <LayoutHeader>
          <LayoutTitle>
            You need to be enrolled in htis course to view this lesson
          </LayoutTitle>
        </LayoutHeader>
        <LayoutContent>
          <Link href={`/courses/${courseId}`} className={buttonVariants()}>
            Join now
          </Link>
        </LayoutContent>
      </Layout>
    );
  }

  if (lesson.users.length === 0 && session?.user.id) {
    await prisma.lessonOnUser.create({
      data: {
        userId: session?.user.id,
        lessonId: lesson.id,
      },
    });
  }

  return (
    <div className="flex-1">
      <Card>
        <CardHeader>
          <CardTitle>{lesson.name}</CardTitle>
        </CardHeader>
        <CardContent className="">
          {/* <MdxProse markdown={lesson.content} /> */}
          {lesson.content}
        </CardContent>
        <CardFooter>
          <form className="ml-auto max-w-2xl flex flex-row-reverse">
            <SubmitButton
              size="sm"
              formAction={async () => {
                "use server";

                await handleLessonState({
                  input: {
                    lessonId: lesson.id,
                    progress:
                      lesson.progress === "COMPLETED"
                        ? "IN_PROGRESS"
                        : "COMPLETED",
                  },
                });
              }}
            >
              {lesson.progress === "COMPLETED"
                ? "Mark as in progress"
                : "Completed"}
            </SubmitButton>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
