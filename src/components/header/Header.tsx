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
    <header className="flex justify-between items-center border-b w-full border-gray-200 bg-blue-200">
      <Logo />
      <div className="mx-auto max-w-7xl px-6">
        <Menu items={menuItems} onLeafClick={setSelectedItem} />
      </div>
    </header>
  );
}
