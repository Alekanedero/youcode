// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAuthSession } from "@/lib/auth";
import { getCourse } from "../course.query";
// import { LessonNavigationItem } from "./[lessonId]/LessonNavigationItem";
import LessonNavigationCard from "./LessonNavigationCard";

export type LessonsNavigationProps = {
  courseId: string;
};

export const LessonsNavigation = async (props: LessonsNavigationProps) => {
  const session = await getAuthSession();
  const course = await getCourse({
    courseId: props.courseId,
    userId: session?.user.id,
  });

  if (!course) {
    return null;
  }

  return (
    <LessonNavigationCard course={course} />
    // <Card className="max-w-xs flex-1">
    //   <CardHeader>
    //     <CardTitle>{course.name}</CardTitle>
    //   </CardHeader>
    //   <CardContent className="flex flex-col gap-2">
    //     {course.lessons.map((lesson) => (
    //       <LessonNavigationItem key={lesson.id} lesson={lesson} />
    //     ))}
    //   </CardContent>
    // </Card>
  );
};
