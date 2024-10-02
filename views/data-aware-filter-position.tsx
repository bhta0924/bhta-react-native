import { FilterPosition } from "@/components/filter-position";
import { usePositionList } from "@/hooks/use-position-list";
import { useEffect } from "react";

export interface DataAwareFilterPositionProps {
  cancel: () => void;
  position?: string;
  select: (position: string | null) => void;
}

export const DataAwareFilterPosition = ({
  cancel,
  position,
  select,
}: DataAwareFilterPositionProps) => {
  const { fetch, list } = usePositionList();

  useEffect(() => {
    fetch();
  }, []);

  return (
    <FilterPosition
      cancel={cancel}
      isLoading={list.isLoading}
      items={list.data}
      position={position}
      select={select}
    />
  );
};
