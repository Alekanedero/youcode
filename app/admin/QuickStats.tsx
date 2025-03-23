import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import { getRequiredAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { BookCheck, Presentation, User2 } from "lucide-react";

export const QuickStats = async () => {
  const session = await getRequiredAuthSession();

  const users = await prisma.user.count({
    where: {
      ownedCourses: {
        some: {
          course: {
            creatorId: session.user.id,
          },
        },
      },
    },
  });
  const lessons = await prisma.lesson.count({
    where: {
      course: {
        creatorId: session.user.id,
      },
    },
  });
  const courses = await prisma.course.count({
    where: {
      creatorId: session.user.id,
    },
  });

  return (
    <Card>
      <CardHeader>Quick Stats</CardHeader>
      <CardContent className="flex flex-col gap-2">
        <Typography className="flex items-center gap-2">
          <User2 className="inline-block" size={16} />
          {users} users
        </Typography>
        <Typography className="flex items-center gap-2">
          <BookCheck className="inline-block" size={16} />
          {courses} courses
        </Typography>
        <Typography className="flex items-center gap-2">
          <Presentation className="inline-block " size={16} />
          {lessons} lessons
        </Typography>
      </CardContent>
    </Card>
  );
};
