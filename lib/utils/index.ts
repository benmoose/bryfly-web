export function isDev() {
  const dev = process.env.NODE_ENV === "development"
  console.log(`isDev()=${dev}`)
  return dev
}
