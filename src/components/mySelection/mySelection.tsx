import {
  HeaderLogo,
  Icon,
  ModalContainer,
  SignContainer,
  Modal,
} from "./mySelectionStyles";
import XIcon from "../../assets/x.svg";
import { useContext } from "react";
import { ModalContext } from "../../contexts/ModalContext";
import MyBusinessBox from "../myBusinessBox/myBusinessBox";

function MySelection() {
  const { hideMySelection, toogleMySelectionVisibility } = useContext(ModalContext);

  return (
    <Modal hidden={hideMySelection}>
      <ModalContainer>
        <HeaderLogo>
          <Icon alt="X" src={XIcon} onClick={() => toogleMySelectionVisibility()} />
          <h1>Minhas seleções</h1>
        </HeaderLogo>
        <SignContainer>
          <MyBusinessBox />
          <MyBusinessBox />
        </SignContainer>
      </ModalContainer>
    </Modal>
  );
}

export default MySelection;
