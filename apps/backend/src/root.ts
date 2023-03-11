import { authRouter } from "./router/auth";
import { postRouter } from "./router/post";
import { createTRPCRouter, publicProcedure } from "./trpc";

export const appRouter = createTRPCRouter({
  post: postRouter,
  auth: authRouter,
  hello: publicProcedure.query(() => {
    return "Hello from TRPC!";
  }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
