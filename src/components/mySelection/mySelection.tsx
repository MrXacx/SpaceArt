import {
  HeaderLogo,
  Icon,
  ModalContainer,
  SignContainer,
  SearchResults,
  FormInputButton,
  Modal,
} from "./mySelectionStyles";
import XIcon from "../../assets/x.svg";
import { useContext, useEffect, useState, useCallback } from "react";
import { ModalContext } from "../../contexts/ModalContext";
import SelectionBox from "../selectionBox/selectionBox";
import { UserContext } from "../../contexts/UserContext";
import { SelectSelectionContext } from "../../contexts/SelectSelectionContext";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { SelectionStatus } from "../../enums/ServiceStatus";
import ArtistBoxCheck from "../artistBoxCheck/artistBoxCheck";
import { ArtTypesUtil } from "../../enums/ArtType";

interface MySelectionProps {
  filter: SelectionStatus;
}

function MySelection(props: MySelectionProps) {
  const {
    hideMySelection,
    toogleMySelectionVisibility,
    hideSelectArtist,
    toogleSelectArtistVisibility,
    toogleNewContractVisibility,
    setSkipSelectArtistToContract,
  } = useContext(ModalContext);
  const { fetchSelectionsByOwner, fetchArtistsInSelection } =
    useContext(UserContext);
  const { selection } = useContext(SelectSelectionContext);

  dayjs.extend(customParseFormat);

  const [selections, setSelections] = useState<any[]>([]);
  const [artists, setArtists] = useState<any[]>([]);

  const filterMethod = [
    (item: any) =>
      dayjs(
        `${item.date?.start} ${item.time?.start}`,
        "DD/MM/YYYY HH:mm"
      ).isBefore(),
    (item: any) => !item.locked,
    (item: any) =>
      dayjs(
        `${item.date?.start} ${item.time.start}`,
        "DD/MM/YYYY HH:mm"
      ).isAfter(),
  ][props.filter];

  useEffect(() => {
    fetchSelectionsByOwner().then(setSelections).catch();
  }, [fetchSelectionsByOwner]);

  const fetchArtists = useCallback(
    () => fetchArtistsInSelection(selection?.getID()).then(setArtists),
    [fetchArtistsInSelection, selection]
  );

  useEffect(() => {
    if (selection) fetchArtists();
  }, [fetchArtists, selection]);

  return (
    <Modal hidden={hideMySelection}>
      <ModalContainer hidden={!hideSelectArtist}>
        <HeaderLogo>
          <Icon
            alt="X"
            src={XIcon}
            onClick={() => toogleMySelectionVisibility()}
          />
          <h1>Minhas seleções</h1>
        </HeaderLogo>
        <SignContainer>
          {selections
            .filter((item: any) => (item ? filterMethod(item) : false))
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
      <ModalContainer hidden={hideSelectArtist}>
        <HeaderLogo>
          <Icon
            alt="X"
            src={XIcon}
            onClick={() => {
              toogleSelectArtistVisibility();
              setSkipSelectArtistToContract(false);
            }}
          />
          <h1>Selecione um artista</h1>
        </HeaderLogo>
        <SignContainer>
          <SearchResults>
            {artists.map((artist) => (
              <ArtistBoxCheck
                id={artist.id}
                name={artist.name}
                image={artist.image}
                art={ArtTypesUtil.parse(artist.art)}
                location={{
                  cep: artist.location.cep ?? "Desconhecido",
                  city: artist.location.city,
                  state: artist.location.state,
                }}
                wage={artist.wage}
              />
            ))}
          </SearchResults>
          <FormInputButton
            onClick={() => {
              toogleMySelectionVisibility();
              toogleNewContractVisibility();
              setSkipSelectArtistToContract(true);
            }}
          >
            CONTRATAR
          </FormInputButton>
        </SignContainer>
      </ModalContainer>
    </Modal>
  );
}

export default MySelection;
