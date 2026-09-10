import type { ConceptType, EntityType } from "./wikidata";

export type MenuItem = {
  id: string;
  title: string;
  children?: MenuItem[];
  entityType?: EntityType;
  conceptType?: ConceptType;
  wikidataId?: string;
};

export type MenuJsonItem = {
  id: string;
  title: string;
  children?: MenuJsonItem[];
  entityType?: string;
  conceptType?: string;
  wikidataId?: string;
};
