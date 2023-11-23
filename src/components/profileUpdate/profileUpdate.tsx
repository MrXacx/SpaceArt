import {
  FormInputButton,
  FormInputFullField,
  FormInputHalfField,
  FormSelectField,
  FormTextbox,
  HeaderLogo,
  Icon,
  InnerContainer,
  MainSignUpContainer,
  ModalContainer,
  SignContainer,
  Modal,
} from "./profileUpdateStyles";
import XIcon from "../../assets/x.svg";
import { useContext, useState } from "react";
import { ModalContext } from "../../contexts/ModalContext";
import { ArtTypesUtil } from "../../enums/ArtType";
import { UserContext } from "../../contexts/UserContext";
import { AccountType } from "../../enums/AccountType";

function ProfileUpdate() {
  const { hideProfileUpdate, toogleProfileUpdateVisibility } =
    useContext(ModalContext);
  const { user, type } = useContext(UserContext);

  const [name, setName] = useState(user.name);
  const [section, setSection] = useState(user.name);
  const [image, setImage] = useState(user.name);
  const [description, setDescription] = useState(user.name);
  const [wage, setWage] = useState(user.name);
  const [art, setArt] = useState(user.art);

  const businessSections = [
    "artes",
    "comércio",
    "educação",
    "engenharia",
    "finanças",
    "saúde",
    "transporte",
  ].sort((a: string, b: string) => a.localeCompare(b));

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
              <h1>Atualizar perfil</h1>
            </HeaderLogo>
            <SignContainer>
              <FormInputHalfField
                type="text"
                placeholder="Nome"
                value={name}
                onChange={({ target }) => setName(target.value)}
              />
              <FormInputHalfField
                type="file"
                accept="image/*"
                size={40000}
                placeholder="Foto de perfil"
                onChange={({ target }) => setImage(target.value)}
              />
              {type === AccountType.artist ? (
                <>
                  <FormSelectField
                    value={art}
                    onChange={({ target }) => setArt(target.value)}
                  >
                    <option disabled selected>
                      Arte
                    </option>
                    {ArtTypesUtil.values().map((item) => (
                      <option value={item}>{item}</option>
                    ))}
                  </FormSelectField>
                  <FormInputFullField
                    type="number"
                    value={wage}
                    onChange={({ target }) => setWage(parseFloat(target.value))}
                  />
                </>
              ) : (
                <FormSelectField
                  value={section}
                  onChange={({ target }) => setSection(target.value)}
                >
                  <option disabled>Setor de atuação</option>
                  {businessSections.map((section) => (
                    <option value={section}>{section}</option>
                  ))}
                </FormSelectField>
              )}
              <FormTextbox
                placeholder="Descrição"
                onChange={({ target }) => setDescription(target.value)}
              >
                {description}
              </FormTextbox>
              <FormInputButton>Salvar Alterações</FormInputButton>
            </SignContainer>
          </InnerContainer>
        </MainSignUpContainer>
      </ModalContainer>
    </Modal>
  );
}

export default ProfileUpdate;
