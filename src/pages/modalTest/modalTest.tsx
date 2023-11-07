import { useContext } from "react";
import { Modal, ModalButton } from "./modalTestStyles";
import { ModalContext } from "../../contexts/ModalContext";
import SelectArtist from "../../components/selectArtist/selectArtist";


function ModalTest() {
  const { hideModal, setHideModal } = useContext(ModalContext);

  return (
    <>
      <ModalButton onClick={() => setHideModal(!hideModal)} />
      <Modal hideModal={hideModal}>
        <SelectArtist />
      </Modal>
    </>
  );
}

export default ModalTest;
