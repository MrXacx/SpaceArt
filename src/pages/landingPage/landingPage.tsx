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
  StatsContainer,
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
import { useState, useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../contexts/SearchContext";
import { AccountType } from "../../enums/AccountType";
import { motion } from "framer-motion";

import { Doughnut } from "react-chartjs-2";
import { UserContext } from "../../contexts/UserContext";

const randomColor = () =>
  `#${Math.floor(Math.random() * 16777215).toString(16)}`;

function LandingPage() {
  // INÍCIO DO MOCKED
  let searchResult = [
    {
      id: "1",
      index: 1,
      image: DancerImage,
      name: "Clóvis",
      type: "Moreno",
      city: "Salvador",
      state: "BA",
      art: "Paint",
      wage: 16,
    },
  ];
  searchResult = searchResult.concat(
    searchResult,
    searchResult,
    searchResult,
    searchResult
  );
  // FIM DO MOCKED

  const navigate = useNavigate();
  let { fetchRandomUsers, artFilter } = useContext(SearchContext);
  let { fetchArtistStats, fetchEnterpriseStats } = useContext(UserContext);

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
      arc: {
        borderAlign: "inner",
        borderWidth: 1,
      },
    },
  };

  const [artistChartData, setArtistChartData] = useState<any>({ datasets: [] });
  const [enterpriseChartData, setEnterpriseChartData] = useState<any>({
    datasets: [],
  });
  const [artistChartLabels, setArtistChartLabels] = useState<string[]>([]);
  const [artistChartValues, setArtistChartValues] = useState<number[]>([]);
  const [enterpriseChartLabels, setEnterpriseChartLabels] = useState<string[]>(
    []
  );
  const [enterpriseChartValues, setEnterpriseChartValues] = useState<number[]>(
    []
  );

  const carousel = useRef<HTMLDivElement>(null);
  const [carouselWidth, setCarouselWidth] = useState(0);

  useEffect(() => {
    if (artistChartLabels.length === 0 && artistChartValues.length === 0) {
      const [labels, values]: any[] = [[], []];
      fetchArtistStats().then((stats: any[]) => {
        stats
          .sort((statA, statB) => statA.art.localeCompare(statB.art))
          .forEach((value) => {
            labels.push(value.art);
            values.push(value.total);
          });

        setArtistChartLabels(labels);
        setArtistChartValues(values);
      });
    }
  }, [artistChartLabels, artistChartValues, fetchArtistStats]);

  useEffect(() => {
    setArtistChartData({
      labels: artistChartLabels,
      datasets: [
        {
          data: artistChartValues,

          backgroundColor: artistChartValues.map(randomColor),
        },
      ],
    });
  }, [artistChartLabels, artistChartValues]);

  useEffect(() => {
    if (
      enterpriseChartLabels.length === 0 &&
      enterpriseChartValues.length === 0
    ) {
      const [labels, values]: any[] = [[], []];
      fetchEnterpriseStats().then((stats: any[]) => {
        stats
          .sort((statA, statB) => statA.state.localeCompare(statB.state))
          .forEach((value) => {
            labels.push(value.state);
            values.push(value.total);
          });

        setEnterpriseChartLabels(labels);
        setEnterpriseChartValues(values);
      });
    }
  }, [enterpriseChartLabels, enterpriseChartValues, fetchEnterpriseStats]);

  useEffect(() => {
    setEnterpriseChartData({
      labels: enterpriseChartLabels,
      datasets: [
        {
          data: enterpriseChartValues,

          backgroundColor: enterpriseChartValues.map(randomColor),
        },
      ],
    });
  }, [enterpriseChartLabels, enterpriseChartValues]);

  useEffect(() => {
    if (searchResult.length === 0) fetchRandomUsers(AccountType.artist);
  }, [fetchRandomUsers, searchResult.length]);

  useEffect(() => {
    if (carousel.current) {
      setCarouselWidth(
        carousel.current.scrollWidth - carousel.current.offsetWidth
      );
    }
  }, []);

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
      <StatsContainer></StatsContainer>
      <SearchArtistContainer id="search-artists">
        <h2>SEARCH ARTIST OF YOUR CITY</h2>
        <LocationFilterBar withArtField={true} />
        <CardProfileContainer>
          {searchResult
            .filter(
              (item: any) => item.art === artFilter || artFilter === undefined
            )
            .map(
              // covert context states to components
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

      <StatsContainer>
        <h2>NOSSAS ESTATÍSTICAS</h2>
        <div>
          <h3>ARTISTS PER ART</h3>
          <Doughnut data={artistChartData} options={chartOptions}></Doughnut>
        </div>
        <div>
          <h3>SUBSCRIBED ENTERPRISES PER STATE</h3>
          <Doughnut
            data={enterpriseChartData}
            options={chartOptions}
          ></Doughnut>
        </div>
      </StatsContainer>
      <Footer />
    </>
  );
}

export default LandingPage;
