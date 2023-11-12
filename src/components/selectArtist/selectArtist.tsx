import {
  FormInputButton,
  HeaderLogo,
  Icon,
  ModalContainer,
  SearchArtistButton,
  SearchArtistInput,
  SearchArtistInputContainer,
  SignContainer,
  SearchResults,
} from "./selectArtistStyles";
import { useContext, useState, useEffect } from "react";
import { ModalContext } from "../../contexts/ModalContext";
import XIcon from "../../assets/x.svg";
import ArtistBoxCheck from "../artistBoxCheck/artistBoxCheck";
import SearchWhiteIcon from "../../assets/search_white.svg"
import { UserContext } from "../../contexts/UserContext";
import { Artist } from "../../api/User";
import { ArtTypesUtil } from "../../enums/ArtType";
import { SearchContext } from "../../contexts/SearchContext";
import { AccountType } from "../../enums/AccountType";

function SelectArtist() {
  const { hideModal, setHideModal } = useContext(ModalContext);
  const { fetchChats } = useContext(UserContext);
  const { fetchUsersByName, searchResult, setSearchResult } = useContext(SearchContext);

  const [searchedName, setSearchedName] = useState('');


  useEffect(() => {

    fetchChats(0, 10) // Obtém conversas recentes
      .then((chats: any[]) => Promise.all( // Obtém os artistas dessas conversas
        chats.map(
          chat => new Artist(chat.artist).fetch(false)
        )))
      .then((artists: Artist[]) => artists.map( // Converte as instâncias em objetos literais
        artist => artist.toObject()
      ))
      .catch((e: any) => console.log(e.message))
      .finally((chats: any) => setSearchResult(chats ?? [])); // Define artistas padrões

  }, [fetchChats]);


  return (
    <ModalContainer>
      <HeaderLogo>
        <Icon alt="X" src={XIcon} onClick={() => setHideModal(!hideModal)} />
        <h1>Selecione um artista</h1>
      </HeaderLogo>
      <SignContainer onSubmit={(e: any) => {
        e.preventDefault();
        fetchUsersByName(AccountType.artist, searchedName)
      }}>
        <SearchArtistInputContainer>
          <SearchArtistInput
            type="text"
            placeholder="Artista"
            onChange={(e: any) => setSearchedName(e.target.value)}
          />
          <SearchArtistButton >
            <img src={SearchWhiteIcon} alt="Pesquisar" />
          </SearchArtistButton>
        </SearchArtistInputContainer>
        <SearchResults>
          {searchResult.map(
            (artist: any) => (
              <ArtistBoxCheck
                name={artist.name}
                image={artist.image}
                art={ArtTypesUtil.parse(artist.art)}
                cep={artist.cep}
                city={artist.city}
                state={artist.state}
              />
            )
          )}
        </SearchResults>
        <FormInputButton onClick={() => {/* Muda para newAgreement */ }}>AVANÇAR</FormInputButton>
      </SignContainer>
    </ModalContainer>
  );
}

export default SelectArtist;
