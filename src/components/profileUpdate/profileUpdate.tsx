import {
  FormInputButton,
  FormInputFullField,
  FormInputHalfField,
  HeaderLogo,
  Icon,
  InnerContainer,
  MainSignUpContainer,
  ModalContainer,
  SignContainer,
  Modal,
} from "./profileUpdateStyles";
import XIcon from "../../assets/x.svg";
import { useContext } from "react";
import { ModalContext } from "../../contexts/ModalContext";

function ProfileUpdate() {
  const { hideProfileUpdate, toogleProfileUpdateVisibility } = useContext(ModalContext);

  return (
    <Modal hidden={hideProfileUpdate}>
      <ModalContainer>
        <MainSignUpContainer>
          <InnerContainer>
            <HeaderLogo>
              <Icon
                alt="X"
                src={XIcon}
                onClick={() => toogleProfileUpdateVisibility()}
              />
              <h1>Alterar perfil</h1>
              <span>
                Altere todos os campos que deseja atualizar. Caso não tenha
                encontrado o campo desejado, isso significa que o dado informado
                não pode ser modificado por questão de segurança.
              </span>
            </HeaderLogo>
            <SignContainer>
              <FormInputHalfField type="text" placeholder="Nome artístico" />
              <FormInputHalfField type="tel" placeholder="Telefone" />
              <FormInputFullField type="text" placeholder="Foto de perfil" />
              <FormInputFullField type="text" placeholder="Arte" />
              <FormInputFullField type="text" placeholder="Descrição" />
              <FormInputFullField type="text" placeholder="CEP" />
              <FormInputHalfField type="text" placeholder="Cidade" />
              <FormInputHalfField
                type="text"
                placeholder="UF"
              />
              <FormInputFullField type="text" placeholder="Bairro" />
              <FormInputFullField type="text" placeholder="Endereço" />
              <FormInputHalfField type="password" placeholder="Nova senha" />
              <FormInputHalfField type="password" placeholder="Repita a nova senha" />
              <FormInputButton>Salvar Alterações</FormInputButton>
            </SignContainer>
          </InnerContainer>
        </MainSignUpContainer>
      </ModalContainer>
    </Modal>
  );
}

export default ProfileUpdate;
