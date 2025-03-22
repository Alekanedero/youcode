import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { CircleDashed } from "lucide-react";

const LessonItemSkeleton = () => {
  return (
    <div className="flex items-center gap-3 rounded border border-border bg-card px-4 py-2 transition-colors hover:bg-accent">
      <CircleDashed size={16} />
      <Skeleton className="h-6 w-full" />
    </div>
  );
};

export const LessonsNavigationSkeleton = () => {
  return (
    <Card className="max-w-xs flex-1">
      <CardHeader>
        <Skeleton className="h-5 w-40" />
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <LessonItemSkeleton key={i} />
        ))}
      </CardContent>
    </Card>
  );
};
