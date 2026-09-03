import type { MenuItem } from "../../../types/menu";
import { useEffect, useState } from "react";
import { getWikipediaSummary } from "../../../services/wikipedia-api";
import type { WikipediaArticle } from "../../../types/wikipedia";
import { searchCommons } from "../../../services/commons-api";
import { getWikidataPerson } from "../../../services/wikidata-api";
import type { WikidataPerson } from "../../../types/wikidata";
import type { CommonsSearchResult } from "../../../types/commons";
import { EntityImage } from "./header/EntityImage";
import { EntityInfo } from "./header/EntityInfo";

export function EntityPage({ item }: { item: MenuItem }) {
  console.log(item);

  const [wikipediaSummary, setWikipediaSummary] =
    useState<WikipediaArticle | null>(null);
  const [wikidataPerson, setWikidataPerson] = useState<WikidataPerson | null>(
    null,
  );

  const [commonsImages, setCommonsImages] =
    useState<CommonsSearchResult | null>(null);

  useEffect(() => {
    async function fetchWikipedia() {
      const wikiSummary = await getWikipediaSummary(item.title);
      if (!wikiSummary) return null;

      setWikipediaSummary(wikiSummary);

      const cmomonImages = await searchCommons(wikiSummary.title, 5);
      if (!cmomonImages) return null;

      setCommonsImages(cmomonImages);

      if (wikiSummary.wikidataId) {
        const wikiPerson = await getWikidataPerson(wikiSummary.wikidataId);
        setWikidataPerson(wikiPerson);
      }
    }
    fetchWikipedia();
  }, [item]);

  return (
    <>
      <h2 className="text-2xl font-extrabold text-center text-white bg-black">
        {wikipediaSummary?.title}
      </h2>
      {wikipediaSummary?.imageUrl && (
        <EntityImage imageUrl={wikipediaSummary.imageUrl} />
      )}
      {wikidataPerson && <EntityInfo person={wikidataPerson} />}
    </>
  );
}
