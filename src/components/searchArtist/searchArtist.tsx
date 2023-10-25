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
import { Artist, Enterprise, User } from "../../api-clients/User";
import { NoLoggedAcessError } from "../../errors/NoLoggedAcessError";
import { useContext } from "react";

function SearchArtist() {
  const { type } = useContext(UserContext);

  const fetchCards = (name: string) => {
    let client: User;

    switch (AccountTypesUtil.parse(type)) {
      case AccountType.artist:
        client = new Enterprise();
        break
      case AccountType.enterprise:
        client = new Artist();
        break;
      default: NoLoggedAcessError.throw("Tentativa de utilizar a ferramenta de busca sem login prévio");
    }

    return client
      .fetchListFilteringName(name, 0, 25)
      .then((list: Artist[]) => list.map(item => {
        const data = item.toObject();
        const { id, image, index, type, name, location } = data;
        const { wage, art } = client instanceof Artist ? data : { wage: undefined, art: undefined };

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
      }))

  }

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
        Itere a lista aqui
      </CardProfileContainer>
    </SearchArtistContainer>
  );
}

export default SearchArtist;
