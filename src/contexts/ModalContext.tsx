import { createContext, useState } from "react";

interface IModalContext {
  hideModal: boolean;
  setHideModal: (value: boolean) => void;
}

interface ModalStoreProps {
  children: React.ReactNode;
}

export const ModalContext = createContext<IModalContext>({
  hideModal: true,
  setHideModal: () => {},
});

export const ModalProvider = ({ children }: ModalStoreProps) => {
  const [hideNewContract, setHideNewContract] = useState(true);
  const [hideNewSelection, setHideNewSelection] = useState(true);
  const [hideMyContract, setHideMyContract] = useState(true);
  const [hideMySelection, setHideMySelection] = useState(true);

  const toogleNewContract = () => setHideNewContract(!hideNewContract);
  const toogleNewSelection = () => setHideNewSelection(!hideNewSelection);
  const toogleMyContract = () => setHideMyContract(!hideMyContract);
  const toogleMySelections = () => setHideMySelection(!hideMySelection);

  return (
    <ModalContext.Provider
      value={{
        toogleNewContract,
        toogleNewSelection,
        toogleMyContract,
        toogleMySelections,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
