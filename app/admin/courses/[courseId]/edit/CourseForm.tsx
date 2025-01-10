"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useZodForm,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { courseActionCreate, courseActionEdit } from "./course.action";
import { CourseFormSchema } from "./course.schema";
import { SubmitButton } from "@/components/form/SubmitButton";

export type CourseFormProps = {
  defaultValue?: CourseFormSchema & {
    id: string;
  };
};

export const CourseForm = ({ defaultValue }: CourseFormProps) => {
  const form = useZodForm({
    schema: CourseFormSchema,
    defaultValues: defaultValue,
  });

  const router = useRouter();

  return (
    <Form
      className="flex flex-col gap-6"
      form={form}
      onSubmit={async (values) => {
        console.log(values);

        try {
          let result;

          if (defaultValue?.id) {
            console.log("Update course");
            result = await courseActionEdit({
              courseId: defaultValue.id,
              data: values,
            });
          } else {
            console.log("Create course");
            result = await courseActionCreate(values);
          }

          if (result) {
            const redirectUrl = defaultValue?.id
              ? `/admin/courses/${defaultValue.id}`
              : `/admin/courses`;
            router.push(redirectUrl);
            router.refresh();
            return;
          } else {
            toast.error("An unexpected error occurred.");
          }
        } catch (error) {
          console.error("Error occurred:", error);
          toast.error("Failed to complete the action. Please try again.");
        }
      }}
    >
      <FormField
        control={form.control}
        name="image"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Image</FormLabel>
            <FormControl>
              <Input placeholder="https://googleimage.com" {...field} />
            </FormControl>
            <FormDescription>
              Host and use an image. You can use{" "}
              <Link href="https://imgur.com">Imgur</Link> to host your image.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input placeholder="NextReact" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="presentation"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Presentation</FormLabel>
            <FormControl>
              <Textarea
                className="h-36"
                placeholder="## Some title"
                {...field}
              />
            </FormControl>
            <FormDescription>Markdown is supported.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <SubmitButton type="submit">Submit</SubmitButton>
    </Form>
  );
};
