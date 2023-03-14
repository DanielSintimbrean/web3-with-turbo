import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const profileRouter = createTRPCRouter({
  changeName: protectedProcedure
    .input(z.object({ newName: z.string().min(3) }))
    .mutation(async ({ ctx, input: { newName } }) => {
      await ctx.prisma.user.update({
        where: { address: ctx.user.address },
        data: { name: newName },
      });
    }),
});
