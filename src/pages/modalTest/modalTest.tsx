import { useContext } from "react";
import { ModalButton } from "./modalTestStyles";
import { ModalContext } from "../../contexts/ModalContext";

function ModalTest() {
  const { hideModal, setHideModal } = useContext(ModalContext);
  
  return (
    <ModalButton />
  );
}

export default ModalTest;
