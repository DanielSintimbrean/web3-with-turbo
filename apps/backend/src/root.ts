import { authRouter } from "./router/auth";
import { postRouter } from "./router/post";
import { profileRouter } from "./router/profile";
import { createTRPCRouter, publicProcedure } from "./trpc";

export const appRouter = createTRPCRouter({
  post: postRouter,
  auth: authRouter,
  profile: profileRouter,
  hello: publicProcedure.query(() => {
    return "Hello from TRPC!";
  }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
