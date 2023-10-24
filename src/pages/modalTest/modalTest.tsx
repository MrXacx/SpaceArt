import { useContext } from "react";
import { Modal, ModalButton } from "./modalTestStyles";
import { ModalContext } from "../../contexts/ModalContext";
import NewSelection from "../../components/newSelection/newSelection";

function ModalTest() {
  const { hideModal, setHideModal } = useContext(ModalContext);

  return (
    <>
      <ModalButton onClick={() => setHideModal(!hideModal)} />
      <Modal hideModal={hideModal}>
        <NewSelection />
      </Modal>
    </>
  );
}

export default ModalTest;
