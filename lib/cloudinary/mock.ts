import { readFileSync } from "fs"
import path from "path"

type JsonString = `${string}.json`

const FIXTURES_DIR = path.resolve("lib/cloudinary/fixtures")

export function fixture(fixture: JsonString) {
  try {
    const fixturePath = path.join(FIXTURES_DIR, fixture)
    const data = readFileSync(fixturePath, { encoding: "utf-8" })
    return JSON.parse(data)
  } catch (err) {
    throw new Error(`error reading fixture ${fixture}: ${err}`)
  }
}
