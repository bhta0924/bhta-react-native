import { DataAwarePlayerDetails } from "@/views/data-aware-player-details";
import { useGlobalSearchParams } from "expo-router";

export default function PlayerView() {
  const { id } = useGlobalSearchParams();

  return <DataAwarePlayerDetails id={id as string} />;
}
