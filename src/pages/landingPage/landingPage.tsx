import Header from "../../components/header/header";
import {
  AboutUsBanner,
  AboutUsContainer,
  AboutUsText,
  ArtCardContainer,
  CardProfileContainer,
  CardProfileContent,
  CardProfileDetail,
  CategoryButton,
  CategoryContainer,
  CategoryInput,
  ChooseArtistCardContainer,
  ChooseArtistContainer,
  OpeningBannerContainer,
  OpeningBannerContent,
  SearchArtistContainer,
  UserCardDetailContainer,
} from "./landingPageStyles";
import AboutUsImage from "../../assets/about_us_banner.png";
import MicImage from "../../assets/mic_banner.png";
import ArtImage from "../../assets/art_banner.png";
import DancerImage from "../../assets/dancer_banner.png";
import SculptureImage from "../../assets/sculpture_banner.png";
import TheaterImage from "../../assets/theater_banner.png";
import MarcoImage from "../../assets/marco_image.png";
import LocalIcon from "../../assets/local.svg";
import WageIcon from "../../assets/wage.svg";
import Footer from "../../components/footer/footer";

function LandingPage() {
  const artItems = [
    { image: MicImage, name: "MÚSICA" },
    { image: ArtImage, name: "PINTURA" },
    { image: DancerImage, name: "DANÇA" },
    { image: SculptureImage, name: "ESCULTURA" },
    { image: TheaterImage, name: "TEATRO" },
  ];

  return (
    <>
      <Header />
      <OpeningBannerContainer>
        <OpeningBannerContent>
          <span>
            ONDE <a>TALENTOS</a>
            <br></br>TÊM VEZ
          </span>
          <div>
            <button>CRIE A CONTA</button>
          </div>
        </OpeningBannerContent>
      </OpeningBannerContainer>
      <AboutUsContainer>
        <AboutUsText>
          <h2>QUEM SOMOS</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
            volutpat id nisi et fermentum. Mauris pulvinar odio imperdiet,
            semper risus vitae, ultricies nunc. Morbi tincidunt turpis et
            convallis placerat. Nullam vitae gravida ipsum. Quisque vulputate
            sagittis luctus. Vestibulum a bibendum nibh, eu ullamcorper nisl.
            Sed venenatis vestibulum nisl, in eleifend leo tristique in. Duis et
            sapien quam. Aliquam luctus ex nec tempor tincidunt. Aenean faucibus
            auctor porta. Ut accumsan lacus non consectetur ornare. Duis
            pulvinar imperdiet sagittis. Curabitur at velit non lorem aliquam
            sodales. Sed porta, erat eget interdum vehicula, ex velit sodales
            tortor, vel volutpat nibh ligula et lacus. Maecenas volutpat nisl a
            sem tincidunt sollicitudin sed eu libero.
          </p>
        </AboutUsText>
        <AboutUsBanner alt="Man painting abstract art" src={AboutUsImage} />
      </AboutUsContainer>
      <ChooseArtistContainer>
        <h2>ESCOLHA SEU MODELO DE ARTE PREFERIDO</h2>
        <ChooseArtistCardContainer>
          {artItems.map((artItem) => (
            <ArtCardContainer>
              <img alt="" src={artItem.image} />
              <span>{artItem.name}</span>
            </ArtCardContainer>
          ))}
        </ChooseArtistCardContainer>
      </ChooseArtistContainer>
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
      <Footer />
    </>
  );
}

export default LandingPage;
