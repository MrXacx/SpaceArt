import {
  ArtistSelected,
  FormInputButton,
  FormInputFullField,
  FormInputHalfField,
  FormInputTextbox,
  HeaderLogo,
  Icon,
  LocalContainer,
  ModalContainer,
  ProfileImage,
  ProfileInnerContainer,
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
      <HeaderLogo>
        <Icon alt="X" src={XIcon} onClick={() => setHideModal(!hideModal)} />
        <h1>Novo contrato</h1>
      </HeaderLogo>
      <SignContainer>
        <ArtistSelected>
          <ProfileImage
            alt="profile"
            src="https://thispersondoesnotexist.com/"
          />
          <ProfileInnerContainer>
            <h3>Maria Betânia</h3>
            <LocalContainer>
              <Icon alt="local" src={LocalIcon} />
              <span>Salvador - BA</span>
            </LocalContainer>
          </ProfileInnerContainer>
        </ArtistSelected>
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
