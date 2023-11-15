import styled from "styled-components";



export const ContractInnerContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  input {
    margin: 1rem;
  }
`;

export const ContractMask = styled.div<{ opened: boolean }>`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: .5rem;
  border-radius: 5px;
  box-shadow: ${({ opened }) => opened ? ' 2px 0 5px #0005;' : 'none'};
  
   
`;

export const ContractDetailHeader = styled.div`
 display: flex;
  flex-direction: row;
  align-items: center;

  span {
    padding: 5px 20px;
    background-color: #fa8b08;
    font-size: 0.8em;
    color: #fff;
    border-radius: 50px;
  }

  h3 {
    padding-left: 10px;
    margin: 0;
  }
`;

export const ContractHiddenDetail = styled.div<{ opened: boolean }>`
  width: 100%;
  display: ${({ opened }) => opened ? 'flex' : 'none'};
  justify-content: space-evenly;
  flex-wrap: wrap;
  
  div:last-of-type {
    min-width: 75%;
  }
`;

export const ContractHiddenDetailItem = styled.div`
    max-width: 50%;
    margin: 1rem 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    
    span:first-of-type{
        opacity: .75;
    }
`;

export const ContractCard = styled.div`
  display: flex;
  flex-direction: row;
  width: 80%;
  height: fit-content;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  align-items: center;
  margin: 10px 0;
  padding: 0 .5rem;
  
  &:hover{
    ${ContractMask} {
      background-color: #0001;
    }
  }
`;