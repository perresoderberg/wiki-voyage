import type { WikipediaArticle } from "../../../../types/wikipedia";

export function WikipediaContent({
  wikipediaUrl,
  article,
}: {
  wikipediaUrl: string;
  article: WikipediaArticle | null;
}) {
  return (
    <>
      <div className="font-bold">{article?.description}</div>
      <div className="my-2">{article?.extract}</div>
      <a
        className="block w-full rounded bg-gray-200 px-4 py-2 text-center hover:bg-gray-300"
        href={wikipediaUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        Read more on Wikipedia
      </a>
    </>
  );
}
