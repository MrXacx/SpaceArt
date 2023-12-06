import { useState, useContext } from "react";
import {
  CategoryButton,
  CategoryContainer,
  CategorySelect,
} from "./filterBarStyles";
import { ArtTypesUtil, ArtType } from "../../enums/ArtType";
import {
  BrazilianStatesUtil,
  BrazilianState,
} from "../../enums/BrazilianState";
import { AccountType } from "../../enums/AccountType";
import { SearchContext } from "../../contexts/SearchContext";
import { BrazilianCitiesWebClient } from "../../services/BrazilianCitiesWebClient";

interface FilterBarProps {
  // Parameters component must receive
  withArtField: boolean;
}

function LocationFilterBar(props: FilterBarProps) {
  const [state, setState] = useState<BrazilianState>();
  const [city, setCity] = useState("");
  const [cities, setCities] = useState<string[]>([]);
  const [art, setArt] = useState<ArtType>();
  const { fetchUsersByLocation, setArtFilter } = useContext(SearchContext);

  const search = () => {
    fetchUsersByLocation(
      props.withArtField ? AccountType.artist : AccountType.enterprise,
      state,
      city,
      0,
      25
    );

    if (art) setArtFilter(art);
  };

  return (
    <CategoryContainer with_art_field={props.withArtField}>
      <CategorySelect
        value={state}
        onChange={({ target }) => {
          try {
            const value = BrazilianStatesUtil.parse(target.value);
            setState(value);
            setCity("");
            new BrazilianCitiesWebClient()
              .fetch(value)
              .then(setCities)
              .catch((e: any) => {
                throw e;
              });
          } catch (e: any) {
            console.log(e);
          }
        }}
      >
        <option disabled selected>
          SELECT A STATE
        </option>
        {BrazilianStatesUtil.values()
          .sort((a: BrazilianState, b: BrazilianState) => a.localeCompare(b))
          .map((type) => (
            <option value={type}>{type}</option>
          ))}
      </CategorySelect>

      <CategorySelect
        value={city}
        onChange={(e: any) => setCity(e.target.value)}
      >
        <option value={""} disabled selected>
          SELECT A CITY
        </option>
        {cities
          .sort((a: string, b: string) => a.localeCompare(b))
          .map((city) => (
            <option value={city}>{city}</option>
          ))}
      </CategorySelect>

      <CategorySelect
        hidden={!props.withArtField}
        value={art}
        onChange={(e: any) => setArt(e.target.value)}
      >
        <option disabled selected>
          CHOOSE ART TYPE
        </option>
        {ArtTypesUtil.values()
          .sort((a: ArtType, b: ArtType) => a.localeCompare(b))
          .map((type) => (
            <option value={type}>{type}</option>
          ))}
      </CategorySelect>
      <CategoryButton onClick={(e: any) => search()}>SEARCH</CategoryButton>
    </CategoryContainer>
  );
}

export default LocationFilterBar;
