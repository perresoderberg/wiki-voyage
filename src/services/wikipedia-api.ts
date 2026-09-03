import type { WikipediaArticle } from "../types/wikipedia";

const WIKIPEDIA_API = "https://en.wikipedia.org/api/rest_v1";

type WikipediaSummaryResponse = {
  title: string;
  description?: string;
  extract?: string;
  wikibase_item?: string;
  thumbnail?: {
    source: string;
  };
  content_urls?: {
    desktop?: {
      page?: string;
    };
  };
};

export async function getWikipediaSummary(
  title: string,
): Promise<WikipediaArticle> {
  const pageTitle = title.replaceAll(" ", "_");
  const encodedTitle = encodeURIComponent(pageTitle);

  const response = await fetch(`${WIKIPEDIA_API}/page/summary/${encodedTitle}`);

  if (!response.ok) {
    throw new Error(`Wikipedia summary failed: ${response.status}`);
  }

  const data: WikipediaSummaryResponse = await response.json();

  return {
    title: data.title,
    description: data.description ?? null,
    extract: data.extract ?? "",
    wikipediaUrl: data.content_urls?.desktop?.page ?? "",
    wikidataId: data.wikibase_item ?? null,
    imageUrl: data.thumbnail?.source ?? null,
  };
}
