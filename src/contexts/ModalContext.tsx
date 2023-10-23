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
  const [hideModal, setHideModal] = useState(true);

  return (
    <ModalContext.Provider value={{ hideModal, setHideModal }}>
      {children}
    </ModalContext.Provider>
  );
};