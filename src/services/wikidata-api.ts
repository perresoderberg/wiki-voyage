import type {
  ConceptType,
  EntityType,
  WikidataEntity,
  WikidataEntityBase,
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

function getCommonData(
  wikidataId: string,
  bindings: SparqlBinding[],
): WikidataEntityBase {
  const first = bindings[0] ?? {};

  return {
    wikidataId,
    name: getValue(first, "itemLabel"),
    description: getValue(first, "itemDescription"),

    instanceOf: bindings
      .filter((binding) => getValue(binding, "propertyName") === "P31")
      .map(
        (binding) =>
          getValue(binding, "valueLabel") ?? getValue(binding, "value"),
      )
      .filter((value): value is string => value !== null),

    subclassOf: bindings
      .filter((binding) => getValue(binding, "propertyName") === "P279")
      .map(
        (binding) =>
          getValue(binding, "valueLabel") ?? getValue(binding, "value"),
      )
      .filter((value): value is string => value !== null),

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
      .map(
        (binding) =>
          getValue(binding, "valueLabel") ?? getValue(binding, "value"),
      )
      .filter((value): value is string => value !== null);

  switch (entityType) {
    case "person":
      return {
        type: "person",
        ...common,
        birthDate: getDate(bindings, "P569"),
        deathDate: getDate(bindings, "P570"),
        birthPlace: values("P19")[0] ?? null,
        deathPlace: values("P20")[0] ?? null,
        occupations: values("P106"),
        nationality: values("P27"),
        awards: values("P166"),
        employer: values("P108"),
        education: values("P69"),
        memberOf: values("P463"),
        influencedBy: values("P737"),
        residence: values("P551"),
        father: values("P22")[0] ?? null,
        mother: values("P25")[0] ?? null,
        spouse: values("P26"),
        children: values("P40"),
        siblings: values("P3373"),
      };

    case "place":
      return {
        type: "place",
        ...common,
        country: values("P17")[0] ?? null,
        continent: values("P30")[0] ?? null,
        locatedIn: values("P131")[0] ?? null,
        coordinates: getCoordinate(bindings),
        population: getNumber(bindings, "P1082"),
        area: getNumber(bindings, "P2046"),
        inceptionDate: getDate(bindings, "P571"),
        officialLanguage: values("P37"),
        currency: values("P38"),
        contains: values("P150"),
        sharesBorderWith: values("P47"),
        neighboringBodyOfWater: values("P206"),
      };

    case "organization":
      return {
        type: "organization",
        ...common,
        inceptionDate: getDate(bindings, "P571"),
        dissolutionDate: getDate(bindings, "P576"),
        headquarters: values("P159")[0] ?? null,
        country: values("P17")[0] ?? null,
        officialWebsite: values("P856")[0] ?? null,
        founder: values("P112"),
        employees: getNumber(bindings, "P1128"),
        leader: values("P488"),
        memberOf: values("P463"),
        parentOrganization: values("P749"),
        subsidiaries: values("P355"),
        fieldOfWork: values("P101"),
      };

    case "event":
      return {
        type: "event",
        ...common,
        startDate: getDate(bindings, "P580"),
        endDate: getDate(bindings, "P582"),
        location: values("P276")[0] ?? null,
        participant: values("P710"),
        organizer: values("P664"),
        country: values("P17")[0] ?? null,
        significantEvent: values("P793"),
      };

    case "concept":
      return {
        type: "concept",
        ...common,

        conceptType: conceptType ?? null,

        inceptionDate: getDate(bindings, "P571"),
        formula: values("P2534")[0] ?? null,

        facetOf: values("P1269"),

        fieldOfWork: values("P101"),
        studiedBy: values("P2578"),
        mainSubject: values("P921"),

        partOf: values("P361"),
        hasPart: values("P527"),
        basedOn: values("P144"),

        cause: values("P828"),
        effect: values("P1542"),

        oppositeOf: values("P461"),
        differentFrom: values("P1889"),
        saidToBeTheSameAs: values("P460"),

        follows: values("P155"),
        followedBy: values("P156"),
        replaces: values("P1365"),
        replacedBy: values("P1366"),

        discovererOrInventor: values("P61"),
        describedBySource: values("P1343"),

        hasQuality: values("P1552"),

        commonsCategory: values("P373")[0] ?? null,
      };
    case "work":
      return {
        type: "work",
        ...common,
        creator: values("P170"),
        publicationDate: getDate(bindings, "P577"),
        genre: values("P136"),
        publisher: values("P123"),
        language: values("P407"),
        country: values("P495")[0] ?? null,
        series: values("P179"),
        basedOn: values("P144"),
        partOf: values("P361"),
      };

    case "species":
      return {
        type: "species",
        ...common,
        scientificName: values("P225")[0] ?? null,
        commonNames: values("P1843"),
        taxonRank: values("P105")[0] ?? null,
        parentTaxon: values("P171")[0] ?? null,
        conservationStatus: values("P141")[0] ?? null,
        endemicTo: values("P183"),
        taxonAuthor: values("P405")[0] ?? null,
      };
  }
}
