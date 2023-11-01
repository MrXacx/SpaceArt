import {
  CardProfileContainer,
  SearchArtistContainer,
} from "./searchArtistStyles";
import LocationFilterBar from "../locationFilterBar/locationFilterBar";
import CardProfile from "../cardProfile/cardProfile";
import { UserContext } from "../../contexts/UserContext";
import { useContext, useEffect, useState } from "react";

function SearchArtist() {
  const [name] = useState("");
  const [cards, setCards] = useState<JSX.Element[]>([]);
  let { cardsData, fetchUserCardList } = useContext(UserContext);

  useEffect(() => { // Executa consulta após a renderização
    fetchUserCardList(name)
      .then(() => {
        setCards(cardsData.map( // converte o estado do contexto em component
          (data: any) =>
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
            )));
      });
  });

  return (
    <SearchArtistContainer>
      <h2>BUSQUE ARTISTAS DE SUA CIDADE</h2>
      <LocationFilterBar />
      <CardProfileContainer>{cards}</CardProfileContainer>
    </SearchArtistContainer>
  );
}

export default SearchArtist;
