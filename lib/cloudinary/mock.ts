import { readFileSync } from "node:fs"
import { resolve } from "node:path"

type JsonString = `${string}.json`

export function fixture(fixture: JsonString) {
  try {
    const filePath = resolve(`lib/cloudinary/fixtures/${fixture}`)
    const data = readFileSync(filePath, { encoding: "utf-8" })
    return JSON.parse(data)
  } catch (err) {
    console.error("error reading fixtures/%s: %s", fixture, err)
    throw new Error(`error reading fixtures/${fixture}`)
  }
}
