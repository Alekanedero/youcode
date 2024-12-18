import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LogoutButton } from "@/features/auth/LogoutButton";
import { getAuthSession } from "@/lib/auth";
import { AvatarFallback } from "@radix-ui/react-avatar";
import Link from "next/link";

export default async function AccountPage() {
  const session = await getAuthSession();

  if (!session) {
    throw new Error("No session found");
  }

  return (
    <Card className="max-w-lg m-auto mt-4">
      <CardHeader className="flex flex-row items-center gap-4 space-y-0">
        <Avatar>
          <AvatarFallback>{session.user.email?.[0]}</AvatarFallback>
          {session.user.image && (
            <AvatarImage src={session.user.image} alt="user image" />
          )}
        </Avatar>
        <div className="flex flex-col gap-1">
          <CardTitle>{session.user.email}</CardTitle>
          <CardDescription>{session.user.name}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <Link
          href="/account/settings"
          className={buttonVariants({ variant: "outline", size: "lg" })}
        >
          Settings
        </Link>
        <Link
          href="/admin"
          className={buttonVariants({ variant: "outline", size: "lg" })}
        >
          Admin
        </Link>
      </CardContent>
      <CardFooter className="flex flex-row-reverse">
        <LogoutButton />
      </CardFooter>
    </Card>
  );
}
