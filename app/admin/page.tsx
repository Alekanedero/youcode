import {
  Layout,
  LayoutActions,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/layout";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import React, { Suspense } from "react";
import { QuickStats } from "./QuickStats";
import { BookCheck, LoaderCircle, Presentation, User2 } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import { NewUsersStats } from "./NewUsersStats";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminPage() {
  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Courses</LayoutTitle>
      </LayoutHeader>
      <LayoutActions>
        <Link href="/admin/adminCourses" className={buttonVariants()}>
          Courses
        </Link>
      </LayoutActions>
      <LayoutContent className="flex flex-col gap-4">
        <Suspense
          fallback={
            <Card>
              <CardHeader>Quick Stats</CardHeader>
              <CardContent className="flex flex-col gap-2">
                <Typography className="flex items-center gap-4">
                  <User2 className="inline-block" size={16} />
                  <LoaderCircle
                    className="animate-spin inline-block"
                    size={14}
                  />
                </Typography>
                <Typography className="flex items-center gap-4">
                  <BookCheck className="inline-block" size={16} />
                  <LoaderCircle
                    className="animate-spin inline-block"
                    size={14}
                  />
                </Typography>
                <Typography className="flex items-center gap-4">
                  <Presentation className="inline-block " size={16} />
                  <LoaderCircle
                    className="animate-spin inline-block"
                    size={14}
                  />
                </Typography>
              </CardContent>
            </Card>
          }
        >
          <QuickStats />
        </Suspense>
        <Suspense
          fallback={
            <Card>
              <CardHeader>Users course activity</CardHeader>
              <CardContent>
                <Skeleton className="h-60 w- full" />
              </CardContent>
            </Card>
          }
        >
          <NewUsersStats />
        </Suspense>
      </LayoutContent>
    </Layout>
  );
}
