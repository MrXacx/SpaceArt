import styled from "styled-components";

export const CategoryContainer = styled.div<{with_art_field: string}>`
  width: 70%;
  display: grid;
  margin: 0 auto;
  background-color: black;
  padding: 30px;
  border-radius: 15px;
  grid-template-columns: 1fr;
  row-gap: 1.5rem;
  @media (min-width: 960px) {
    grid-template-columns: ${(e) => JSON.parse(e.with_art_field) ? 'repeat(4, 1fr)' : 'repeat(3, 1fr)'};
    row-gap: 0;
    column-gap: 60px;
  }
`;

export const CategorySelect = styled.select<{is_visible?: string}>`
  display: ${(e) => JSON.parse(e.is_visible ?? 'true') ? 'block' : 'none'};
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
  height: 3.2rem;
  font-weight: 600;
  background-color: #fa8b08;
  border: none;
  color: #fff;
  border-radius: 15px;
`;
