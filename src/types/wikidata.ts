import type { CommonsSearchResult } from "./commons";
import type { MenuItem } from "./menu";
import type { WikipediaArticle } from "./wikipedia";

export const conceptTypes = [
  "theory",
  "astronomical",
  "biological",
  "chemical",
  "psychological",
  "scientific",
  "political",
  "historical",
  "art-movement",
  "field-of-study",
] as const;

export type ConceptType = (typeof conceptTypes)[number];

export const entityTypes = [
  "person",
  "place",
  "organization",
  "concept",
  "event",
  "work",
  "species",
] as const;

export type EntityType = (typeof entityTypes)[number];

export type WikidataStatement = {
  propertyId: string;
  propertyLabel: string;
  value: string;
  valueLabel: string | null;
  wikipediaUrl: string | null;
  valueType: "item" | "literal";
};

export type EntityData = {
  menuItem: MenuItem;
  wikipedia: WikipediaArticle | null;
  wikidata: WikidataEntity | null;
  commons: CommonsSearchResult | null;
};

export type WikidataEntityBase = {
  wikidataId: string;
  name: string | null;
  description: string | null;
  instanceOf: string[];
  subclassOf: string[];
  imageUrl: string | null;
};

export type WikidataPerson = WikidataEntityBase & {
  type: "person";

  birthDate: string | null;
  deathDate: string | null;
  birthPlace: string | null;
  deathPlace: string | null;

  occupations: string[];
  nationality: string[];
  awards: string[];
  employer: string[];
  education: string[];

  memberOf: string[];
  influencedBy: string[];
  residence: string[];

  father: string | null;
  mother: string | null;
  spouse: string[];
  children: string[];
  siblings: string[];
};

export type WikidataPlace = WikidataEntityBase & {
  type: "place";

  country: string | null;
  continent: string | null;
  locatedIn: string | null;
  coordinates: {
    latitude: number;
    longitude: number;
  } | null;

  population: number | null;
  area: number | null;

  inceptionDate: string | null;
  officialLanguage: string[];
  currency: string[];
  contains: string[];
  sharesBorderWith: string[];
  neighboringBodyOfWater: string[];
};

export type WikidataOrganization = WikidataEntityBase & {
  type: "organization";

  inceptionDate: string | null;
  dissolutionDate: string | null;

  headquarters: string | null;
  country: string | null;
  officialWebsite: string | null;

  founder: string[];
  employees: number | null;

  leader: string[];
  memberOf: string[];
  parentOrganization: string[];
  subsidiaries: string[];
  fieldOfWork: string[];
};

export type WikidataEvent = WikidataEntityBase & {
  type: "event";

  startDate: string | null;
  endDate: string | null;
  location: string | null;

  participant: string[];
  organizer: string[];
  country: string | null;
  significantEvent: string[];
};

export type WikidataConcept = WikidataEntityBase & {
  type: "concept";
  conceptType: ConceptType | null;

  inceptionDate: string | null;
  formula: string | null;

  facetOf: string[];

  fieldOfWork: string[];
  studiedBy: string[];
  mainSubject: string[];

  partOf: string[];
  hasPart: string[];
  basedOn: string[];

  cause: string[];
  effect: string[];

  oppositeOf: string[];
  differentFrom: string[];
  saidToBeTheSameAs: string[];

  follows: string[];
  followedBy: string[];
  replaces: string[];
  replacedBy: string[];

  discovererOrInventor: string[];
  describedBySource: string[];

  hasQuality: string[];

  commonsCategory: string | null;
};

// books, paintings, films, music etc
export type WikidataWork = WikidataEntityBase & {
  type: "work";

  creator: string[];
  publicationDate: string | null;
  genre: string[];

  publisher: string[];
  language: string[];
  country: string | null;

  series: string[];
  basedOn: string[];
  partOf: string[];
};

export type WikidataSpecies = WikidataEntityBase & {
  type: "species";

  scientificName: string | null;
  commonNames: string[];
  taxonRank: string | null;
  parentTaxon: string | null;
  conservationStatus: string | null;

  endemicTo: string[];
  taxonAuthor: string | null;
};

export type WikidataEntity =
  | WikidataPerson
  | WikidataPlace
  | WikidataOrganization
  | WikidataEvent
  | WikidataConcept
  | WikidataWork
  | WikidataSpecies;
