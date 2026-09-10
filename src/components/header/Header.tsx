import type { MenuItem } from "../../types/menu";
import { Logo } from "./Logo";
import Menu from "./Menu";

export function Header({
  menuItems,
  setSelectedItem,
}: {
  menuItems: MenuItem[];
  setSelectedItem: (item: MenuItem) => void;
}) {
  return (
    <header className="w-full border-y border-gray-200 bg-blue-200">
      <div className="mx-auto flex max-w-7xl gap-40 px-2 ">
        <Logo />
        <Menu items={menuItems} onLeafClick={setSelectedItem} />
      </div>
    </header>
  );
}
