import { useEffect, useState } from "react";

import { getWikipediaSummary } from "../services/wikipedia-api";
import { getWikidataPerson } from "../services/wikidata-api";
import { searchCommons } from "../services/commons-api";

import type { WikipediaArticle } from "../types/wikipedia";
import type { WikidataPerson } from "../types/wikidata";
import type { CommonsSearchResult } from "../types/commons";
import type { MenuItem } from "../types/menu";

type ApiTestProps = {
  item: MenuItem;
};

export default function ApiTest({ item }: ApiTestProps) {
  const [wikipedia, setWikipedia] = useState<WikipediaArticle | null>(null);

  const [wikidata, setWikidata] = useState<WikidataPerson | null>(null);

  const [commons, setCommons] = useState<CommonsSearchResult | null>(null);

  useEffect(() => {
    async function testApis() {
      const wikipediaData = await getWikipediaSummary(item.title);

      console.log("wikipediaData:", wikipediaData);

      if (wikipediaData.wikidataId) {
        const wikidataData = await getWikidataPerson(wikipediaData.wikidataId);

        console.log("wikidataData:", wikidataData);

        setWikidata(wikidataData);
      }

      const commonsData = await searchCommons(wikipediaData.title, 5);

      console.log("commonsData:", commonsData);

      setWikipedia(wikipediaData);
      setCommons(commonsData);
    }

    testApis();
  }, [item]);

  return (
    <div>
      <h1>API Test</h1>

      <h2>Wikipedia</h2>
      <pre>{JSON.stringify(wikipedia, null, 2)}</pre>

      <h2>Wikidata</h2>
      <pre>{JSON.stringify(wikidata, null, 2)}</pre>

      <h2>Wikimedia Commons</h2>
      <pre>{JSON.stringify(commons, null, 2)}</pre>
    </div>
  );
}
