import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";

type GetServerSessionContext =
  | {
      req: GetServerSidePropsContext["req"];
      res: GetServerSidePropsContext["res"];
    }
  | { req: NextApiRequest; res: NextApiResponse };
export const getServerSession = (ctx: GetServerSessionContext) => {
  ctx.req.cookies;
  return null;
};
