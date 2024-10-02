import { FiltersProvider } from "@/contexts/filters-context";
import { DataAwarePlayerList } from "@/views/data-aware-player-list";

export default function Home() {
  return (
    <FiltersProvider>
      <DataAwarePlayerList />
    </FiltersProvider>
  );
}
