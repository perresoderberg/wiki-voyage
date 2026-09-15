import type { MenuItem as MenuItemType } from "../../types/menu";

type MenuItemProps = {
  item: MenuItemType;
  level: number;
  openPath: string[];
  openItem: (itemId: string, level: number) => void;
  closeFromLevel: (level: number) => void;
  onLeafClick: (item: MenuItemType) => void;
};

export default function MenuItem({
  item,
  level,
  openPath,
  openItem,
  closeFromLevel,
  onLeafClick,
}: MenuItemProps) {
  const hasChildren = Boolean(item.children?.length);
  const isOpen = openPath[level] === item.id;

  function handleMouseEnter() {
    // Only menu categories react to hovering.
    if (hasChildren) {
      openItem(item.id, level);
    }
  }

  function handleClick() {
    if (hasChildren) {
      if (isOpen) {
        closeFromLevel(level);
      } else {
        openItem(item.id, level);
      }

      return;
    }

    // Leaf item: click only.
    onLeafClick(item);
  }

  const menuItemStyle = `
    flex
    w-full
    items-center
    justify-between
    rounded-md
    px-3
    py-2
    whitespace-nowrap
    text-left
    text-sm
    font-normal
    text-text-muted
    transition-colors
    duration-150
    hover:bg-hover
    hover:text-text
  `;

  const submenuStyle = `
    absolute
    z-50
    min-w-60
    rounded-lg
    border
    border-border
    bg-background
    p-1
    shadow-lg
  `;

  return (
    <li className="relative" onMouseEnter={handleMouseEnter}>
      <button type="button" onClick={handleClick} className={menuItemStyle}>
        <span>{item.title}</span>
      </button>

      {hasChildren && isOpen && item.children && (
        <ul
          className={`${submenuStyle} ${
            level === 0 ? "left-0 top-full" : "left-full top-0"
          }`}
        >
          {item.children.map((child) => (
            <MenuItem
              key={child.id}
              item={child}
              level={level + 1}
              openPath={openPath}
              openItem={openItem}
              closeFromLevel={closeFromLevel}
              onLeafClick={onLeafClick}
            />
          ))}
        </ul>
      )}
    </li>
  );
}
