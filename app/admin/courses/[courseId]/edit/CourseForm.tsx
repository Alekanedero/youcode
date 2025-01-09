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
import { courseActionEdit } from "./course.action";
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
      form={form}
      onSubmit={async (values) => {
        console.log(values);

        if (defaultValue?.id) {
          console.log("Update course");
          const result = await courseActionEdit({
            courseId: defaultValue.id,
            data: values,
          });

          if (result) {
            toast.success(result.data);
            router.push(`/admin/courses/${defaultValue.id}`);
            router.refresh();
            return;
          } else {
            toast.error("Some error occurred", {
              // description: result?.serverError,
            });
          }

          return;
        } else {
          console.log("Create course");
          // Ajoute ici la logique pour créer un cours
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
              <Textarea placeholder="## Some title" {...field} />
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
