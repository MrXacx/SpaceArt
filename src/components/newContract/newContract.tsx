import {
  FormInputButton,
  FormInputFullField,
  FormInputHalfField,
  FormInputTextbox,
  HeaderLogo,
  Icon,
  ModalContainer,
  SignContainer,
} from "./newContractStyles";
import XIcon from "../../assets/x.svg";
import { useContext } from "react";
import { ModalContext } from "../../contexts/ModalContext";
import ArtistBoxCheck from "../artistBoxCheck/artistBoxCheck";

function NewContract() {
  const { hideModal, setHideModal } = useContext(ModalContext);

  return (
    <ModalContainer>
      <HeaderLogo>
        <Icon alt="X" src={XIcon} onClick={() => setHideModal(!hideModal)} />
        <h1>Novo contrato</h1>
      </HeaderLogo>
      <SignContainer>
        <ArtistBoxCheck />
        <FormInputFullField type="text" placeholder="Arte" />
        <FormInputFullField type="text" placeholder="Valor" />
        <FormInputFullField type="text" placeholder="Data do evento" />
        <FormInputHalfField type="text" placeholder="Horário de início" />
        <FormInputHalfField type="text" placeholder="Horário de encerramento" />
        <FormInputTextbox type="textbox" placeholder="Descrição" />
        <FormInputButton>CRIAR CONTRATO</FormInputButton>
      </SignContainer>
    </ModalContainer>
  );
}

export default NewContract;
