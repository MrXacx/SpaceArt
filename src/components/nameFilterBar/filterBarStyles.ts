import styled from "styled-components";

export const CategoryContainer = styled.div<{ with_art_field: boolean }>`
  width: 70%;
  display: grid;
  margin: 0 auto;
  background-color: black;
  padding: 30px;
  border-radius: 15px;
  grid-template-columns: 1fr;
  row-gap: 1.5rem;
  @media (min-width: 960px) {
    grid-template-columns: ${({ with_art_field }) => with_art_field ? 'repeat(3, 1fr)' : '2fr 1fr'};
    row-gap: 0;
    column-gap: 60px;
  }
`;

export const CategoryInput = styled.input`
  height: 3.2rem;
  border: none;
  border-radius: 10px;
  padding-left: 10px;
  
  option {
    text-transform: capitalize;
  }
`;

export const CategorySelect = styled.select<{ hidden?: boolean }>`
  display: ${({ hidden }) => hidden ? 'none' : 'block'};
  height: 3.2rem;
  border: none;
  border-radius: 10px;
  padding-left: 10px;
  background-color: #fff;
  option {
    text-transform: capitalize;
  }
`;

export const CategoryButton = styled.button`
  width: 100%;
  height: 50px;
  font-weight: 600;
  background-color: #fa8b08;
  border: none;
  color: #fff;
  border-radius: 15px;
`;
