export type CommonsImage = {
  title: string;
  imageUrl: string;
  thumbnailUrl: string | null;
  width: number | null;
  height: number | null;
  pageUrl: string;
};
export type CommonsSearchResult = {
  images: CommonsImage[];
};
export type WikidataLink = {
  id: string;
  label: string;
  wikipediaUrl: string | null;
};
