import { useEffect, useRef, useState } from "react";
import type { MenuItem as MenuItemType } from "../../types/menu";
import MenuItem from "./MenuItem";

type MenuProps = {
  items: MenuItemType[];
  onLeafClick: (item: MenuItemType) => void;
};

export default function Menu({ items, onLeafClick }: MenuProps) {
  const [openPath, setOpenPath] = useState<string[]>([]);
  const navRef = useRef<HTMLElement>(null);

  function openItem(itemId: string, level: number) {
    setOpenPath((current) => [...current.slice(0, level), itemId]);
  }

  function closeFromLevel(level: number) {
    setOpenPath((current) => current.slice(0, level));
  }

  function closeAll() {
    setOpenPath([]);
  }

  useEffect(() => {
    function handleOutsideClick(event: PointerEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        closeAll();
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeAll();
      }
    }

    document.addEventListener("pointerdown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("pointerdown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <nav ref={navRef}>
      <ul className="m-0 flex list-none p-0">
        {items.map((item) => (
          <MenuItem
            key={item.id}
            item={item}
            level={0}
            openPath={openPath}
            openItem={openItem}
            closeFromLevel={closeFromLevel}
            onLeafClick={onLeafClick}
          />
        ))}
      </ul>
    </nav>
  );
}
