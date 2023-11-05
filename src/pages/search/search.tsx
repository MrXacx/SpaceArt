import { useState, useContext, useEffect } from "react";
import HeaderLogged from "../../components/headerLogged/headerLogged";
import {
  Spacing,
  ChooseFilterContainer,
  FilterOptionsContainer,
  FilterOption,
  FilterBarContainer,
  FilterBarItem,
  SearchResultContainer,
  CardProfileContainer,
} from "./searchStyles";
import LocationFilterBar from "../../components/locationFilterBar/locationFilterBar";
import NameFilterBar from "../../components/nameFilterBar/nameFilterBar";
import { SearchContext } from "../../contexts/SearchContext";
import CardProfile from "../../components/cardProfile/cardProfile";
import { UserContext } from "../../contexts/UserContext";

function Search() {
  const [isNameFilterSelected, setNameFilterSelected] = useState("true");
  const [isLocationFilterSelected, setLocationFilterSelected] = useState("false");
  const [isArtistSearched, setArtistSearched] = useState("true");
  const [isEnterpriseSearched, setEnterpriseSearched] = useState("false");

  const { cardsData, fetchRandomUsers } = useContext(SearchContext);

  const { type } = useContext(UserContext);

  // eslint-disable-next-line eqeqeq
  useEffect(() => fetchRandomUsers(type), [fetchRandomUsers, type]);

  return (
    <>
      <HeaderLogged />
      <Spacing />
      <ChooseFilterContainer>
        <div>
          <span>BUSCAR POR</span>
          <FilterOptionsContainer>
            <FilterOption
              selected={isArtistSearched}
              onClick={() => {
                setArtistSearched("true");
                setEnterpriseSearched("false");
              }}
            >
              ARTISTA
            </FilterOption>
            <FilterOption
              selected={isEnterpriseSearched}
              onClick={() => {
                setEnterpriseSearched("true");
                setArtistSearched("false");
              }}
            >
              EMPRESA
            </FilterOption>
          </FilterOptionsContainer>
        </div>
        <div>
          <span>FILTRAR POR</span>
          <FilterOptionsContainer>
            <FilterOption
              selected={isNameFilterSelected}
              onClick={() => {
                setNameFilterSelected("true");
                setLocationFilterSelected("false");
              }}
            >
              NOME
            </FilterOption>
            <FilterOption
              selected={isLocationFilterSelected}
              onClick={() => {
                setLocationFilterSelected("true");
                setNameFilterSelected("false");
              }}
            >
              LOCALIZAÇÃO
            </FilterOption>
          </FilterOptionsContainer>
        </div>
      </ChooseFilterContainer>
      <FilterBarContainer>
        <FilterBarItem is_visible={isNameFilterSelected}>
          <NameFilterBar withArtField={isArtistSearched} />
        </FilterBarItem>
        <FilterBarItem is_visible={isLocationFilterSelected}>
          <LocationFilterBar withArtField={isArtistSearched} />
        </FilterBarItem>
      </FilterBarContainer>
      <SearchResultContainer>
        <CardProfileContainer>
          {cardsData.map((card: any) => CardProfile)}
        </CardProfileContainer>
      </SearchResultContainer>
    </>
  );
}

export default Search;
