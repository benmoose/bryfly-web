import { v2 as cloudinary } from 'cloudinary'
import { cache } from 'react'
import type { IAPIResource, IImage, Indexable, IResource } from './types'

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
  urlAnalytics: false,
});

const base64Placeholder = cache(async (publicId: string): Promise<string> => {
  const url = cloudinary.url(publicId, {
    transformation: ["placeholder_blur"],
    type: "private",
  });
  const res = await fetch(url);
  const buf = await res.arrayBuffer();
  const data = Buffer.from(buf).toString("base64");
  return `data:image/webp;base64,${data}`;
});

function isImageResource(resource: IResource): resource is IImage {
  return resource.resourceType === "image";
}

function aspectRatio({
  width,
  height,
}: {
  width: number;
  height: number;
}): [number, number] {
  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
  const factor = gcd(width, height);
  return [width / factor, height / factor];
}

async function resourcesByFolder(folder: string): Promise<IResource[]> {
  // TODO: assume no pagination, for now...
  const response = await cloudinary.api.resources_by_asset_folder(folder, {
    context: true,
    direction: "desc",
    image_metadata: true,
    max_results: 250,
  });
  return response.resources.map(
    ({ format, context, version, ...res }: IAPIResource): IResource => ({
      key: res.asset_id ?? res.public_id,
      publicId: res.public_id,
      assetId: res.asset_id as string,
      resourceType: res.resource_type,
      secureUrl: res.secure_url,
      createdAt: res.created_at,
      context,
      format,
      version,
      ...res,
    }),
  );
}

class ResourceSet<T extends IResource> {
  readonly order: string[];
  readonly repo: { [pid: string]: Indexable<T> };

  constructor(resources: T[]) {
    this.order = resources.map((img) => img.publicId);
    this.repo = resources.reduce(
      (repo, res) => ({
        ...repo,
        [res.publicId]: res,
      }),
      {},
    );
  }

  all(this: ResourceSet<T>): ReadonlyArray<Indexable<T>> {
    return this.order.map((id) => this.repo[id]);
  }

  get(this: ResourceSet<T>, key: string | number): Readonly<Indexable<T>> {
    return typeof(key) === 'string' ? this.repo[key] : this.repo[this.order[key]];
  }
}

export type IImageSet = Array<Indexable<IImage>>
// export type IImageSet = ResourceSet<IImage>

async function _getHeroImageSet(): Promise<IImageSet> {
  console.count("_getHeroImageSet()")
  const images = (await resourcesByFolder(`${process.env.CLOUDINARY_HERO_FOLDER}`))
    .filter(isImageResource);
  const placeholderUrls = await Promise.all(
    images.map(async (img) => await base64Placeholder(img.publicId)),
  );
  return images.map((image, i) => ({
    ...image,
    index: i,
    aspectRatio: aspectRatio(image),
    placeholderUrl: placeholderUrls[i],
  }))
  // return new ResourceSet<IImage>(
  //   images.map((image, i) => ({
  //     ...image,
  //     aspectRatio: aspectRatio(image),
  //     placeholderUrl: placeholderUrls[i],
  //   })),
  // );
}

export const getHeroImageSet = cache(_getHeroImageSet)

export const prefetchHeroImageSet = (): void => {
  void getHeroImageSet();
};

async function _getImage(publicId: string): Promise<IImage> {
  const image: IAPIResource = await cloudinary.api.resource(publicId, {
    context: true,
    resource_type: "image",
  });
  const placeholderUrl = await base64Placeholder(publicId);
  const cimg = {
    publicId,
    placeholderUrl,
    key: image.asset_id ?? image.public_id,
    secureUrl: image.secure_url,
    resourceType: "image" as const,
    createdAt: image.created_at,
    width: image.width,
    height: image.height,
    aspectRatio: aspectRatio(image),
    format: image.format,
    context: image.context,
  };
  return cimg as IImage;
}

export const getImage = cache(_getImage);
