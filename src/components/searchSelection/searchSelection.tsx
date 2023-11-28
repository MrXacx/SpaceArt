import {
  HeaderLogo,
  Icon,
  ModalContainer,
  SignContainer,
  Modal,
  FormSelectField,
} from "./searchSelectionStyles";
import XIcon from "../../assets/x.svg";
import { useContext, useEffect, useState } from "react";
import { ModalContext } from "../../contexts/ModalContext";
import SelectionBox from "../selectionBox/selectionBox";
import { UserContext } from "../../contexts/UserContext";
import { ArtTypesUtil } from "../../enums/ArtType";

function SearchSelection() {
  const {
    hideSearchSelection,
    toogleSearchSelectionVisibility,
    hideSelectArtist,
  } = useContext(ModalContext);
  const { user } = useContext(UserContext);

  const [selections, setSelections] = useState<any>([]);
  const [searchedArt, setSearchedArt] = useState<any>(user.art);

  const { fetchSelectionsByArt } = useContext(UserContext);

  useEffect(() => {
    fetchSelectionsByArt(searchedArt).then(setSelections).catch(console.log);
  }, [fetchSelectionsByArt, searchedArt]);

  return (
    <Modal hidden={hideSearchSelection}>
      <ModalContainer hidden={!hideSelectArtist}>
        <HeaderLogo>
          <Icon
            alt="X"
            src={XIcon}
            onClick={() => toogleSearchSelectionVisibility()}
          />
          <h1>Buscar seleções</h1>
        </HeaderLogo>
        <SignContainer>
          <FormSelectField
            value={searchedArt}
            onChange={(e: any) => setSearchedArt(e.target.value)}
          >
            <option disabled>Escolha uma modalidade artística</option>
            {ArtTypesUtil.values().map((item) => (
              <option value={item}>{item}</option>
            ))}
          </FormSelectField>
          {selections
            .filter((item: any) => !item.locked)
            .map((item: any) => (
              <SelectionBox
                id={item.id}
                title={item.title}
                locked={item.locked}
                art={item.art}
                time={item.time}
                price={item.price}
                date={item.date}
              />
            ))}
        </SignContainer>
      </ModalContainer>
    </Modal>
  );
}

export default SearchSelection;
