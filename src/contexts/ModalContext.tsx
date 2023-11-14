import { createContext, useState } from "react";

interface ModalStoreProps {
  children: React.ReactNode;
}

export const ModalContext = createContext({} as any);

export const ModalProvider = ({ children }: ModalStoreProps) => {
  const [hideNewContract, setHideNewContract] = useState(true);
  const [hideNewSelection, setHideNewSelection] = useState(true);
  const [hideMyContract, setHideMyContract] = useState(true);
  const [hideMySelection, setHideMySelection] = useState(true);
  const [hideProfileUpdate, setHideProfileUpdate] = useState(true);
  const [hideNewPost, setHideNewPost] = useState(true);

  const toogleNewContractVisibilty = () => setHideNewContract(!hideNewContract);
  const toogleNewSelectionVisibilty = () => setHideNewSelection(!hideNewSelection);
  const toogleMyContractVisibilty = () => setHideMyContract(!hideMyContract);
  const toogleMySelectionVisibilty = () => setHideMySelection(!hideMySelection);
  const toogleProfileUpdateVisibilty = () => setHideProfileUpdate(!hideProfileUpdate);
  const toogleNewPostVisibilty = () => setHideNewPost(!hideNewPost);

  return (
    <ModalContext.Provider
      value={{
        hideNewContract,
        toogleNewContractVisibilty,
        hideNewSelection,
        toogleNewSelectionVisibilty,
        hideMyContract,
        toogleMyContractVisibilty,
        hideMySelection,
        toogleMySelectionVisibilty,
        hideProfileUpdate,
        toogleProfileUpdateVisibilty,
        hideNewPost,
        toogleNewPostVisibilty,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
