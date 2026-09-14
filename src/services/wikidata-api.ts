import type {
  ConceptType,
  EntityType,
  WikidataEntity,
  WikidataEntityBase,
  WikidataLink,
  WikidataStatement,
} from "../types/wikidata";

const WIKIDATA_API = "https://query.wikidata.org/sparql";

type SparqlValue = {
  type: string;
  value: string;
};

type SparqlBinding = Record<string, SparqlValue | undefined>;

type SparqlResponse = {
  results: {
    bindings: SparqlBinding[];
  };
};

type Property = {
  id: string;
  name: string;
};

const commonProperties: Property[] = [
  { id: "P31", name: "instanceOf" },
  { id: "P279", name: "subclassOf" },
];

const typeProperties: Record<EntityType, Property[]> = {
  person: [
    { id: "P569", name: "birthDate" },
    { id: "P570", name: "deathDate" },
    { id: "P19", name: "birthPlace" },
    { id: "P20", name: "deathPlace" },
    { id: "P106", name: "occupations" },
    { id: "P27", name: "nationality" },
    { id: "P166", name: "awards" },
    { id: "P108", name: "employer" },
    { id: "P69", name: "education" },
    { id: "P463", name: "memberOf" },
    { id: "P737", name: "influencedBy" },
    { id: "P551", name: "residence" },
    { id: "P22", name: "father" },
    { id: "P25", name: "mother" },
    { id: "P26", name: "spouse" },
    { id: "P40", name: "children" },
    { id: "P3373", name: "siblings" },
  ],

  place: [
    { id: "P17", name: "country" },
    { id: "P30", name: "continent" },
    { id: "P131", name: "locatedIn" },
    { id: "P625", name: "coordinates" },
    { id: "P1082", name: "population" },
    { id: "P2046", name: "area" },
    { id: "P571", name: "inceptionDate" },
    { id: "P37", name: "officialLanguage" },
    { id: "P38", name: "currency" },
    { id: "P150", name: "contains" },
    { id: "P47", name: "sharesBorderWith" },
    { id: "P206", name: "neighboringBodyOfWater" },
  ],

  organization: [
    { id: "P571", name: "inceptionDate" },
    { id: "P576", name: "dissolutionDate" },
    { id: "P159", name: "headquarters" },
    { id: "P17", name: "country" },
    { id: "P856", name: "officialWebsite" },
    { id: "P112", name: "founder" },
    { id: "P1128", name: "employees" },
    { id: "P488", name: "leader" },
    { id: "P463", name: "memberOf" },
    { id: "P749", name: "parentOrganization" },
    { id: "P355", name: "subsidiaries" },
    { id: "P101", name: "fieldOfWork" },
  ],

  event: [
    { id: "P580", name: "startDate" },
    { id: "P582", name: "endDate" },
    { id: "P276", name: "location" },
    { id: "P710", name: "participant" },
    { id: "P664", name: "organizer" },
    { id: "P17", name: "country" },
    { id: "P793", name: "significantEvent" },
  ],

  concept: [
    // Dates / notation
    { id: "P571", name: "inceptionDate" },
    { id: "P2534", name: "formula" },

    // Classification
    { id: "P1269", name: "facetOf" },

    // Subject / discipline
    { id: "P101", name: "fieldOfWork" },
    { id: "P2578", name: "studiedBy" },
    { id: "P921", name: "mainSubject" },

    // Structure
    { id: "P361", name: "partOf" },
    { id: "P527", name: "hasPart" },
    { id: "P144", name: "basedOn" },

    // Causality
    { id: "P828", name: "cause" },
    { id: "P1542", name: "effect" },

    // Comparison
    { id: "P461", name: "oppositeOf" },
    { id: "P1889", name: "differentFrom" },
    { id: "P460", name: "saidToBeTheSameAs" },

    // Sequence / historical development
    { id: "P155", name: "follows" },
    { id: "P156", name: "followedBy" },
    { id: "P1365", name: "replaces" },
    { id: "P1366", name: "replacedBy" },

    // People / sources
    { id: "P61", name: "discovererOrInventor" },
    { id: "P1343", name: "describedBySource" },

    // Other relationships
    { id: "P1552", name: "hasQuality" },

    // Wikimedia
    { id: "P910", name: "topicMainCategory" },
    { id: "P373", name: "CommonsCategory" },
  ],

  work: [
    { id: "P170", name: "creator" },
    { id: "P577", name: "publicationDate" },
    { id: "P136", name: "genre" },
    { id: "P123", name: "publisher" },
    { id: "P407", name: "language" },
    { id: "P495", name: "country" },
    { id: "P179", name: "series" },
    { id: "P144", name: "basedOn" },
    { id: "P361", name: "partOf" },
  ],

  species: [
    { id: "P225", name: "scientificName" },
    { id: "P1843", name: "commonNames" },
    { id: "P105", name: "taxonRank" },
    { id: "P171", name: "parentTaxon" },
    { id: "P141", name: "conservationStatus" },
    { id: "P183", name: "endemicTo" },
    { id: "P405", name: "taxonAuthor" },
  ],
};

