import styled from "styled-components";

const backgroundImage = "https://cdn.discordapp.com/attachments/462392117038284830/1157743576176922765/image.png?ex=6519b83a&is=651866ba&hm=051128e0e3e4462e2eacdb78ca574fd89dbb9a2e5a38957c1d8e8270296cd7a5&";

export const OpeningBannerContainer = styled.div`
  width: 100%;
  height: 80vh;
  background-image: linear-gradient(180deg, transparent, black), url(${backgroundImage});
  background-size: cover;
  background-repeat: no-repeat;

  @media (min-width: 768px) {
    height: 95vh;
  }
  @media (min-width: 960px) {
    height: 100vh;
    background-image: linear-gradient(90deg, transparent, black), url(${backgroundImage});
  }
`;

export const OpeningBannerContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  box-sizing: border-box;  
  padding: 0;

  span {
    color: #fff;
    font-weight: 600;
    padding: 37vh 0 0 0;
    font-size: 2.5rem;
    text-align: center;
    display: block;
    
    b {
      color: #fa8b08;
    }
  }

  div {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  button {
    width: 40vw;
    height: 6vh;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 100px 0 0 0;
    border: none;
    border-radius: 10px;
    background-color: #ff6600;
    color: #fff;
    font-size: 1.1rem;
    font-weight: bold;
    cursor: pointer;
  }

    @media (min-width: 768px) {
    span {
      font-size: 4.25rem;
    }        
  }

  @media (min-width: 960px) { 
    padding-right: 150px;

    span {   
      text-align: right;
      width: 100%;
    }

    div {
     justify-content: flex-end;
    }

    button{
      width: 17vw;
    }
  }
`;

export const AboutUsContainer = styled.div`
  width: 80%;
  display: grid;
  place-items: center;
  margin: 80px auto;

  @media (min-width: 960px){
    margin: 100px auto;
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const AboutUsText = styled.div`
  width: 95%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: justify;

  @media (min-width: 960px) {
    width: 70%;
  }
`;

export const AboutUsBanner = styled.img`
  display: none;
    
  @media (min-width: 960px) {
    display: block;
    width: 40vw;
  }  
`;

export const ChooseArtistContainer = styled.div`
  width: 100%;
  display: flex;
  color: #fa8b08;
  justify-content: center;
  flex-direction: column;
  background-color: #0e0e0e;
  padding: 25px 0;

  h2 {
    font-size: 1.25rem;
    text-align: center;
  }

  @media (min-width: 768px) {
    h2 {
      font-size: 1.5rem;
    }
  }
`;

export const ChooseArtistCardContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 3vw;
  width: 95%;
  margin: 0 auto;

  @media (min-width: 960px) {
    grid-template-columns: repeat(5, 1fr);
  }
`;

export const ArtCardContainer = styled.div`
  justify-self: center;
  align-self: center;
  width: 100%;
  display: flex;  
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  border-radius: 8px;
  background-color: #0e0e0e44;

  img {
    max-width: 25vw;
  }

  span {
    margin: 10px auto 0;
    color: #fff;
  }

  @media (min-width: 960px) {
    flex-direction: column;

    img {
      max-width: 15vw;
    }
  }
`;

export const SearchArtistContainer = styled.div`
  width: 100%;
  display: flex;
  background-color: #f5f5f5;
  color: #fa8b08;
  justify-content: center;
  flex-direction: column;
  padding: 25px 0;

  h2 {
    text-align: center;
  }
`;
