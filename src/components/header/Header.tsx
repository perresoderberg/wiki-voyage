import type { MenuItem } from "../../types/menu";
import { ThemeSelector } from "../ThemeSelector";
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
    <header className="w-full border-border bg-gradient-to-b from-header to-surface">
      <div className="border-b">
        <div className="mx-auto flex max-w-7xl gap-40 ">
          <Logo />
          <Menu items={menuItems} onLeafClick={setSelectedItem} />
          <div className="self-center">
            <ThemeSelector />
          </div>
        </div>
      </div>
    </header>
  );
}
