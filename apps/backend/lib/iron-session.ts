import type { IronSessionOptions } from "iron-session";

import { env } from "../env.mjs";

export const sessionOptions: IronSessionOptions = {
  cookieName: "turbo-web3-session-cookie",
  password: env.SECRET_COOKIE_PASSWORD,
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },

  ttl: 60 * 10,
};
