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

export type WikidataLink = {
  id: string;
  label: string;
  wikipediaUrl: string | null;
};

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
  instanceOf: WikidataLink[];
  subclassOf: WikidataLink[];
  imageUrl: string | null;
};

export type WikidataPerson = WikidataEntityBase & {
  type: "person";
  birthDate: string | null;
  deathDate: string | null;
  birthPlace: WikidataLink | null;
  deathPlace: WikidataLink | null;
  occupations: WikidataLink[];
  nationality: WikidataLink[];
  awards: WikidataLink[];
  employer: WikidataLink[];
  education: WikidataLink[];
  memberOf: WikidataLink[];
  influencedBy: WikidataLink[];
  residence: WikidataLink[];
  father: WikidataLink | null;
  mother: WikidataLink | null;
  spouse: WikidataLink[];
  children: WikidataLink[];
  siblings: WikidataLink[];
};

export type WikidataPlace = WikidataEntityBase & {
  type: "place";
  country: WikidataLink | null;
  continent: WikidataLink | null;
  locatedIn: WikidataLink | null;
  coordinates: {
    latitude: number;
    longitude: number;
  } | null;
  population: number | null;
  area: number | null;
  inceptionDate: string | null;
  officialLanguage: WikidataLink[];
  currency: WikidataLink[];
  contains: WikidataLink[];
  sharesBorderWith: WikidataLink[];
  neighboringBodyOfWater: WikidataLink[];
};

export type WikidataOrganization = WikidataEntityBase & {
  type: "organization";
  inceptionDate: string | null;
  dissolutionDate: string | null;
  headquarters: WikidataLink | null;
  country: WikidataLink | null;
  officialWebsite: string | null;
  founder: WikidataLink[];
  employees: number | null;
  leader: WikidataLink[];
  memberOf: WikidataLink[];
  parentOrganization: WikidataLink[];
  subsidiaries: WikidataLink[];
  fieldOfWork: WikidataLink[];
};

export type WikidataEvent = WikidataEntityBase & {
  type: "event";
  startDate: string | null;
  endDate: string | null;
  location: WikidataLink | null;
  participant: WikidataLink[];
  organizer: WikidataLink[];
  country: WikidataLink | null;
  significantEvent: WikidataLink[];
};

export type WikidataConcept = WikidataEntityBase & {
  type: "concept";
  conceptType: ConceptType | null;
  inceptionDate: string | null;
  formula: string | null;
  facetOf: WikidataLink[];
  fieldOfWork: WikidataLink[];
  studiedBy: WikidataLink[];
  mainSubject: WikidataLink[];
  partOf: WikidataLink[];
  hasPart: WikidataLink[];
  basedOn: WikidataLink[];
  cause: WikidataLink[];
  effect: WikidataLink[];
  oppositeOf: WikidataLink[];
  differentFrom: WikidataLink[];
  saidToBeTheSameAs: WikidataLink[];
  follows: WikidataLink[];
  followedBy: WikidataLink[];
  replaces: WikidataLink[];
  replacedBy: WikidataLink[];
  discovererOrInventor: WikidataLink[];
  describedBySource: WikidataLink[];
  hasQuality: WikidataLink[];
  commonsCategory: string | null;
};

// books, paintings, films, music etc.

export type WikidataWork = WikidataEntityBase & {
  type: "work";
  creator: WikidataLink[];
  publicationDate: string | null;
  genre: WikidataLink[];
  publisher: WikidataLink[];
  language: WikidataLink[];
  country: WikidataLink | null;
  series: WikidataLink[];
  basedOn: WikidataLink[];
  partOf: WikidataLink[];
};

export type WikidataSpecies = WikidataEntityBase & {
  type: "species";
  scientificName: string | null;
  commonNames: WikidataLink[];
  taxonRank: WikidataLink | null;
  parentTaxon: WikidataLink | null;
  conservationStatus: WikidataLink | null;
  endemicTo: WikidataLink[];
  taxonAuthor: WikidataLink | null;
};

export type WikidataEntity =
  | WikidataPerson
  | WikidataPlace
  | WikidataOrganization
  | WikidataEvent
  | WikidataConcept
  | WikidataWork
  | WikidataSpecies;
