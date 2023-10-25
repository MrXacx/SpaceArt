import {
  CardProfileContainer,
  CategoryButton,
  CategoryContainer,
  CategoryInput,
  SearchArtistContainer,
} from "./searchArtistStyles";
import CardProfile from "../cardProfileTest/cardProfile";
import { UserContext } from "../../contexts/UserContext";
import { AccountTypesUtil, AccountType } from "../../enums/AccountType";
import { Artist, Enterprise, User } from "../../api/User";
import { NoLoggedAcessError } from "../../errors/NoLoggedAcessError";
import { useContext, useEffect, useState } from "react";

function SearchArtist() {
  const [name, setName] = useState("");
  const [cards, setCards] = useState <JSX.Element[]>([]);
  const { type } = useContext(UserContext);
/*
  useEffect(() => {
    const fetchCards = async (name: string) => {
      let client: Artist;

      switch (AccountTypesUtil.parse(type)) {
        case AccountType.artist:
          client = new Enterprise();
          break
        case AccountType.enterprise:
          client = new Artist();
          break;
        default: NoLoggedAcessError.throw("Tentativa de utilizar a ferramenta de busca sem login prévio");
      }

      client = new Artist();

      const list =  await client.fetchListNoFilter(0,25);
        
        return list.map((item: Artist|Enterprise|User) => {
          let wage:any, art:any;

          const data = item.toObject();
          const { id, image, index, type, name, location } = data;

          if(item instanceof Artist){
            [ wage, art ] = [
              item.toObject().wage,
              item.toObject().art
            ];
          } else{
            [ wage, art ] =  [ undefined, undefined ];
          }
          return CardProfile(
            id as string,
            index as number,
            image as string,
            name as string,
            type as string,
            location?.city as string,
            location?.state as string,
            art,
            wage
          );
        });
    }

    fetchCards(name).then( cards => {setCards(cards)});
  }, [name, type])
*/
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
      <CardProfileContainer></CardProfileContainer>
    </SearchArtistContainer>
  );
}

export default SearchArtist;
