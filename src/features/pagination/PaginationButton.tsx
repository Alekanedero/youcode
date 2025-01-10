"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

export type CoursePaginationButtonProps = {
  page: number;
  baseUrl: string;
} & React.HTMLAttributes<HTMLButtonElement>;

export const CoursePaginationButton = ({
  page,
  baseUrl,
  ...props
}: CoursePaginationButtonProps) => {
  const router = useRouter();

  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => {
          const searchParams = new URLSearchParams({
            page: String(page - 1),
          });
          const url = `${baseUrl}?${searchParams.toString()}`;
          router.push(url);
        }}
        {...props}
      >
        Previous
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => {
          const searchParams = new URLSearchParams({
            page: String(page + 1),
          });
          const url = `${baseUrl}?${searchParams.toString()}`;
          router.push(url);
        }}
        {...props}
      >
        Next
      </Button>
    </div>
  );
};
