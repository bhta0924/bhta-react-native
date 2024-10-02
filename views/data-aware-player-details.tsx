import { PlayerDetails } from "@/components/player-details";
import { usePlayerDetails } from "@/hooks/use-player-details";
import { useEffect, useMemo } from "react";

export interface DataAwarePlayerDetailsProps {
  id: string;
}

export const DataAwarePlayerDetails = ({ id }: DataAwarePlayerDetailsProps) => {
  const { fetch, result } = usePlayerDetails();

  const data = useMemo(() => result.data, [result]);

  const isLoading = useMemo(() => result.isLoading, [result]);

  useEffect(() => {
    fetch({ id });
  }, [id]);

  return <PlayerDetails details={data} isLoading={isLoading} />;
};
