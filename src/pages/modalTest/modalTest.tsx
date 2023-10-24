import { useContext } from "react";
import { Modal, ModalButton } from "./modalTestStyles";
import { ModalContext } from "../../contexts/ModalContext";
import ProfileUpdate from "../../components/profileUpdate/profileUpdate";

function ModalTest() {
  const { hideModal, setHideModal } = useContext(ModalContext);

  return (
    <>
      <ModalButton onClick={() => setHideModal(!hideModal)} />
      <Modal hideModal={hideModal}>
        <ProfileUpdate />
      </Modal>
    </>
  );
}

export default ModalTest;
