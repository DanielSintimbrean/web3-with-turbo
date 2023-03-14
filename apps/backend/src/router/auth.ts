import { TRPCError } from "@trpc/server";
import { SiweMessage, generateNonce } from "siwe";
import { z } from "zod";

import { siweMessageSchema } from "../../validators";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const authRouter = createTRPCRouter({
  getSession: publicProcedure.query(async ({ ctx }) => {
    if (ctx.session.user?.address) {
      const user = await ctx.prisma.user.findFirst({
        where: { address: ctx.session.user.address },
      });

      if (user) {
        ctx.session.user.name = user?.name;
        await ctx.session.save();
      }
    }

    return ctx.session;
  }),
  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
  /**
   * Nonce
   */
  nonce: publicProcedure.query(async ({ ctx }) => {
    // Get current date to setup session expiration
    const currentDate = new Date();

    // Setup Session
    ctx.session.nonce = generateNonce();
    ctx.session.issuedAt = currentDate.toISOString();
    ctx.session.expirationTime = new Date(
      currentDate.getTime() + 10 * 60 * 1000, // 10 minutes from the current time
    ).toISOString();

    // Save Session
    await ctx.session.save();

    // Return
    return {
      nonce: ctx.session.nonce,
      issuedAt: ctx.session.issuedAt,
      expirationTime: ctx.session.expirationTime,
    };
  }),
  /**
   * Verify
   */
  verify: publicProcedure
    .input(
      //z.object({ message: z.object<SiweMessage>({}), signature: z.string() })
      z.object({
        message: siweMessageSchema,
        signature: z.string(),
      }),
    )
    .output(z.object({ ok: z.boolean() }))
    .mutation(async ({ input, ctx }) => {
      try {
        const siweMessage = new SiweMessage(input.message as SiweMessage);

        // Verify signature if not valid throw an error
        const fields = await siweMessage.verify({
          signature: input.signature,
          nonce: ctx.session.nonce,
        });

        let user = await ctx.prisma.user.findUnique({
          where: { address: fields.data.address },
        });

        if (!user) {
          user = await ctx.prisma.user.create({
            data: {
              address: fields.data.address,
              name: fields.data.address,
            },
          });
        }

        ctx.session.siwe = fields.data;
        ctx.session.user = {
          address: siweMessage.address,
          name: user.name ?? "",
        };

        await ctx.session.save();

        return { ok: true };
      } catch {
        throw new TRPCError({
          message: "Invalid signature",
          code: "BAD_REQUEST",
        });
      }
    }),
  /**
   * Logout
   */
  logout: publicProcedure.mutation(({ ctx }) => {
    ctx.session.destroy();
    return { ok: true };
  }),
});
