import menu from "../data/menu.json";
import type { MenuItem, MenuJsonItem } from "../types/menu";

function mapMenuItem(item: MenuJsonItem): MenuItem {
  if (
    item.entityType !== undefined &&
    item.entityType !== "person" &&
    item.entityType !== "concept"
  ) {
    throw new Error(`Invalid entityType: ${item.entityType}`);
  }

  return {
    id: item.id,
    title: item.title,
    entityType: item.entityType,
    wikidataId: item.wikidataId,
    children: item.children?.map(mapMenuItem),
  };
}

export const menuItems: MenuItem[] = menu.children.map(mapMenuItem);
