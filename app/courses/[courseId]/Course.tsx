/* eslint-disable react/no-unescaped-entities */
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import { MarkdownProse } from "@/features/mdx/MarkdownProse";
import { SubmitButton } from "@/components/form/SubmitButton";
import { prisma } from "@/lib/prisma";
import { getRequiredAuthSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { LessonNavigationItem } from "./lessons/[lessonId]/LessonNavigationItem";
import { redirect } from "next/navigation";
import { CourseLessonType, CourseType } from "./course.query";

export type CourseProps = {
  course: CourseType;
  userId?: string;
};

export const Course = ({ course, userId }: CourseProps) => {
  const isLogin = Boolean(userId);

  return (
    <div className="flex flex-col items-start gap-4 ">
      <div className="flex flex-col items-start gap-4 lg:flex-row w-full">
        <Card className="flex-[2] hover:bg-accent">
          <CardHeader className="flex flex-row gap-3 space-y-0">
            <Avatar className="h-14 w-14 rounded">
              <AvatarFallback>{course.name[0]}</AvatarFallback>
              {course.image ? <AvatarImage src={course.image} /> : null}
            </Avatar>
            <div className="flex flex-col gap-3">
              <CardTitle>{course.name}</CardTitle>
              <div className="flex flex-row gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>{course.creator.name?.[0]}</AvatarFallback>
                  {course.creator.image ? (
                    <AvatarImage src={course.creator.image} />
                  ) : null}
                </Avatar>
                <Typography variant="large" className=" text-muted-foreground">
                  {course.creator.name}
                </Typography>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* <MarkdownProse markdown={course.presentation} /> */}
            {course.presentation ? (
              <MarkdownProse markdown={course.presentation} />
            ) : (
              <p className="text-muted-foreground">
                No presentation available for this course.
              </p>
            )}
          </CardContent>
        </Card>
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Lessons</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            {course.lessons.map((lesson: CourseLessonType) => (
              <LessonNavigationItem lesson={lesson} key={lesson.id} />
            ))}
          </CardContent>
        </Card>
      </div>
      {course.isCanceled ? <p>You can't join this course.</p> : null}
      {!course.isEnrolled && !course.isCanceled && isLogin ? (
        <div>
          <form>
            <SubmitButton
              formAction={async () => {
                "use server";

                const session = await getRequiredAuthSession();

                const courseOnUser = await prisma.courseOnUser.create({
                  data: {
                    userId: session.user.id,
                    courseId: course.id,
                  },
                  select: {
                    course: {
                      select: {
                        id: true,
                        lessons: {
                          orderBy: {
                            rank: "asc",
                          },
                          take: 1,
                          select: {
                            id: true,
                          },
                        },
                      },
                    },
                  },
                });

                const lesson = courseOnUser.course.lessons[0];

                revalidatePath(`/courses/${course.id}`);

                if (!lesson) {
                  return;
                }

                redirect(`/courses/${course.id}/lessons/${lesson.id}`);
              }}
            >
              Join
            </SubmitButton>
          </form>
        </div>
      ) : null}
    </div>
  );
};
