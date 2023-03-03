/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds and Linting.
 */
!process.env.SKIP_ENV_VALIDATION &&
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  (await import("@turbo-web3/backend/env"));

/** @type {import("next").NextConfig} */
const config = {
  /** Enables hot reloading for local packages without a build step */
  transpilePackages: [
    "@turbo-web3/backend",
    "@turbo-web3/auth",
    "@turbo-web3/db",
  ],
  /** We already do linting and typechecking as separate tasks in CI */
  eslint: { ignoreDuringBuilds: !!process.env.CI },
  typescript: { ignoreBuildErrors: !!process.env.CI },
};

export default config;
