import { getAuthSession } from "./auth";
import { createSafeActionClient } from "next-safe-action";

export class ServerError extends Error {}

export const action = createSafeActionClient({
  handleServerError: (error) => {
    if (error instanceof ServerError) {
      return {
        serverError: error.message,
      };
    }
    return {
      serverError: "An unexpected error occurred.",
    };
  },
});

export const authenticatedAction = action.use(async ({ next }) => {
  const session = await getAuthSession();
  const user = session?.user;

  if (!user) {
    throw new ServerError("You must be logged in to perform this action.");
  }

  return next({
    ctx: {
      userId: user?.id,
      user,
    },
  });
});
//
