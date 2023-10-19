import styled from "styled-components";

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
  flex-direction: column;
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
  width: 73%;
  grid-template-columns: repeat(4, 1fr);
  gap: 4rem;
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
