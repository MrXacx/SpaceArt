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
} from "./privateDataUpdateStyles";
import XIcon from "../../assets/x.svg";
import { useContext, useState } from "react";
import { ModalContext } from "../../contexts/ModalContext";
import { UserContext } from "../../contexts/UserContext";
import { AccountType } from "../../enums/AccountType";

function PrivateDataUpdate() {
  const { hidePrivateDataUpdate, tooglePrivateDataUpdateVisibility } =
    useContext(ModalContext);

  const { user } = useContext(UserContext);
  console.log(user);
  const [phone, setPhone] = useState(user.phone);
  const [cep, setCEP] = useState(user.location.CEP);
  const [city, setCity] = useState(user.location.city);
  const [state, setState] = useState(user.location.state);
  const [neighborhood, setNeighborhood] = useState(user.location.neighborhood);
  const [address, setAddress] = useState(user.location.address);
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  return (
    <Modal hidden={hidePrivateDataUpdate}>
      <ModalContainer>
        <MainSignUpContainer>
          <InnerContainer>
            <HeaderLogo>
              <Icon
                alt="X"
                src={XIcon}
                onClick={() => tooglePrivateDataUpdateVisibility()}
              />
              <h1>Alterar perfil</h1>
              <p>
                Altere todos os campos que deseja atualizar. Caso não tenha
                encontrado o campo desejado, isso significa que o dado informado
                não pode ser modificado por questão de segurança.
              </p>
            </HeaderLogo>
            <SignContainer>
              <FormInputHalfField
                type="tel"
                placeholder="Telefone"
                value={phone}
                onChange={({ target }) => setPhone(target.value)}
              />
              <FormInputHalfField
                type="text"
                placeholder="CEP"
                value={cep}
                onChange={({ target }) => setCEP(target.value)}
              />
              <FormInputHalfField
                type="text"
                placeholder="Cidade"
                disabled
                value={city}
              />
              <FormInputHalfField
                type="text"
                placeholder="UF"
                disabled
                value={state}
              />
              {user.type == AccountType.enterprise ? (
                <>
                  <FormInputFullField
                    type="text"
                    placeholder="Bairro"
                    disabled
                    value={neighborhood}
                  />
                  <FormInputFullField
                    type="text"
                    placeholder="Endereço"
                    value={address}
                    onChange={({ target }) => setAddress(target.value)}
                  />
                </>
              ) : (
                <></>
              )}

              <FormInputHalfField
                type="password"
                placeholder="Nova senha"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
              />
              <FormInputHalfField
                type="password"
                placeholder="Repita a nova senha"
                value={repeatPassword}
                onChange={({ target }) => setRepeatPassword(target.value)}
              />
              <FormInputButton>Salvar Alterações</FormInputButton>
            </SignContainer>
          </InnerContainer>
        </MainSignUpContainer>
      </ModalContainer>
    </Modal>
  );
}

export default PrivateDataUpdate;
