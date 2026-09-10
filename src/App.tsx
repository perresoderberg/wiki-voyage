import { useState } from "react";
import Footer from "./components/Footer";
import { Header } from "./components/header/Header";
import { EntityPage } from "./components/main/entity/EntityPage";
import type { MenuItem } from "./types/menu";
import { menuItems, findMenuPath } from "./utils/menu";
import { NavigationPath } from "./components/main/NavigationPath";

function App() {
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const navigationPath = selectedItem
    ? findMenuPath(menuItems, selectedItem.id)
    : null;

  return (
    <div className="w-full flex flex-col gap 2">
      <Header menuItems={menuItems} setSelectedItem={setSelectedItem} />
      <NavigationPath navigationPath={navigationPath} />

      <main className="mx-auto w-full max-w-7xl flex-1">
        {selectedItem && (
          <EntityPage key={selectedItem.id} item={selectedItem} />
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;
