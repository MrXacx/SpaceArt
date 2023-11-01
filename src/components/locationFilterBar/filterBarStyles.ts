import styled from "styled-components";

export const CategoryContainer = styled.div`
  width: 70%;
  display: grid;
  margin: 0 auto;
  background-color: black;
  flex-direction: column;
  padding: 30px;
  border-radius: 15px;
    grid-template-columns: 1fr;
    row-gap: 1.5rem;
    
  @media (min-width: 960px) {
    grid-template-columns: repeat(4, 1fr);
    row-gap: 0;
    column-gap: 60px;
  }
`;

export const CategoryInput = styled.select`
  height: 50px;
  border: none;
  border-radius: 10px;
  padding-left: 10px;
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
