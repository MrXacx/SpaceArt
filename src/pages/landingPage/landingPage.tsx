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
} from "./landingPageStyles";
import AboutUsImage from "../../assets/about_us_banner.png";
import MicImage from "../../assets/mic_banner.png";
import ArtImage from "../../assets/art_banner.png";
import DancerImage from "../../assets/dancer_banner.png";
import SculptureImage from "../../assets/sculpture_banner.png";
import TheaterImage from "../../assets/theater_banner.png";
import Footer from "../../components/footer/footer";
import SearchArtist from "../../components/searchArtist/searchArtist";

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
<<<<<<< HEAD
            ONDE <b>TALENTOS</b>
=======
            ONDE <a>TALENTOS</a>
>>>>>>> 33f828e (feed typescript)
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
<<<<<<< HEAD
              <img alt={artItem.name} src={artItem.image} />
=======
              <img alt="" src={artItem.image} />
>>>>>>> 33f828e (feed typescript)
              <span>{artItem.name}</span>
            </ArtCardContainer>
          ))}
        </ChooseArtistCardContainer>
      </ChooseArtistContainer>
      <SearchArtist />
      <Footer />
    </>
  );
}

export default LandingPage;
