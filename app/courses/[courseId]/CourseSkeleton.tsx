import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Loader } from "@/components/ui/Loader";
import { Skeleton } from "@/components/ui/skeleton";
import { LessonsNavigationSkeleton } from "./lessons/LessonsNavigationSkeleton";

export const CourseSkeleton = () => {
  return (
    <div className="flex flex-col items-start gap-4">
      <div className="flex w-full flex-col items-start gap-4 lg:flex-row">
        <Card className="flex-[2] hover:bg-accent">
          <CardHeader className="flex flex-row gap-3 space-y-0">
            <Avatar className="h-14 w-14 rounded">
              <AvatarFallback>
                <Loader size={24} />
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-3">
              <Skeleton className="h-5 w-56" />
              <div className="flex flex-row gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>
                    <Loader size={16} />
                  </AvatarFallback>
                </Avatar>
                <Skeleton className="h-9 w-20" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Skeleton className="h-9 w-40" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-1/3" />
            <Skeleton className="h-5 w-1/2" />
          </CardContent>
        </Card>
        <LessonsNavigationSkeleton />
      </div>
    </div>
  );
};
