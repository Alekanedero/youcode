import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { LoaderCircle } from "lucide-react";

export const CourseCardSkeleton = () => {
  return (
    <Card className="hover:bg-accent">
      <CardHeader className="flex flex-row gap-5 space-y-0 items-center">
        <Avatar className="h-14 w-14 rounded">
          <AvatarFallback>
            <LoaderCircle size={24} className="animate-spin" />
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-col gap-3">
          <Skeleton className="h-5 w-56" />
          <div className="flex flex-row gap-2">
            <Avatar className="h-8 w-8">
              <AvatarFallback>
                <LoaderCircle size={24} className="animate-spin" />
              </AvatarFallback>
            </Avatar>
            <Skeleton className="h-9 w-20" />
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};
