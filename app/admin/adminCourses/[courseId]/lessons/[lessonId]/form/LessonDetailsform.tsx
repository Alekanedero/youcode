"use client";
import { SubmitButton } from "@/components/form/SubmitButton";
import { LessonDetailsSchema, LESSON_STATE } from "./lesson.schema";
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
import { LessonActionEditDetails } from "../lesson.action";
import { useRouter } from "next/navigation";
import { Select } from "@radix-ui/react-select";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type LessonDetailsFormProps = {
  defaultValue: LessonDetailsSchema & {
    id: string;
    courseId: string;
  };
};

export const LessonDetailsForm = ({ defaultValue }: LessonDetailsFormProps) => {
  const form = useZodForm({
    schema: LessonDetailsSchema,
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
            console.log("Update lesson");
            result = await LessonActionEditDetails({
              lessonId: defaultValue.id,
              data: values,
            });
          }

          if (result) {
            router.push(`/admin/adminCourses/${defaultValue.courseId}/lessons`);
            router.refresh();
          }
        } catch (error) {
          console.log(error);
        }
      }}
    >
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormDescription>Enter the name of the lesson</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="state"
        render={({ field }) => (
          <FormItem>
            <FormLabel>State</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a state" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {LESSON_STATE.map((state, index) => (
                  <SelectItem key={index} value={state} className="capitalize">
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <SubmitButton type="submit">Submit</SubmitButton>
    </Form>
  );
};
