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
import { ArtType, ArtTypesUtil } from "../../enums/ArtType";

interface MySelectionProps {
  filter: SelectionStatus;
}

function MySelection(props: MySelectionProps) {
  const { hideMySelection, toogleMySelectionVisibility, hideSelectArtist, toogleSelectArtistVisibility, toogleNewContractVisibility } = useContext(ModalContext);
  const { fetchSelectionsByOwner, fetchArtistsInSelection } = useContext(UserContext);
  const { selection } = useContext(SelectSelectionContext);

  dayjs.extend(customParseFormat);

  const [selections, setSelections] = useState<any[]>([
    {id:'', title:'Testando', locked:false, art:ArtType.music, time:{start:'07:30', end:'16:00'}, date:{start:'17/11/2023', end:'19/11/2023'}, price:500, description:'testando'},
    {id:'', title:'Testando', locked:false, art:ArtType.music, time:{start:'08:00', end:'15:00'}, date:{start:'17/11/2023', end:'19/11/2023'}, price:500, description:'testando'},
    {id:'', title:'Testando', locked:true, art:ArtType.music, time:{start:'16:00', end:'16:00'}, date:{start:'17/11/2023', end:'19/11/2023'}, price:500, description:'testando'},
    {id:'', title:'Testando', locked:true, art:ArtType.music, time:{start:'07:30', end:'13:00'}, date:{start:'10/11/2023', end:'17/11/2023'}, price:500, description:'testando'},
    {id:'', title:'Testando', locked:true, art:ArtType.music, time:{start:'07:30', end:'16:00'}, date:{start:'10/11/2023', end:'15/11/2023'}, price:500, description:'testando'},
  ]);
  const [artists, setArtists] = useState<any[]>([]);

  const filter = ([
    (item: any) => dayjs(`${item.date.start} ${item.time.start}`, 'DD/MM/YYYY HH:mm').isBefore(),
    (item: any) => !item.locked,
    (item: any) => dayjs(`${item.date.start} ${item.time.start}`, 'DD/MM/YYYY HH:mm').isAfter(),
  ])[props.filter];

  useEffect(() =>{
    //fetchSelectionsByOwner()
      //.then(setSelections)
      //.catch(console.error)
    }
    , [fetchSelectionsByOwner]);

  const fetchArtists = useCallback(() =>
    {/*fetchArtistsInSelection(selection?.getID())
  .then(setArtists)*/},
    [fetchArtistsInSelection, selection]);

  useEffect(() => fetchArtists(), [fetchArtists]);

  return (
    <Modal hidden={hideMySelection}>
      <ModalContainer hidden={!hideSelectArtist}>
        <HeaderLogo>
          <Icon alt="X" src={XIcon} onClick={() => toogleMySelectionVisibility()} />
          <h1>Minhas seleções</h1>
        </HeaderLogo>
        <SignContainer>
          {selections
            .filter(filter)
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
      <ModalContainer hidden={hideSelectArtist}>
        <HeaderLogo>
          <Icon alt="X" src={XIcon} onClick={() => toogleSelectArtistVisibility()} />
          <h1>Selecione um artista</h1>
        </HeaderLogo>
        <SignContainer>

          <SearchResults>
            {artists.map(
              (artist) => (
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
