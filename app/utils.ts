// siteUrl returns the base URL for the deployment.
export function siteUrl(): URL {
  // Info on these env vars can be found at
  // https://vercel.com/docs/environment-variables/system-environment-variables
  if (!process.env.VERCEL) {
    return new URL(`${process.env.NEXT_PUBLIC_SITE_URL}`)
  }
  const url =
    process.env.VERCEL_ENV === "production"
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : `https://${process.env.VERCEL_URL}`
  return new URL(url)
}
