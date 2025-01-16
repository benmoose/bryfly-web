#!/usr/bin/env node

import { v2 as cloudinary } from "cloudinary"
import process, { argv } from "node:process"
import pc from "picocolors"

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
  urlAnalytics: false,
})

try {
  await run(argv.slice(2))
  console.log(pc.green("✓ Done."))
} catch (err) {
  process.exitCode = 1
  printError(err)
  console.log()
  printUsage()
}

function printError(error) {
  console.log(pc.red(error))
  if (error.cause) {
    console.group("caused by")
    printError(error.cause)
    console.groupEnd()
  }
}

async function run() {
  const args = argv.slice(2)
  // Parse args
  if (args.length === 0) {
    throw new Error("Expected at least one argument but got none.")
  } else if (args.length > 2) {
    throw new Error("Received too many arguments.")
  }
  if (args.length === 2 && !["-dry-run", "-x"].includes(args[1])) {
    throw new Error(`Unknown option ${args[1]}.`)
  }

  const name = args[0].replace("t_", "").trim()
  const dryRun = args.length === 2

  // Check transformation does not already exist
  const detail = await cloudinary.api.transformation(name).catch(() => {})
  if (detail?.allowed_for_strict) {
    throw new Error(`'t_${name}' is already a strict transform.`)
  }

  // Create named transformation
  if (dryRun) {
    console.group(pc.bold(pc.yellow("(dry-run)")))
    console.log(`would make ${pc.green(`t_${name}/f_auto`)} a strict transform`)
    console.log(pc.dim(`↳ cloudinary.api.update_transformation("${name}")`))
    console.groupEnd()
  } else {
    await cloudinary.api
      .update_transformation(name, { allowed_for_strict: true })
      .catch(err => {
        throw new Error(`Failed to update transformation '${name}'.`, {
          cause: err,
        })
      })
  }
}

function printUsage() {
  console.group(pc.bold("Usage:"))
  console.log("cloudinary-allow-strict <name> [-dry-run | -x]")
  console.groupEnd()
}
