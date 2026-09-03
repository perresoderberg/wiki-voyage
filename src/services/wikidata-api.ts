import type { WikidataPerson } from "../types/wikidata";

const WIKIDATA_API = "https://query.wikidata.org/sparql";

type SparqlValue = {
  type: string;
  value: string;
};

type SparqlBinding = {
  birthDate?: SparqlValue;
  deathDate?: SparqlValue;
  birthPlaceLabel?: SparqlValue;
  deathPlaceLabel?: SparqlValue;
  occupationLabel?: SparqlValue;
};

type SparqlResponse = {
  results: {
    bindings: SparqlBinding[];
  };
};

export async function getWikidataPerson(
  wikidataId: string,
): Promise<WikidataPerson> {
  if (!/^Q\d+$/.test(wikidataId)) {
    throw new Error(`Invalid Wikidata ID: ${wikidataId}`);
  }

  const query = `
    SELECT DISTINCT
      ?birthDate
      ?deathDate
      ?birthPlaceLabel
      ?deathPlaceLabel
      ?occupationLabel
    WHERE {
      OPTIONAL {
        wd:${wikidataId} wdt:P569 ?birthDate.
      }

      OPTIONAL {
        wd:${wikidataId} wdt:P570 ?deathDate.
      }

      OPTIONAL {
        wd:${wikidataId} wdt:P19 ?birthPlace.
      }

      OPTIONAL {
        wd:${wikidataId} wdt:P20 ?deathPlace.
      }

      OPTIONAL {
        wd:${wikidataId} wdt:P106 ?occupation.
      }

      SERVICE wikibase:label {
        bd:serviceParam wikibase:language "en".
      }
    }
  `;

  const params = new URLSearchParams({
    query,
    format: "json",
  });

  const response = await fetch(`${WIKIDATA_API}?${params.toString()}`);

  if (!response.ok) {
    throw new Error(`Wikidata query failed: ${response.status}`);
  }

  const data: SparqlResponse = await response.json();

  const bindings = data.results.bindings;

  const first = bindings[0];

  const occupations = [
    ...new Set(
      bindings
        .map((binding) => binding.occupationLabel?.value)
        .filter((occupation): occupation is string => Boolean(occupation)),
    ),
  ];

  return {
    wikidataId,

    birthDate: first?.birthDate?.value
      ? first.birthDate.value.substring(0, 10)
      : null,

    deathDate: first?.deathDate?.value
      ? first.deathDate.value.substring(0, 10)
      : null,

    birthPlace: first?.birthPlaceLabel?.value ?? null,

    deathPlace: first?.deathPlaceLabel?.value ?? null,

    occupations,
  };
}
