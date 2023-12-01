import Header from "../../components/header/header";
import {
  AboutUsBanner,
  AboutUsContainer,
  AboutUsText,
  ArtCardContainer,
  ChooseArtistCardContainer,
  ChooseArtistContainer,
  OpeningBannerContainer,
  OpeningBannerContent,
  CardProfileContainer,
  SearchArtistContainer,
} from "./landingPageStyles";
import AboutUsImage from "../../assets/about_us_banner.png";
import MicImage from "../../assets/mic_banner.png";
import ArtImage from "../../assets/art_banner.png";
import DancerImage from "../../assets/dancer_banner.png";
import SculptureImage from "../../assets/sculpture_banner.png";
import TheaterImage from "../../assets/theater_banner.png";
import LocationFilterBar from "../../components/locationFilterBar/locationFilterBar";
import CardProfile from "../../components/cardProfile/cardProfile";
import Footer from "../../components/footer/footer";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../contexts/SearchContext";
import { AccountType } from "../../enums/AccountType";

function LandingPage() {
  const navigate = useNavigate();
  let { searchResult, fetchRandomUsers, artFilter } = useContext(SearchContext);

  useEffect(() => {
    if (searchResult.length === 0) fetchRandomUsers(AccountType.artist);
  }, [fetchRandomUsers, searchResult.length]);

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
            ONDE <b>TALENTOS</b>
            <br></br>TÊM VEZ
          </span>
          <div>
            <button onClick={() => navigate("/signUp/artist")}>
              CRIE UMA CONTA
            </button>
          </div>
        </OpeningBannerContent>
      </OpeningBannerContainer>
      <AboutUsContainer id="about-us">
        <AboutUsText>
          <h2>QUEM SOMOS</h2>
          <p>
            A Space art é um projeto que foi desenvolvido para ser focado na
            conexão entre artistas informais e empreendedores, facilitando a
            busca por interesses e a comunicação de uma forma revolucionária
            para toda a indústria do setor artístico e cultural,
            disponibilizando para o usuário diversas ferramentas de
            personalização.
          </p>
        </AboutUsText>
        <AboutUsBanner alt="Man painting abstract art" src={AboutUsImage} />
      </AboutUsContainer>
      <ChooseArtistContainer id="art-types">
        <h2>ESCOLHA SEU MODELO DE ARTE PREFERIDO</h2>
        <ChooseArtistCardContainer>
          {artItems.map((artItem) => (
            <ArtCardContainer>
              <img alt={artItem.name} src={artItem.image} />
              <span>{artItem.name}</span>
            </ArtCardContainer>
          ))}
        </ChooseArtistCardContainer>
      </ChooseArtistContainer>
      <SearchArtistContainer id="search-artists">
        <h2>BUSQUE ARTISTAS DE SUA CIDADE</h2>
        <LocationFilterBar withArtField={true} />
        <CardProfileContainer>
          {searchResult
            .filter(
              (item: any) => item.art === artFilter || artFilter === undefined
            )
            .map(
              // converte o estado do contexto em component
              (data: any) => (
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
              )
            )}
        </CardProfileContainer>
      </SearchArtistContainer>
      <Footer />
    </>
  );
}

export default LandingPage;
