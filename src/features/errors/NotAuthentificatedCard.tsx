import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { LoginButton } from "../auth/LoginButton";

export const NotAuthentificatedCard = () => {
  return (
    <Card className="max-w-lg m-auto mt-4">
      <CardHeader>
        <CardTitle>You need to be logged in to view this page.</CardTitle>
      </CardHeader>
      <CardFooter>
        <LoginButton />
      </CardFooter>
    </Card>
  );
};
