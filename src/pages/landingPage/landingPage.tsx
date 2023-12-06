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
    { image: MicImage, name: "MUSIC" },
    { image: ArtImage, name: "PAINT" },
    { image: DancerImage, name: "DANCE" },
    { image: SculptureImage, name: "SCUPTURE" },
    { image: TheaterImage, name: "THEATHER" },
  ];

  return (
    <>
      <Header />
      <OpeningBannerContainer>
        <OpeningBannerContent>
          <span>
            WHERE <b>TALENTS</b>
            <br></br>HAVE THEIR TURN
          </span>
          <div>
            <button onClick={() => navigate("/signUp/artist")}>
              CREATE AN ACCOUNT
            </button>
          </div>
        </OpeningBannerContent>
      </OpeningBannerContainer>
      <AboutUsContainer id="about-us">
        <AboutUsText>
          <h2>HOW WE ARE</h2>
          <p>
            Space Art is a project that has been developed to focus on the
            connection between informal artists and entrepreneurs, facilitating
            the search for interests and communication in a revolutionary way
            for the entire artistic and cultural sector. It provides users with
            various customization tools.
          </p>
        </AboutUsText>
        <AboutUsBanner alt="Man painting abstract art" src={AboutUsImage} />
      </AboutUsContainer>
      <ChooseArtistContainer id="art-types">
        <h2>CHOOSE YOUR FAVORITE ART</h2>
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
        <h2>SEARCH ARTIST OF YOUR CITY</h2>
        <LocationFilterBar withArtField={true} />
        <CardProfileContainer>
          {searchResult
            .filter(
              (item: any) => item.art === artFilter || artFilter === undefined
            )
            .map(
              // covert context states in components
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
