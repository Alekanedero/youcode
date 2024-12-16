"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Session } from "next-auth";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";
import { Loader } from "@/components/ui/Loader";

export type LoggedInButtonProps = {
  user: Session["user"];
};

export const LoggedInButton = (props: LoggedInButtonProps) => {
  const mutation = useMutation({
    mutationFn: async () => {
      signOut();
    },
  });

  return (
    <>
      <DropdownMenu>
        <AlertDialog>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <Avatar className="w-6 h-6 mr-1">
                <AvatarFallback>{props.user?.name?.[0] ?? "?"}</AvatarFallback>
                {props.user.image && (
                  <AvatarImage
                    src={props.user.image}
                    alt={props.user.name ?? "user picture"}
                  />
                )}
              </Avatar>
              {props.user.name}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <AlertDialogTrigger>
              <DropdownMenuItem>
                <LogOut size={12} className="mr-2" />
                Logout
              </DropdownMenuItem>
            </AlertDialogTrigger>
          </DropdownMenuContent>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to logout?
              </AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel asChild>
                <Button variant="secondary">Cancel</Button>
              </AlertDialogCancel>
              <Button
                variant="destructive"
                onClick={() => {
                  mutation.mutate();
                }}
                disabled={mutation.isPending}
              >
                {mutation.isPending ? (
                  <Loader size={12} className="mr-2" />
                ) : (
                  <LogOut size={12} className="mr-2" />
                )}
                Logout
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DropdownMenu>
    </>
  );
};
