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
import {
  profileArtistUpdateSchemas,
  profileEnterpriseUpdateSchemas,
} from "../../schemas/user/DataUpdatingSchemas";

function ProfileUpdate() {
  const { hideProfileUpdate, toogleProfileUpdateVisibility } =
    useContext(ModalContext);
  const { user, type, updateLoggedUser } = useContext(UserContext);

  const [inputErrorMessage, setInputeErrorMessage] = useState("");
  const [name, setName] = useState(user.name);
  const [section, setSection] = useState(user.section);
  const [image, setImage] = useState<any>();
  const [description, setDescription] = useState(user.description);
  const [wage, setWage] = useState(user.wage);
  const [website, setWebsite] = useState(user.website);
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

  const update = () => {
    let items: any = { name, section, description, website, wage, art };

    items =
      type === AccountType.artist
        ? { ...items, wage, art }
        : { ...items, section };

    items = Object.fromEntries(
      Object.entries(items).filter(
        ([key, value]) => value && user[key] !== value
      )
    );

    const { error } = (
      type === AccountType.artist
        ? profileArtistUpdateSchemas
        : profileEnterpriseUpdateSchemas
    ).validate(items);

    if (error) {
      setInputeErrorMessage(error.message);
      return;
    }

    if (image) items["image"] = image;

    try {
      updateLoggedUser(items);
      toogleProfileUpdateVisibility();
    } catch (e: any) {
      console.error(e);
    }
  };

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
            <SignContainer
              onSubmit={(e: any) => {
                e.preventDefault();
                update();
              }}
            >
              <FormInputHalfField
                type="text"
                placeholder={`Nome ${
                  type === AccountType.artist ? "Artístico" : "Fantasia"
                }`}
                value={name}
                onChange={({ target }) => setName(target.value)}
              />
              <FormInputHalfField
                type="file"
                accept="image/*"
                size={40000}
                placeholder="Foto de perfil"
                onChange={({ target }) => setImage(target.files?.item(0))}
              />
              <FormInputFullField
                type="url"
                placeholder="Website"
                value={website}
                onChange={({ target }) => setWebsite(target.value)}
              />
              {type === AccountType.artist ? (
                <>
                  <FormSelectField
                    value={art}
                    onChange={({ target }) =>
                      setArt(ArtTypesUtil.parse(target.value))
                    }
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
                    onChange={({ target }) => setWage(target.valueAsNumber)}
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
