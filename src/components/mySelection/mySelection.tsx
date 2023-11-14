import {
  HeaderLogo,
  Icon,
  ModalContainer,
  SignContainer,
} from "./mySelectionStyles";
import XIcon from "../../assets/x.svg";
import { useContext } from "react";
import { ModalContext } from "../../contexts/ModalContext";
import MyBusinessBox from "../myBusinessBox/myBusinessBox";

function MySelection() {
  const { hideMySelection, toogleMySelectionVisibility } = useContext(ModalContext);

  return (
    <ModalContainer hidden={hideMySelection}>
      <HeaderLogo>
        <Icon alt="X" src={XIcon} onClick={() => toogleMySelectionVisibility()} />
        <h1>Minhas seleções</h1>
      </HeaderLogo>
      <SignContainer>
        <MyBusinessBox />
        <MyBusinessBox />
      </SignContainer>
    </ModalContainer>
  );
}

export default MySelection;
