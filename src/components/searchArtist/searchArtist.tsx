import {
  CardProfileContainer,
  CardProfileContent,
  CardProfileDetail,
  CategoryButton,
  CategoryContainer,
  CategoryInput,
  SearchArtistContainer,
  UserCardDetailContainer,
} from "./searchArtistStyles";
import MarcoImage from "../../assets/marco_image.png";
import LocalIcon from "../../assets/local.svg";
import WageIcon from "../../assets/wage.svg";

function SearchArtist() {
  return (
    <>
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
          <CardProfileContent>
            <img alt="profile image" src={MarcoImage} />
            <CardProfileDetail>
              <div>
                <span>Marco Antônio</span>
                <span>Música</span>
              </div>
              <UserCardDetailContainer>
                <img alt="local icon" src={LocalIcon} />
                <span>Salvador, BA</span>
              </UserCardDetailContainer>
              <UserCardDetailContainer>
                <img alt="wage icon" src={WageIcon} />
                <span>R$256,00</span>
              </UserCardDetailContainer>
            </CardProfileDetail>
          </CardProfileContent>
          
        </CardProfileContainer>
      </SearchArtistContainer>
    </>
  );
}

export default SearchArtist;
