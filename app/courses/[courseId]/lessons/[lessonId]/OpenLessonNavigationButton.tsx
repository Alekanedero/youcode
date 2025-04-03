"use client";

import { Button } from "@/components/ui/button";
import { PanelLeftOpen } from "lucide-react";
import { useLessonNavigationStore } from "../lesson-navigation-store";

export const OpenLessonNavigationButton = () => {
  const setState = useLessonNavigationStore((s) => s.setState);

  return (
    <Button onClick={() => setState("open")} size="sm" variant="ghost">
      <PanelLeftOpen />
    </Button>
  );
};
