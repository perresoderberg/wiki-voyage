import menu from "../data/menu.json";
import type { MenuItem, MenuJsonItem } from "../types/menu";
import {
  conceptTypes,
  entityTypes,
  type ConceptType,
  type EntityType,
} from "../types/wikidata";

function isEntityType(value: string): value is EntityType {
  return entityTypes.includes(value as EntityType);
}

function isConceptType(value: string): value is ConceptType {
  return conceptTypes.includes(value as ConceptType);
}

function mapMenuItem(item: MenuJsonItem): MenuItem {
  const entityType =
    item.entityType && isEntityType(item.entityType)
      ? item.entityType
      : undefined;

  const conceptType =
    item.conceptType && isConceptType(item.conceptType)
      ? item.conceptType
      : undefined;

  return {
    id: item.id,
    title: item.title,
    entityType,
    conceptType,
    wikidataId: item.wikidataId,
    children: item.children?.map(mapMenuItem),
  };
}

export function findMenuPath(
  items: MenuItem[],
  targetId: string,
): MenuItem[] | null {
  for (const item of items) {
    if (item.id === targetId) {
      return [item];
    }

    if (item.children) {
      const path = findMenuPath(item.children, targetId);

      if (path) {
        return [item, ...path];
      }
    }
  }

  return null;
}
export const menuItems: MenuItem[] = menu.children.map(mapMenuItem);