function validateWikidataId(wikidataId: string) {
  if (!/^Q\d+$/.test(wikidataId)) {
    throw new Error(`Invalid Wikidata ID: ${wikidataId}`);
  }
}

async function queryWikidata(query: string): Promise<SparqlBinding[]> {
  const params = new URLSearchParams({
    query,
    format: "json",
  });

  const response = await fetch(`${WIKIDATA_API}?${params.toString()}`);

  if (!response.ok) {
    throw new Error(`Wikidata query failed: ${response.status}`);
  }

  const data: SparqlResponse = await response.json();

  return data.results.bindings;
}

function getValue(binding: SparqlBinding, name: string): string | null {
  return binding[name]?.value ?? null;
}

function getDate(bindings: SparqlBinding[], propertyId: string): string | null {
  const value = bindings
    .filter((binding) => getValue(binding, "propertyName") === propertyId)
    .map((binding) => getValue(binding, "value"))
    .find((value): value is string => value !== null);

  return value?.substring(0, 10) ?? null;
}

function getNumber(
  bindings: SparqlBinding[],
  propertyId: string,
): number | null {
  const value = bindings
    .filter((binding) => getValue(binding, "propertyName") === propertyId)
    .map((binding) => getValue(binding, "value"))
    .find((value): value is string => value !== null);

  if (value === undefined) {
    return null;
  }

  const number = Number(value);

  return Number.isNaN(number) ? null : number;
}

function getCoordinate(
  bindings: SparqlBinding[],
): { latitude: number; longitude: number } | null {
  const latitude = getNumber(bindings, "latitude");
  const longitude = getNumber(bindings, "longitude");

  return latitude !== null && longitude !== null
    ? { latitude, longitude }
    : null;
}

async function fetchEntityData(
  wikidataId: string,
  entityType: EntityType,
): Promise<SparqlBinding[]> {
  const properties = [...commonProperties, ...typeProperties[entityType]];

  const propertyIds = properties
    .map((property) => `wdt:${property.id}`)
    .join(" ");

  const query = `
    SELECT
      ?itemLabel
      ?itemDescription
      ?image
      ?propertyName
      ?value
      ?valueLabel
      ?article
      ?latitude
      ?longitude
  
    WHERE {
      VALUES ?property {
        ${propertyIds}
      }
  
      wd:${wikidataId} ?property ?value.
  
      OPTIONAL {
        ?value rdfs:label ?valueLabel.
        FILTER(LANG(?valueLabel) = "en")
      }
  
      OPTIONAL {
        FILTER(isIRI(?value))
  
        ?article schema:about ?value.
        ?article schema:isPartOf <https://en.wikipedia.org/>.
      }
  
      OPTIONAL {
        ?value wikibase:geoLatitude ?latitude.
        ?value wikibase:geoLongitude ?longitude.
      }
  
      BIND(
        REPLACE(STR(?property), ".*/", "")
        AS ?propertyName
      )
  
      OPTIONAL {
        wd:${wikidataId} rdfs:label ?itemLabel.
        FILTER(LANG(?itemLabel) = "en")
      }
  
      OPTIONAL {
        wd:${wikidataId} schema:description ?itemDescription.
        FILTER(LANG(?itemDescription) = "en")
      }
  
      OPTIONAL {
        wd:${wikidataId} wdt:P18 ?image.
      }
    }
  `;

  return queryWikidata(query);
}

