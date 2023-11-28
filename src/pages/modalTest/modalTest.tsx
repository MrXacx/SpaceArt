import { useContext } from "react";
import { Modal, ModalButton } from "./modalTestStyles";
import { ModalContext } from "../../contexts/ModalContext";
import MySelection from "../../components/mySelection/mySelection";

function ModalTest() {
  const { hideModal, setHideModal } = useContext(ModalContext);

  return (
    <>
      <ModalButton onClick={() => setHideModal(!hideModal)} />
      <Modal hideModal={hideModal}>
        <MySelection />
      </Modal>
    </>
  );
}

export default ModalTest;
