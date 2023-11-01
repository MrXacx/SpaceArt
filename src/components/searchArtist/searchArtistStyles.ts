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
    font-size: 1.25rem;
  }

  @media (min-width: 768px) {
    h2 {
      font-size: 1.5rem;
    }
  }
  
`;

export const CardProfileContainer = styled.div`
  display: grid;
  margin: 0 auto;

  grid-template-columns: 1fr;
  gap: 4rem;
  padding: 50px 0;
    
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 960px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (min-width: 1920px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;
