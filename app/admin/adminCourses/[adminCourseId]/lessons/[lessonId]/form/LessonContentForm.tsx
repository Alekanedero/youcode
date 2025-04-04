"use client";

import { lessonActionEditContent } from "../lesson.action";
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
import { LessonContentSchema } from "./lesson.schema";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/form/SubmitButton";

export type LessonContentFormProps = {
  defaultValue: LessonContentSchema & {
    id: string;
    courseId: string;
  };
};

// export type SyncState = "sync" | "not-sync" | "syncing";

// export const getBadgeVariant = (
//   syncState: SyncState
// ): BadgeProps["variant"] => {
//   if (syncState === "not-sync") {
//     return "destructive";
//   }

//   if (syncState === "syncing") {
//     return "default";
//   }

//   return "secondary";
// };

export const LessonContentForm = ({ defaultValue }: LessonContentFormProps) => {
  const form = useZodForm({
    schema: LessonContentSchema,
    defaultValues: defaultValue,
  });
  const router = useRouter();

  // const [syncState, setSyncState] = useState<SyncState>("sync");

  // const handlerOnChange = useDebounceFn(async (value: string) => {
  //   setSyncState("syncing");

  //   const { serverError } = await lessonActionEditContent({
  //     lessonId: lessonId,
  //     markdown: value,
  //   });

  //   if (serverError) {
  //     toast.error(serverError);
  //     setSyncState("not-sync");
  //     return;
  //   }

  //   setSyncState("sync");
  // });

  // useEffect(() => {
  //   if (syncState === "sync") return;

  //   const beforeUnload = (e: BeforeUnloadEvent) => {
  //     e.preventDefault();
  //     e.returnValue =
  //       "Are you sure you want to leave? All unsaved changes will be lost.";
  //   };

  //   window.addEventListener("beforeunload", beforeUnload);

  //   return () => {
  //     window.removeEventListener("beforeunload", beforeUnload);
  //   };
  // }, [syncState]);

  return (
    <Form
      form={form}
      onSubmit={async (value) => {
        console.log(value);

        try {
          let result;

          if (defaultValue?.id) {
            console.log("Update lesson");
            result = await lessonActionEditContent({
              lessonId: defaultValue.id,
              content: value,
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
        name="content"
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
      <SubmitButton type="submit">Submit</SubmitButton>
    </Form>
  );
};
