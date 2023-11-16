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
import { SelectionStatus } from "../../enums/ServiceStatus";
import ArtistBoxCheck from "../artistBoxCheck/artistBoxCheck";
import { ArtTypesUtil } from "../../enums/ArtType";

interface MySelectionProps {
  filter: SelectionStatus;
}

function MySelection(props: MySelectionProps) {
  const { hideMySelection, toogleMySelectionVisibility, hideSelectArtist, toogleSelectArtistVisibility, toogleNewContractVisibility } = useContext(ModalContext);
  const { fetchSelectionsByOwner, fetchArtistsInSelection } = useContext(UserContext);
  const { selection } = useContext(SelectSelectionContext);

  const [selections, setSelections] = useState<any[]>([]);
  const [artists, setArtists] = useState<any[]>([]);

  const filter = ([
    (item: any): boolean => dayjs().isBefore(`${item.date.start} : ${item.time.start}`, 'minute'),
    (item: any): boolean => item.locked,
    (item: any): boolean => dayjs().isAfter(`${item.date.end} : ${item.time.end}`, 'minute'),
  ])[props.filter];

  useEffect(() =>
    fetchSelectionsByOwner()
      .then(setSelections)
      .catch(console.error)
    , [fetchSelectionsByOwner]);

  const fetchArtists = useCallback(() =>
    fetchArtistsInSelection(selection?.getID())
      .then(setArtists),
    [fetchArtistsInSelection, selection]);

  useEffect(() => fetchArtists(), [fetchArtists]);

  return (
    <Modal hidden={hideMySelection}>
      <ModalContainer hidden={hideSelectArtist}>
        <HeaderLogo>
          <Icon alt="X" src={XIcon} onClick={() => toogleMySelectionVisibility()} />
          <h1>Minhas seleções</h1>
        </HeaderLogo>
        <SignContainer>
          {selections
            .filter((item: any) => filter(item))
            .map(
              (item: any) =>
                <SelectionBox
                  id={item.id}
                  title={item.title}
                  locked={item.locked}
                  art={item.art}
                  time={item.time}
                  price={item.price}
                  date={item.date}
                  description={item.description}
                />
            )}
        </SignContainer>
      </ModalContainer>
      <ModalContainer hidden={!hideSelectArtist}>
        <HeaderLogo>
          <Icon alt="X" src={XIcon} onClick={() => toogleSelectArtistVisibility()} />
          <h1>Selecione um artista</h1>
        </HeaderLogo>
        <SignContainer>

          <SearchResults>
            {artists.map(
              (artist: any) => (
                <ArtistBoxCheck
                  name={artist.name}
                  image={artist.image}
                  art={ArtTypesUtil.parse(artist.art)}
                  cep={artist.cep}
                  city={artist.city}
                  state={artist.state}
                  wage={artist.wage}
                />
              )
            )}
          </SearchResults>
          <FormInputButton onClick={() => {
            toogleMySelectionVisibility();
            toogleNewContractVisibility();
          }}>CONTRATAR</FormInputButton>
        </SignContainer>
      </ModalContainer>
    </Modal>
  );
}

export default MySelection;
