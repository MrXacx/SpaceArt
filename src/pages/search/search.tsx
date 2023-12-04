import { useState, useContext, useEffect } from "react";
import HeaderLogged from "../../components/headerLogged/headerLogged";
import {
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

import { AccountType } from "../../enums/AccountType";

function Search() {
  const [isNameFilterSelected, setNameFilterSelected] = useState(true);
  const [isLocationFilterSelected, setLocationFilterSelected] = useState(false);

  let { searchResult, fetchRandomUsers, artFilter } = useContext(SearchContext);
  const [type, setType] = useState(AccountType.artist);

  useEffect(() => {
    if (searchResult.length === 0) fetchRandomUsers(type);
  }, [fetchRandomUsers, searchResult, type]);

  return (
    <>
      <HeaderLogged />
      <ChooseFilterContainer>
        <div>
          <span>SEARCH FOR</span>
          <FilterOptionsContainer>
            <FilterOption
              selected={type === AccountType.artist}
              onClick={() => setType(AccountType.artist)}
            >
              ARTIST
            </FilterOption>
            <FilterOption
              selected={type === AccountType.enterprise}
              onClick={() => setType(AccountType.enterprise)}
            >
              COMPANY
            </FilterOption>
          </FilterOptionsContainer>
        </div>
        <div>
          <span>FILTER FOR</span>
          <FilterOptionsContainer>
            <FilterOption
              selected={isNameFilterSelected}
              onClick={() => {
                setNameFilterSelected(true);
                setLocationFilterSelected(false);
              }}
            >
              NAME
            </FilterOption>
            <FilterOption
              selected={isLocationFilterSelected}
              onClick={() => {
                setLocationFilterSelected(true);
                setNameFilterSelected(false);
              }}
            >
              LOCATION
            </FilterOption>
          </FilterOptionsContainer>
        </div>
      </ChooseFilterContainer>
      <FilterBarContainer>
        <FilterBarItem hidden={!isNameFilterSelected}>
          <NameFilterBar withArtField={type === AccountType.artist} />
        </FilterBarItem>
        <FilterBarItem hidden={!isLocationFilterSelected}>
          <LocationFilterBar withArtField={type === AccountType.artist} />
        </FilterBarItem>
      </FilterBarContainer>

      <SearchResultContainer>
        <CardProfileContainer>
          {searchResult
            .filter(
              (item: any) => item.art === artFilter || artFilter === undefined
            )
            .map((data: any) => (
              <CardProfile
                id={data.id}
                index={data.index}
                image={data.image}
                name={data.name}
                type={data.type}
                city={data.city}
                state={data.state}
                art={data.art}
                wage={data.wage}
              />
            ))}
        </CardProfileContainer>
      </SearchResultContainer>
    </>
  );
}

export default Search;
