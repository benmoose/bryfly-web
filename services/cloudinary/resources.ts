import { type ResourceApiResponse, v2 as cloudinary } from "cloudinary";
import { cache } from "react";
import type { IImage, Indexable, IResource, PublicId } from "./types";

const HERO_FOLDER = process.env.CLOUDINARY_HERO_FOLDER as string;

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
  urlAnalytics: false,
});

type APIResource = ResourceApiResponse["resources"][number] & {
  asset_id?: string;
};

async function resourcesByFolder(folder: string): Promise<IResource[]> {
  // TODO: assume no pagination, for now...
  const response = await cloudinary.api.resources_by_asset_folder(folder, {
    context: true,
    direction: "desc",
    image_metadata: true,
    max_results: 250,
  });
  return response.resources.map(
    ({ format, context, version, ...res }: APIResource): IResource => ({
      key: res.asset_id ?? res.public_id,
      publicId: res.public_id as PublicId,
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
  readonly order: PublicId[];
  readonly repo: { [id: PublicId]: Indexable<T> };

  constructor(resources: T[]) {
    this.order = resources.map((img) => img.publicId);
    this.repo = resources.reduce(
      (repo, res, i) => ({
        ...repo,
        [res.publicId]: { ...res, index: i },
      }),
      {},
    );
  }

  resources(this: ResourceSet<T>): ReadonlyArray<Indexable<T>> {
    const arr = this.order.map((id) => this.repo[id]);
    return Object.freeze(arr);
  }

  byPublicId(this: ResourceSet<T>, id: PublicId): Readonly<T> | null {
    const res = this.repo[id];
    return Object.freeze(res);
  }

  byIndex(this: ResourceSet<T>, index: number): Readonly<T> | null {
    const id = this.order[index];
    return Object.freeze(this.repo[id]);
  }
}

async function _getHeroImageSet(): Promise<ResourceSet<IImage>> {
  console.log("called _getHeroImageSet");
  const images = (await resourcesByFolder(HERO_FOLDER)).filter(isImageResource);
  const placeholderUrls = await Promise.all(
    images.map(async (img) => await base64Placeholder(img.publicId)),
  );
  return new ResourceSet<IImage>(
    images.map((image, i) => ({
      ...image,
      aspectRatio: aspectRatio(image),
      placeholderUrl: placeholderUrls[i],
    })),
  );
}

export const getHeroImageSet = cache(_getHeroImageSet);

export const prefetchHeroImageSet = (): void => {
  void getHeroImageSet();
};

async function getHeroImages(): Promise<Array<Indexable<IImage>>> {
  const images = (await resourcesByFolder(HERO_FOLDER)).filter(isImageResource);
  const blurDataUrls = await Promise.all(
    images.map(async (image) => await base64Placeholder(image.publicId)),
  );

  return images.map(({ format, context, width, height, ...image }, i) => {
    const cimg = {
      key: image.assetId ?? image.publicId,
      index: i,
      publicId: image.publicId,
      secureUrl: image.secureUrl,
      resourceType: "image" as const,
      placeholderUrl: blurDataUrls[i],
      createdAt: image.createdAt,
      aspectRatio: aspectRatio({ width, height }),
      width,
      height,
      format,
      context,
    };
    return cimg as Indexable<IImage>;
  });
}

export const getImages = cache(getHeroImages);

export const prefetchHeroImages: () => void = () => {
  void getImages();
};

async function _getImage(publicId: PublicId): Promise<IImage> {
  const image: APIResource = await cloudinary.api.resource(publicId, {
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

const base64Placeholder = cache(async (publicId: PublicId): Promise<string> => {
  const url = cloudinary.url(publicId, {
    transformation: ["placeholder_blur"],
    type: "private",
  });
  const res = await fetch(url);
  const buf = await res.arrayBuffer();
  const data = Buffer.from(buf).toString("base64");
  return `data:image/webp;base64,${data}`;
});

function isImageResource(rr: IResource): rr is IImage {
  return rr.resourceType === "image";
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
