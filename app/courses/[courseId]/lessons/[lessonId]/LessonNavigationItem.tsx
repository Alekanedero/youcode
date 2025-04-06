"use client";

import { Typography } from "@/components/ui/typography";
import { CheckCircle, Circle, CircleDashed, Globe } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { CourseLessonType } from "../../course.query";

export type LessonNavigationItemProps = {
  lesson: CourseLessonType;
};

export const getLessonIcon = (progress: CourseLessonType["progress"]) => {
  if (progress === "COMPLETED") {
    return CheckCircle;
  }

  if (progress === "IN_PROGRESS") {
    return Circle;
  }

  return CircleDashed;
};

export const LessonNavigationItem = ({ lesson }: LessonNavigationItemProps) => {
  const Icon = getLessonIcon(lesson.progress);

  const params = useParams();
  const lessonId = String(params?.lessonId);
  const isCurrentLesson = lessonId === lesson.id;

  return (
    <Link href={`/courses/${lesson.courseId}/lessons/${lesson.id}`}>
      <div
        className={cn(
          "flex items-center gap-3 rounded border border-border bg-card px-4 py-2 transition-colors hover:bg-accent",
          {
            "bg-primary/10 border-primary/40 hover:bg-primary/30":
              isCurrentLesson,
          }
        )}
      >
        <Icon size={16} />
        <Typography variant="small" className="flex-1">
          {lesson.name}
        </Typography>
        {lesson.state === "PUBLIC" ? (
          <Globe size={12} className="ml-auto" />
        ) : null}
      </div>
    </Link>
  );
};
