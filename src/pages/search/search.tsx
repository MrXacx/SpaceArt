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

import { AccountType } from "../../enums/AccountType"

function Search() {
  const [isNameFilterSelected, setNameFilterSelected] = useState("true");
  const [isLocationFilterSelected, setLocationFilterSelected] = useState("false");
  const [isArtistSearched, setArtistSearched] = useState("true");
  const [isEnterpriseSearched, setEnterpriseSearched] = useState("false");

  let { searchResult, fetchRandomUsers } = useContext(SearchContext);

  const [data] = useState(searchResult);
  const [type, setType] = useState(AccountType.artist);

  useEffect(() => {
    //     if(!data) fetchRandomUsers(type);

  }, [fetchRandomUsers, type]);

  return (
    <>
      <HeaderLogged />
      <Spacing />
      <ChooseFilterContainer>
        <div>
          <span>BUSCAR POR</span>
          <FilterOptionsContainer>
            <FilterOption
              selected={
                Boolean(type === AccountType.artist).toString()
              }
              onClick={() => setType(AccountType.artist)}
            >
              ARTISTA
            </FilterOption>
            <FilterOption
              selected={
                Boolean(type === AccountType.enterprise).toString()
              }
              onClick={() => setType(AccountType.enterprise)}
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
          {searchResult.map((data: any) =>
            CardProfile(
              data.id,
              data.index,
              data.image,
              data.name,
              data.type,
              data.city,
              data.state,
              data.art,
              data.wage
            ))}
        </CardProfileContainer>

      </SearchResultContainer>
    </>
  );
}

export default Search;
