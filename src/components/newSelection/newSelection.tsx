import {
  FormInputButton,
  FormInputFullField,
  FormInputHalfField,
  FormInputTextbox,
  HeaderLogo,
  Icon,
  InnerContainer,
  MainSignUpContainer,
  ModalContainer,
  SignContainer,
  Modal,
} from "./newSelectionStyles";
import XIcon from "../../assets/x.svg";
import { useContext } from "react";
import { ModalContext } from "../../contexts/ModalContext";

function NewSelection() {
  const { hideNewSelection, toogleNewSelectionVisibility } = useContext(ModalContext);

  return (
    <Modal hidden={hideNewSelection}>
      <ModalContainer>
        <MainSignUpContainer>
          <InnerContainer>
            <HeaderLogo>
              <Icon alt="X" src={XIcon} onClick={() => toogleNewSelectionVisibility()} />
              <h1>Nova seleção</h1>
            </HeaderLogo>
            <SignContainer>
              <FormInputFullField type="text" placeholder="Título" />
              <FormInputFullField type="text" placeholder="Arte" />
              <FormInputFullField type="text" placeholder="Valor" />
              <FormInputHalfField type="email" placeholder="Data de abertura" />
              <FormInputHalfField type="tel" placeholder="Data de encerramento" />
              <FormInputHalfField type="text" placeholder="Horário de inicío" />
              <FormInputHalfField
                type="text"
                placeholder="Horário de encerramento"
              />
              <FormInputTextbox type="textbox" placeholder="Descrição" />
              <FormInputButton>CRIAR CONTA</FormInputButton>
            </SignContainer>
          </InnerContainer>
        </MainSignUpContainer>
      </ModalContainer>
    </Modal>
  );
}

export default NewSelection;
