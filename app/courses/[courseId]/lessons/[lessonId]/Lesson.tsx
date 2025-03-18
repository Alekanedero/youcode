import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getLesson } from "./lesson.query";
import { MdxProse } from "./MdxProse";
import { getAuthSession } from "@/lib/auth";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

export const Lesson = async ({
  lessonId,
  courseId,
}: {
  lessonId: string;
  courseId: string;
}) => {
  const session = await getAuthSession();
  const lesson = await getLesson(lessonId, session?.user.id);

  if (!lesson) {
    notFound();
  }

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
    throw new Error("Unauthorized");
  }

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>{lesson.name}</CardTitle>
      </CardHeader>
      <CardContent className="">
        <MdxProse markdown={lesson.content} />
      </CardContent>
    </Card>
  );
};
