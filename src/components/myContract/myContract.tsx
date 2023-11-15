import {
  HeaderLogo,
  Icon,
  ModalContainer,
  SignContainer,
  Modal,
} from "./myContractStyles";
import XIcon from "../../assets/x.svg";
import { useContext } from "react";
import { ModalContext } from "../../contexts/ModalContext";
import MyBusinessBox from "../myBusinessBox/myBusinessBox";

function MyContract() {
  const { hideMyContract, toogleMyContractVisibility } = useContext(ModalContext);

  return (
    <Modal hidden={hideMyContract}>
      <ModalContainer>
        <HeaderLogo>
          <Icon alt="X" src={XIcon} onClick={() => toogleMyContractVisibility()} />
          <h1>Meus contratos</h1>
        </HeaderLogo>
        <SignContainer>
          <MyBusinessBox />
          <MyBusinessBox />
        </SignContainer>
      </ModalContainer>
    </Modal>
  );
}

export default MyContract;