export async function getWikidataStatements(
  wikidataId: string,
): Promise<WikidataStatement[]> {
  validateWikidataId(wikidataId);

  const query = `
    SELECT DISTINCT
      ?propertyId
      ?propertyLabel
      ?value
      ?valueLabel
      ?article
      ?valueType

    WHERE {
      wd:${wikidataId} ?predicate ?value.

      FILTER(?predicate != wdt:P2959)

      FILTER(
        !STRSTARTS(
          STR(?value),
          "http://www.wikidata.org/.well-known/genid/"
        )
      )

      ?property wikibase:directClaim ?predicate.
      ?property rdfs:label ?propertyLabel.

      FILTER(LANG(?propertyLabel) = "en")

      BIND(
        REPLACE(
          STR(?property),
          "http://www.wikidata.org/entity/",
          ""
        )
        AS ?propertyId
      )

      BIND(
        IF(
          isIRI(?value),
          "item",
          "literal"
        )
        AS ?valueType
      )

      OPTIONAL {
        ?value rdfs:label ?valueLabel.
        FILTER(LANG(?valueLabel) = "en")
      }

      OPTIONAL {
        ?article schema:about ?value.
        ?article schema:isPartOf <https://en.wikipedia.org/>.
      }

      OPTIONAL {
        ?property wikibase:propertyType ?propertyType.
      }

      FILTER(
        !BOUND(?propertyType) ||
        (
          ?propertyType != wikibase:ExternalId &&
          ?propertyType != wikibase:CommonsMedia &&
          ?propertyType != wikibase:Url
        )
      )
    }

    ORDER BY ?propertyLabel
  `;

  const bindings = await queryWikidata(query);

  const statements: WikidataStatement[] = bindings.map((binding) => ({
    propertyId: getValue(binding, "propertyId") ?? "",
    propertyLabel: getValue(binding, "propertyLabel") ?? "",
    value: getValue(binding, "value") ?? "",
    valueLabel: getValue(binding, "valueLabel"),
    wikipediaUrl: getValue(binding, "article"),
    valueType: getValue(binding, "valueType") === "item" ? "item" : "literal",
  }));

  const uniqueStatements = new Map<string, WikidataStatement>();

  for (const statement of statements) {
    const key = [
      statement.propertyId,
      statement.value,
      statement.wikipediaUrl ?? "",
    ].join("|");

    uniqueStatements.set(key, statement);
  }

  return [...uniqueStatements.values()];
}

function getLinks(
  bindings: SparqlBinding[],
  propertyId: string,
): WikidataLink[] {
  return bindings
    .filter((binding) => getValue(binding, "propertyName") === propertyId)
    .map((binding) => {
      const value = getValue(binding, "value");
      const label = getValue(binding, "valueLabel");
      const wikipediaUrl = getValue(binding, "article");

      if (!value || !label) {
        return null;
      }

      return {
        id: value.split("/").pop()!,
        label,
        wikipediaUrl,
      };
    })
    .filter((link): link is WikidataLink => link !== null);
}

function getCommonData(
  wikidataId: string,
  bindings: SparqlBinding[],
): WikidataEntityBase {
  const first = bindings[0] ?? {};

  return {
    wikidataId,
    name: getValue(first, "itemLabel"),
    description: getValue(first, "itemDescription"),

    instanceOf: getLinks(bindings, "P31"),
    subclassOf: getLinks(bindings, "P279"),

    imageUrl: getValue(first, "image"),
  };
}

