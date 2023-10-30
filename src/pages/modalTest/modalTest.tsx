import { useContext } from "react";
<<<<<<< HEAD
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
=======
import { ModalButton } from "./modalTestStyles";
import { ModalContext } from "../../contexts/ModalContext";

function ModalTest() {
  const { hideModal, setHideModal } = useContext(ModalContext);
  
  return (
    <ModalButton />
>>>>>>> 33f828e (feed typescript)
  );
}

export default ModalTest;
