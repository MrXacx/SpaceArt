import styled from "styled-components";

export const Spacing = styled.div`
  height: 15vh;
  background-color: #fff;
`;

export const ChooseFilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;  
  margin: 1rem auto;
  width: 80%;

  >div {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;  
    margin: 1rem auto;

    span {
      font-weight: 800;
      width: 100%;
      text-align: center;
      font-size: 1.5rem;
    }
  
  }
  
  @media (min-width: 960px){
    flex-direction: row;
    justify-content: space-evenly;
    
    span {
      margin-bottom: .5rem;
    }
  }
`;

export const FilterOptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  width: 66%;
  
`;

export const FilterOption = styled.button<{ selected: boolean }>`
  width: 100%;
  padding: 0.5rem;
  margin: .5rem;
  border-radius: 5px;
  border: none;
  box-shadow: none;
  cursor: pointer;
  font-weight: 700;
  background-color: ${({ selected }) => selected ? '#ff8311' : 'transparent'};
  transition: .3s;
  font-size: 1.3rem;
  color: ${({ selected }) => selected ? '#fff' : '#ff8311'};
`;

export const FilterBarContainer = styled.div`
  width: 100%;
  display: grid;
  place-items: center;
`;

export const FilterBarItem = styled.div<{ hidden: boolean }>`
  display: ${({ hidden }) => hidden ? 'none' : 'grid'};
  width: 100%;
`;

export const SearchResultContainer = styled.div`
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
