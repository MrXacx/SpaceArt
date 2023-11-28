import { createContext, useState } from "react";
import { Agreement } from "../api/Agreement";

interface SelectAgreementStoreProps {
  children: React.ReactNode;
}

export const SelectAgreementContext = createContext({} as any);

export const SelectAgreementProvider = ({
  children,
}: SelectAgreementStoreProps) => {
  const [agreement, setAgreement] = useState<Agreement>();

  return (
    <SelectAgreementContext.Provider value={{ agreement, setAgreement }}>
      {children}
    </SelectAgreementContext.Provider>
  );
};
