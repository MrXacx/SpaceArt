import { createContext, useState } from "react";

interface IHideContext {
  hide: boolean;
  setHide: (value: boolean) => void;
}

interface HideStoreProps {
  children: React.ReactNode;
}

export const HideContext = createContext<IHideContext>({
  hide: true,
  setHide: () => {},
});

export const HideProvider = ({ children }: HideStoreProps) => {
  const [hide, setHide] = useState(true);

  return (
    <HideContext.Provider value={{ hide, setHide }}>
      {children}
    </HideContext.Provider>
  );
};