export async function getWikidataEntity(
  wikidataId: string,
  entityType: EntityType,
  conceptType?: ConceptType,
): Promise<WikidataEntity> {
  validateWikidataId(wikidataId);

  const bindings = await fetchEntityData(wikidataId, entityType);

  const common = getCommonData(wikidataId, bindings);

  const values = (propertyId: string): string[] =>
    bindings
      .filter((binding) => getValue(binding, "propertyName") === propertyId)
      .map((binding) => getValue(binding, "value"))
      .filter((value): value is string => value !== null);

  const links = (propertyId: string): WikidataLink[] =>
    bindings
      .filter((binding) => getValue(binding, "propertyName") === propertyId)
      .map((binding) => {
        const id = getValue(binding, "value");
        const label = getValue(binding, "valueLabel");

        if (!id || !label) {
          return null;
        }

        return {
          id: id.replace("http://www.wikidata.org/entity/", ""),
          label,
          wikipediaUrl: getValue(binding, "article"),
        };
      })
      .filter((link): link is WikidataLink => link !== null);

  switch (entityType) {
    case "person":
      return {
        type: "person",
        ...common,
        birthDate: getDate(bindings, "P569"),
        deathDate: getDate(bindings, "P570"),
        birthPlace: links("P19")[0] ?? null,
        deathPlace: links("P20")[0] ?? null,
        occupations: links("P106"),
        nationality: links("P27"),
        awards: links("P166"),
        employer: links("P108"),
        education: links("P69"),
        memberOf: links("P463"),
        influencedBy: links("P737"),
        residence: links("P551"),
        father: links("P22")[0] ?? null,
        mother: links("P25")[0] ?? null,
        spouse: links("P26"),
        children: links("P40"),
        siblings: links("P3373"),
      };

    case "place":
      return {
        type: "place",
        ...common,
        country: links("P17")[0] ?? null,
        continent: links("P30")[0] ?? null,
        locatedIn: links("P131")[0] ?? null,
        coordinates: getCoordinate(bindings),
        population: getNumber(bindings, "P1082"),
        area: getNumber(bindings, "P2046"),
        inceptionDate: getDate(bindings, "P571"),
        officialLanguage: links("P37"),
        currency: links("P38"),
        contains: links("P150"),
        sharesBorderWith: links("P47"),
        neighboringBodyOfWater: links("P206"),
      };

    case "organization":
      return {
        type: "organization",
        ...common,
        inceptionDate: getDate(bindings, "P571"),
        dissolutionDate: getDate(bindings, "P576"),
        headquarters: links("P159")[0] ?? null,
        country: links("P17")[0] ?? null,
        officialWebsite: values("P856")[0] ?? null,
        founder: links("P112"),
        employees: getNumber(bindings, "P1128"),
        leader: links("P488"),
        memberOf: links("P463"),
        parentOrganization: links("P749"),
        subsidiaries: links("P355"),
        fieldOfWork: links("P101"),
      };

    case "event":
      return {
        type: "event",
        ...common,
        startDate: getDate(bindings, "P580"),
        endDate: getDate(bindings, "P582"),
        location: links("P276")[0] ?? null,
        participant: links("P710"),
        organizer: links("P664"),
        country: links("P17")[0] ?? null,
        significantEvent: links("P793"),
      };

    case "concept":
      return {
        type: "concept",
        ...common,

        conceptType: conceptType ?? null,

        inceptionDate: getDate(bindings, "P571"),
        formula: getValue(
          bindings.find(
            (binding) => getValue(binding, "propertyName") === "P2534",
          ) ?? {},
          "value",
        ),

        facetOf: links("P1269"),

        fieldOfWork: links("P101"),
        studiedBy: links("P2578"),
        mainSubject: links("P921"),

        partOf: links("P361"),
        hasPart: links("P527"),
        basedOn: links("P144"),

        cause: links("P828"),
        effect: links("P1542"),

        oppositeOf: links("P461"),
        differentFrom: links("P1889"),
        saidToBeTheSameAs: links("P460"),

        follows: links("P155"),
        followedBy: links("P156"),
        replaces: links("P1365"),
        replacedBy: links("P1366"),

        discovererOrInventor: links("P61"),
        describedBySource: links("P1343"),

        hasQuality: links("P1552"),

        commonsCategory: getValue(
          bindings.find(
            (binding) => getValue(binding, "propertyName") === "P373",
          ) ?? {},
          "valueLabel",
        ),
      };

    case "work":
      return {
        type: "work",
        ...common,
        creator: links("P170"),
        publicationDate: getDate(bindings, "P577"),
        genre: links("P136"),
        publisher: links("P123"),
        language: links("P407"),
        country: links("P495")[0] ?? null,
        series: links("P179"),
        basedOn: links("P144"),
        partOf: links("P361"),
      };

    case "species":
      return {
        type: "species",
        ...common,
        scientificName: getValue(
          bindings.find(
            (binding) => getValue(binding, "propertyName") === "P225",
          ) ?? {},
          "value",
        ),
        commonNames: links("P1843"),
        taxonRank: links("P105")[0] ?? null,
        parentTaxon: links("P171")[0] ?? null,
        conservationStatus: links("P141")[0] ?? null,
        endemicTo: links("P183"),
        taxonAuthor: links("P405")[0] ?? null,
      };
  }
}
