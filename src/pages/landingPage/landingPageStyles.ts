import styled from "styled-components";

export const OpeningBannerContainer = styled.div`
  width: 100%;
  height: 100vh;
  background-image: linear-gradient(90deg, transparent, black),
    url("https://cdn.discordapp.com/attachments/462392117038284830/1157743576176922765/image.png?ex=6519b83a&is=651866ba&hm=051128e0e3e4462e2eacdb78ca574fd89dbb9a2e5a38957c1d8e8270296cd7a5&");
  background-size: cover;
  background-repeat: no-repeat;
`;

export const OpeningBannerContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  box-sizing: border-box;
  padding-right: 150px;
  width: 100%;

  span {
    font-size: 70px;
    color: #fff;
    font-weight: 600;
    padding: 37vh 0 0 0;
    text-align: right;

<<<<<<< HEAD
<<<<<<< HEAD
    b {
=======
    a {
>>>>>>> 33f828e (feed typescript)
=======
    a {
>>>>>>> react
      color: #fa8b08;
    }
  }

  div {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }

  button {
    width: 250px;
    height: 50px;
    background-color: #ff6600;
    color: #fff;
    border-radius: 10px;
    cursor: pointer;
    font-size: 18px;
    display: flex;
    font-weight: bold;
    border: none;
    justify-content: center;
    align-items: center;
    margin: 100px 0 0 0;
  }
`;

export const AboutUsContainer = styled.div`
  width: 80%;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  margin: 100px auto;
`;

export const AboutUsText = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const AboutUsBanner = styled.img`
  width: 600px;
  background-size: cover;
`;
<<<<<<< HEAD
<<<<<<< HEAD

=======
//#0E0E0E
>>>>>>> 33f828e (feed typescript)
=======
//#0E0E0E
>>>>>>> react
export const ChooseArtistContainer = styled.div`
  width: 100%;
  display: flex;
  color: #fa8b08;
  justify-content: center;
  flex-direction: column;
  background-color: #0e0e0e;
  padding: 25px 0;

  h2 {
    text-align: center;
  }
`;

export const ChooseArtistCardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  column-gap: 40px;
  width: 95%;
  margin: 0 auto;
`;

export const ArtCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 275px;

  span {
    margin: 10px auto 0;
    color: #fff;
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

export const CategoryContainer = styled.div`
  width: 70%;
  display: grid;
  margin: 0 auto;
  background-color: black;
  grid-template-columns: repeat(4, 1fr);
  padding: 30px;
  column-gap: 60px;
  border-radius: 5px;
`;

export const CategoryInput = styled.select`
  height: 50px;
  border: none;
  border-radius: 15px;
`;

export const CategoryButton = styled.button`
  width: 100%;
  height: 50px;
  font-weight: 600;
  background-color: #fa8b08;
  border: none;
  color: #fff;
`;

export const CardProfileContainer = styled.div`
  display: grid;
  margin: 0 auto;
  width: 50%;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  padding: 50px 0;
`;

export const CardProfileContent = styled.div`
  width: 300px;
  border-radius: 20% 20px 20px 20px;
  box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.25);

  img {
    width: inherit !important;
  }
`;

export const CardProfileDetail = styled.div`
  width: 100%;

  div {
    &:first-of-type {
      display: flex;
      justify-content: space-around;
      align-items: center;
      color: #000;
      padding: 5px 0;

      span {
        font-size: 1.3em;
        font-weight: 600;

        &:last-of-type {
          padding: 5px 20px;
          background-color: #fa8b08;
          font-size: 0.8em;
          color: #fff;
          border-radius: 50px;
        }
      }
    }
  }
`;

export const UserCardDetailContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 0 0 15px;

  &:last-of-type {
    padding: 10px 0 15px 15px;
  }
  

  span {
    font-size: 1em;
    font-weight: 600;
    color: #000;
  }

  img {
    width: 25px;
    padding: 0 15px 0 0;
  }
`;
