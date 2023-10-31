import { useContext } from "react";

import { Modal, ModalButton } from "./modalTestStyles";
import { ModalContext } from "../../contexts/ModalContext";
import NewContract from "../../components/newContract/newContract";


function ModalTest() {
  const { hideModal, setHideModal } = useContext(ModalContext);

  return (
    <>
      <ModalButton onClick={() => setHideModal(!hideModal)} />
      <Modal hideModal={hideModal}>
        <NewContract />
      </Modal>
    </>
  );
}

export default ModalTest;
