import {
  CardProfileContainer,
  CategoryButton,
  CategoryContainer,
  CategoryInput,
  SearchArtistContainer,
} from "./searchArtistStyles";
import CardProfile from "../cardProfileTest/cardProfile";
import { UserContext } from "../../contexts/UserContext";
import { useContext, useEffect, useState } from "react";

interface ArtistProps {
  id: string;
  index: number;
  image: string;
  name: string;
  type: string;
  city: string;
  state: string;
  art?: string;
  wage?: number;
}

function SearchArtist() {
  const [name, setName] = useState("");
  const [cards, setCards] = useState<JSX.Element[]>([]);
  let { cardsData, fetchUserCardList } = useContext(UserContext);
    
  useEffect(() => { // Executa consulta após a renderização
    fetchUserCardList(name) 
    .then(() => { 
        setCards(cardsData.map( // converte o estado do contexto em component
          (data:any) =>      
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
    })
   ;
  });

  return (
    <SearchArtistContainer>
      <h2>BUSQUE ARTISTAS DE SUA CIDADE</h2>
      <CategoryContainer>
        <CategoryInput>
          <option disabled selected>
            SELECIONE SEU ESTADO
          </option>
        </CategoryInput>
        <CategoryInput>
          <option disabled selected>
            SELECIONE SUA CIDADE
          </option>
        </CategoryInput>
        <CategoryInput>
          <option disabled selected>
            ESCOLHA TIPO DE ARTE
          </option>
        </CategoryInput>
        <CategoryButton>PESQUISAR</CategoryButton>
      </CategoryContainer>
      <CardProfileContainer>
        {cards}
      </CardProfileContainer>
    </SearchArtistContainer>
  );
}

export default SearchArtist;
