import { SubmitButton } from "@/components/form/SubmitButton";
import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/layout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Typography } from "@/components/ui/typography";
import { getRequiredAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";
import React from "react";
import { z } from "zod";

const FormSchema = z.object({
  name: z.string().min(3).max(40),
  image: z.string().url(),
  presentation: z.string(),
});

export default async function EditPage({
  params,
  searchParams,
}: {
  params: { courseId: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const session = await getRequiredAuthSession();
  const course = await prisma.course.findUnique({
    where: {
      id: params.courseId,
      creatorId: session.user.id,
    },
    select: {
      id: true,
      name: true,
      image: true,
      presentation: true,
    },
  });

  if (!course) {
    notFound();
  }

  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Edit course</LayoutTitle>
      </LayoutHeader>
      <LayoutContent>
        <Card>
          <CardContent className="mt-6">
            <form
              action={async (formData) => {
                "use server";

                const userSession = await getRequiredAuthSession();

                const image = formData.get("image");
                const name = formData.get("name");
                const presentation = formData.get("presentation");

                const safeData = FormSchema.safeParse({
                  image,
                  name,
                  presentation,
                });

                if (!safeData.success) {
                  const searchParams = new URLSearchParams();
                  searchParams.set(
                    "error",
                    "Invalid data. Image must be an URL and name must be between 3 and 40 characters."
                  );
                  redirect(
                    `/admin/courses/${
                      course.id
                    }/edit/?${searchParams.toString()}`
                  );
                }

                await prisma.course.update({
                  where: {
                    id: course.id,
                    creatorId: userSession.user.id,
                  },
                  data: safeData.data,
                });

                revalidatePath(`/admin/courses/${course.id}`);
                redirect(`/admin/courses/${course.id}`);
              }}
              className="flex flex-col gap-4"
            >
              <div className="flex flex-col gap-1">
                <Label htmlFor="image">Image</Label>
                <Input defaultValue={course.image} name="image" id="image" />
              </div>
              <div className="flex flex-col gap-1">
                <Label htmlFor="name">Name</Label>
                <Input defaultValue={course.name} name="name" id="name" />
              </div>
              <div className="flex flex-col gap-1">
                <Label htmlFor="presentation">Presentation</Label>
                <Textarea
                  defaultValue={course.presentation}
                  name="presentation"
                  id="presentation"
                />
              </div>
              {searchParams.error && (
                <Typography>Error: {searchParams.error as string}</Typography>
              )}
              <SubmitButton>Submit</SubmitButton>
            </form>
          </CardContent>
        </Card>
      </LayoutContent>
    </Layout>
  );
}
