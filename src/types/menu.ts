export type MenuItem = {
  id: string;
  title: string;
  children?: MenuItem[];
  entityType?: "person" | "concept";
  wikidataId?: string;
};

export type MenuJsonItem = {
  id: string;
  title: string;
  children?: MenuJsonItem[];
  entityType?: string;
  wikidataId?: string;
};
