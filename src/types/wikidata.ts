export type WikidataPerson = {
  wikidataId: string;
  birthDate: string | null;
  deathDate: string | null;
  birthPlace: string | null;
  deathPlace: string | null;
  occupations: string[];
};
