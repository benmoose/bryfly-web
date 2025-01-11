#!/usr/bin/env node

import { v2 as cloudinary } from "cloudinary"
import { argv } from "node:process"
import pc from "picocolors"

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
  urlAnalytics: false,
})

const useage = `bad usage: name [-dry-run]`

// args
const args = argv.slice(2)
if (args.length === 0) {
  throw new Error("missing positional arg transformation name")
} else if (args.length > 2) {
  throw new Error(useage)
}
if (args.length === 2 && args[1] !== "-dry-run") {
  throw new Error(useage)
}

const opt = {
  dryRun: args.length === 2 && args[1] === "-dry-run",
  targetName: args[0].replace("t_", "").trim(),
}

// Check transformation does not already exist
try {
  await cloudinary.api.transformation(opt.targetName)
} catch {
  throw new Error(`Transformation called ${opt.targetName} already exists.`)
}

// Create named transformation
if (opt.dryRun) {
  console.group(pc.bold(pc.yellow("(dry-run)")))
  console.log(
    pc.bold(
      `create strict transformation: ${pc.green(`t_${opt.targetName}/f_auto`)}`,
    ),
  )
  console.log(
    "↳ ",
    pc.blue(
      `cloudinary.api.update_transformation(${pc.green(`"${opt.targetName}"`)})`,
    ),
  )
  console.groupEnd()
} else {
  cloudinary.api
    .update_transformation(opt.targetName, {
      allowed_for_strict: true,
    })
    .then(() => {
      console.log(pc.green("✓ Transformation successfully created"))
    })
}
