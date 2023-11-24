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
  FormInputErrorMessage,
  Modal,
} from "./privateDataUpdateStyles";
import XIcon from "../../assets/x.svg";
import { useContext, useState } from "react";
import { ModalContext } from "../../contexts/ModalContext";
import { UserContext } from "../../contexts/UserContext";
import { AccountType } from "../../enums/AccountType";
import {
  artistPrivateDataUpdatingSchema,
  enterprisePrivateDataUpdatingSchema,
} from "../../schemas/user/DataUpdatingSchemas";
import { PostalCodeWebClient } from "../../services/PostalCodeWebClient";

function PrivateDataUpdate() {
  const { hidePrivateDataUpdate, tooglePrivateDataUpdateVisibility } =
    useContext(ModalContext);

  const { user, type, updateLoggedUser } = useContext(UserContext);

  const [inputErrorMessage, setInputeErrorMessage] = useState("");
  const [phone, setPhone] = useState(user.phone);
  const [CEP, setCEP] = useState(user.location?.CEP ?? "");
  const [city, setCity] = useState(user.location?.city ?? "");
  const [state, setState] = useState(user.location?.state ?? "");
  const [neighborhood, setNeighborhood] = useState(user.location?.neighborhood);
  const [address, setAddress] = useState(user.location?.address ?? "");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const searchLocation = (code: string) => {
    new PostalCodeWebClient()
      .fetch(code)
      .then((location) => {
        setState(location.state);
        setCity(location.city);
        setNeighborhood(location.neighborhood);
      })
      .catch(console.log);
  };

  const update = () => {
    let items: any = { phone, CEP, city, password, repeatPassword };

    if (type === AccountType.enterprise)
      items = { ...items, neighborhood, address };

    items = Object.fromEntries(
      Object.entries(items).filter(
        ([key, value]) => value && user[key] !== value
      )
    );

    const { error } = (
      type === AccountType.artist
        ? artistPrivateDataUpdatingSchema
        : enterprisePrivateDataUpdatingSchema
    ).validate(items);

    if (error) {
      setInputeErrorMessage(error.message);
      return;
    }

    setInputeErrorMessage("");
    updateLoggedUser({
      phone,
      password,
      location: { CEP, city, neighborhood, address },
    })
      //.then(tooglePrivateDataUpdateVisibility)
      .catch((e: any) => {
        setInputeErrorMessage(e.message);
        console.log(e);
      });
  };

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
            <SignContainer
              onSubmit={(e: any) => {
                e.preventDefault();
                update();
              }}
            >
              <FormInputErrorMessage hidden={inputErrorMessage.length === 0}>
                {inputErrorMessage}
              </FormInputErrorMessage>
              <FormInputHalfField
                type="tel"
                placeholder="Telefone"
                value={phone}
                onChange={({ target }) => setPhone(target.value)}
              />
              <FormInputHalfField
                type="text"
                placeholder="CEP"
                value={CEP}
                onChange={({ target }) => {
                  setCEP(target.value);
                  if (target.value.length === 8) {
                    searchLocation(target.value);
                  }
                }}
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
              {user.type === AccountType.enterprise ? (
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
                    disabled={CEP.length < 8}
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
