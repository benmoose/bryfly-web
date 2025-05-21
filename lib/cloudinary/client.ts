import { type ResourceApiResponse, v2 as cloudinary } from "cloudinary"
import { isDev } from "lib/utils"
import { fixture } from "lib/cloudinary/fixtures"

interface CloudinaryClient {
  api: {
    root_folders: typeof cloudinary.api.root_folders
    resource: typeof cloudinary.api.resource
    resources_by_asset_folder: typeof cloudinary.api.resources_by_asset_folder
  }
  url: typeof cloudinary.url
}

let client: CloudinaryClient

export default function getClient(): CloudinaryClient {
  if (client) {
    return client
  }

  cloudinary.config({
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    secure: true,
    urlAnalytics: false,
  })
  client = isDev() ? new MockCloudinaryClient() : cloudinary

  return client
}

class MockCloudinaryClient implements CloudinaryClient {
  url = cloudinary.url

  api = {
    root_folders: () => fixture("root-folders.json"),

    resources_by_asset_folder: (
      group: string,
    ): Promise<ResourceApiResponse> => {
      const contents = fixture(`get-resources-${group}.json`)
      return new Promise(resolve => resolve(contents))
    },

    resource: (key: string) => {
      const resources = ["earworm", "hero", "flange"]
        .map(group => fixture(`get-resources-${group}.json`))
        .map(res => res.resources)
        .flat()
      return resources.find(resource => resource["public_id"] === key)
    },
  }
}
