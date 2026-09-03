import type { CommonsImage, CommonsSearchResult } from "../types/commons";

const COMMONS_API = "https://commons.wikimedia.org/w/api.php";

const FILE_NAMESPACE = "6";

type CommonsApiResponse = {
  query?: {
    pages?: Record<
      string,
      {
        title: string;
        imageinfo?: {
          thumburl?: string;
          url?: string;
          thumbwidth?: number;
          thumbheight?: number;
        }[];
      }
    >;
  };
};

export async function searchCommons(
  query: string,
  limit = 10,
): Promise<CommonsSearchResult> {
  const params = new URLSearchParams({
    action: "query",
    generator: "search",
    gsrsearch: query,
    gsrnamespace: FILE_NAMESPACE,
    gsrlimit: limit.toString(),
    prop: "imageinfo",
    iiprop: "url",
    iiurlwidth: "500",
    format: "json",
    origin: "*",
  });

  const response = await fetch(`${COMMONS_API}?${params.toString()}`);

  if (!response.ok) {
    throw new Error(`Commons search failed: ${response.status}`);
  }

  const data: CommonsApiResponse = await response.json();

  const pages = Object.values(data.query?.pages ?? {});

  const images: CommonsImage[] = pages
    .map((page) => {
      const imageInfo = page.imageinfo?.[0];

      if (!imageInfo?.url) {
        return null;
      }

      return {
        title: page.title,
        imageUrl: imageInfo.url,
        thumbnailUrl: imageInfo.thumburl ?? null,
        width: imageInfo.thumbwidth ?? null,
        height: imageInfo.thumbheight ?? null,
        pageUrl: `https://commons.wikimedia.org/wiki/${encodeURIComponent(page.title.replace(" ", "_"))}`,
      };
    })
    .filter((image): image is CommonsImage => image !== null);

  return {
    images,
  };
}
