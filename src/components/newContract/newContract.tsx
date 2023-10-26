import {
  ArtistSelected,
  FormInputButton,
  FormInputFullField,
  FormInputHalfField,
  FormInputTextbox,
  HeaderLogo,
  Icon,
  InnerContainer,
  MainSignUpContainer,
  ModalContainer,
  ProfileImage,
  SignContainer,
} from "./newContractStyles";
import XIcon from "../../assets/x.svg";
import { useContext } from "react";
import { ModalContext } from "../../contexts/ModalContext";
import LocalIcon from "../../assets/local.svg";


function NewContract() {
  const { hideModal, setHideModal } = useContext(ModalContext);

  return (
    <ModalContainer>
      <MainSignUpContainer>
        <InnerContainer>
          <HeaderLogo>
            <Icon
              alt="X"
              src={XIcon}
              onClick={() => setHideModal(!hideModal)}
            />
            <h1>Novo contrato</h1>
          </HeaderLogo>
          <SignContainer>
            <ArtistSelected>
            </ArtistSelected>
            <FormInputFullField type="text" placeholder="Arte" />
            <FormInputFullField type="text" placeholder="Valor" />
            <FormInputFullField type="text" placeholder="Data do evento" />
            <FormInputHalfField type="text" placeholder="Horário de início" />
            <FormInputHalfField
              type="text"
              placeholder="Horário de encerramento"
            />
            <FormInputTextbox type="textbox" placeholder="Descrição" />
            <FormInputButton>CRIAR CONTRATO</FormInputButton>
          </SignContainer>
        </InnerContainer>
      </MainSignUpContainer>
    </ModalContainer>
  );
}

export default NewContract;
