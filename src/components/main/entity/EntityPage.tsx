import { useEffect, useState } from "react";
import type { CommonsSearchResult } from "../../../types/commons";
import type { MenuItem } from "../../../types/menu";
import type { WikidataEntity } from "../../../types/wikidata";
import type { WikipediaArticle } from "../../../types/wikipedia";
import { SourceTabs } from "./content/SourceTabs";
import { EntityImage } from "./header/EntityImage";
import { EntityInfo } from "./header/EntityInfo";
import { searchCommons } from "../../../services/commons-api";
import { getWikipediaSummary } from "../../../services/wikipedia-api";
import { getWikidataEntity } from "../../../services/wikidata-api";

export function EntityPage({ item }: { item: MenuItem }) {
  const [wikipediaSummary, setWikipediaSummary] = useState<WikipediaArticle>();
  const [wikidataEntry, setWikidataEntry] = useState<WikidataEntity>();
  const [commonsImages, setCommonsImages] =
    useState<CommonsSearchResult | null>(null);

  const IMAGES_LIMIT = 30;

  useEffect(() => {
    async function fetchData() {
      setWikipediaSummary(undefined);
      setWikidataEntry(undefined);
      setCommonsImages(null);

      const wikiSummary = await getWikipediaSummary(item.title);

      setWikipediaSummary(wikiSummary);

      const commonsData = await searchCommons(wikiSummary.title, IMAGES_LIMIT);

      setCommonsImages(commonsData);

      if (item.wikidataId && item.entityType) {
        const wikidataData = await getWikidataEntity(
          item.wikidataId,
          item.entityType,
          item.conceptType,
        );

        setWikidataEntry(wikidataData);
      }
    }

    fetchData();
  }, [item]);

  return (
    <>
      {!wikipediaSummary || !wikidataEntry ? (
        <div className="p-4">Loading...</div>
      ) : (
        <>
          <h2 className="bg-black text-center text-2xl font-extrabold text-white">
            {wikipediaSummary.title}
          </h2>

          <section className="flex items-start gap-4">
            {wikipediaSummary.imageUrl && (
              <EntityImage imageUrl={wikipediaSummary.imageUrl} />
            )}

            <EntityInfo entity={wikidataEntry} />
          </section>

          <SourceTabs
            wikipedia={wikipediaSummary}
            wikidata={wikidataEntry}
            commons={commonsImages}
          />
        </>
      )}
    </>
  );
}
