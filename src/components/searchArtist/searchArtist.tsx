import {
  CardProfileContainer,
  CategoryButton,
  CategoryContainer,
  CategoryInput,
  SearchArtistContainer,
} from "./searchArtistStyles";
import CardProfile from "../cardProfile/cardProfile";

function SearchArtist() {
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
        <CardProfile />
        <CardProfile />
        <CardProfile />
        <CardProfile />
        <CardProfile />
        <CardProfile />
        <CardProfile />
        <CardProfile />
        <CardProfile />
        <CardProfile />
        <CardProfile />
        <CardProfile />
        
      </CardProfileContainer>
    </SearchArtistContainer>
  );
}

export default SearchArtist;
