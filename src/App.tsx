import { useState } from "react";
import Footer from "./components/Footer";
import { Header } from "./components/header/Header";
import { EntityPage } from "./components/main/entity/EntityPage";
import type { MenuItem } from "./types/menu";
import { menuItems } from "./utils/menu";

function App() {
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  return (
    <>
      <Header menuItems={menuItems} setSelectedItem={setSelectedItem} />

      <main className="mx-auto w-full max-w-[800px] flex-1 bg-blue-500">
        {selectedItem && <EntityPage item={selectedItem} />}
      </main>

      <Footer />
    </>
  );
}

export default App;
