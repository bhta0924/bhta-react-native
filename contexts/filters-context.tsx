import {
  createContext,
  PropsWithChildren,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

export interface FiltersContextType {
  position?: string;
  updatePosition: (position?: string) => void;
}

export const FiltersContext = createContext<FiltersContextType>({
  updatePosition: () => {},
});

export const FiltersProvider = ({ children }: PropsWithChildren) => {
  const [position, setPosition] = useState<string | undefined>();

  const updatePosition = useCallback((position?: string) => {
    setPosition(position);
  }, []);

  const value = useMemo<FiltersContextType>(
    () => ({
      position,
      updatePosition,
    }),
    [position]
  );

  return (
    <FiltersContext.Provider value={value}>{children}</FiltersContext.Provider>
  );
};

// TODO: To be removed -- turned out no need for this.
export const FiltersConsumer = ({
  children,
}: {
  children: (props: FiltersContextType) => ReactNode;
}) => {
  return (
    <FiltersProvider>
      <FiltersContext.Consumer>{children}</FiltersContext.Consumer>
    </FiltersProvider>
  );
};

export const useFilters = () => {
  const context = useContext(FiltersContext);

  if (!context) {
    throw new Error("Wrap your components with FiltersConsumer.");
  }

  return context;
};
