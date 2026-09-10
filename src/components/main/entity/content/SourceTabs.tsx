import { useState } from "react";
import type { CommonsSearchResult } from "../../../../types/commons";
import type { WikidataEntity } from "../../../../types/wikidata";
import type { WikipediaArticle } from "../../../../types/wikipedia";

import { ImageGallery } from "./ImageGallery";
import { WikidataContent } from "./WikidataContent";
import { WikipediaContent } from "./WikipediaContent";

type SourceTabsProps = {
  wikipedia: WikipediaArticle;
  wikidata: WikidataEntity;
  commons: CommonsSearchResult | null;
};

export function SourceTabs({ wikipedia, wikidata, commons }: SourceTabsProps) {
  const [activeTab, setActiveTab] = useState<
    "wikipedia" | "wikidata" | "images"
  >("wikipedia");

  console.log("wikipedia:", wikipedia);
  console.log("wikidata:", wikidata);

  const selectedStyle = "font-bold border bg-black text-gray-400 rounded";
  return (
    <section>
      <div className="flex gap-2 border-b">
        <button
          type="button"
          onClick={() => setActiveTab("wikipedia")}
          className={activeTab === "wikipedia" ? selectedStyle : ""}
        >
          WIKIPEDIA
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("wikidata")}
          className={activeTab === "wikidata" ? selectedStyle : ""}
        >
          WIKIDATA
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("images")}
          className={activeTab === "images" ? selectedStyle : ""}
        >
          IMAGES
        </button>
      </div>

      <div className="py-4">
        {activeTab === "wikipedia" &&
          (wikipedia ? (
            <WikipediaContent
              wikipediaUrl={wikipedia.wikipediaUrl}
              article={wikipedia}
            />
          ) : (
            <div>Loading Wikipedia</div>
          ))}

        {activeTab === "wikidata" &&
          (wikidata ? (
            <WikidataContent entity={wikidata} />
          ) : (
            <div>Loading Wikidata...</div>
          ))}

        {activeTab === "images" && <ImageGallery images={commons} />}
      </div>
    </section>
  );
}
