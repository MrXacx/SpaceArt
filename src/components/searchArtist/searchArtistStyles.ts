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

  @media (max-width: 393px) {
    h2 {
      font-size: 1.25rem;
    }
  }
  
`;

export const CardProfileContainer = styled.div`
  display: grid;
  margin: 0 auto;
  width: 73%;
  grid-template-columns: 1fr;
  gap: 4rem;
  padding: 50px 0;

  @media (min-width: 960px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;