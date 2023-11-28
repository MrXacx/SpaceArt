import { createContext, useState } from "react";
import { Artist } from "../api/User";

interface SelectArtistStoreProps {
  children: React.ReactNode;
}

export const SelectArtistContext = createContext({} as any);

export const SelectArtistProvider = ({ children }: SelectArtistStoreProps) => {
  const [artist, setArtist] = useState<Artist>();

  return (
    <SelectArtistContext.Provider value={{ artist, setArtist }}>
      {children}
    </SelectArtistContext.Provider>
  );
};
