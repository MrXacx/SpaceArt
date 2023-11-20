import { createContext, useState } from "react";
import { Selection } from "../api/Selection";

interface SelectSelectionStoreProps {
  children: React.ReactNode;
}

export const SelectSelectionContext = createContext({} as any);

export const SelectSelectionProvider = ({
  children,
}: SelectSelectionStoreProps) => {
  const [selection, setSelection] = useState<Selection>();

  return (
    <SelectSelectionContext.Provider value={{ selection, setSelection }}>
      {children}
    </SelectSelectionContext.Provider>
  );
};
