import styled from "styled-components";

export const MainContainer = styled.div`
  display: flex;
  align-items: center;
  min-height: 80vh;
  background: #fff;
`;

export const BoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const ConfigContainer = styled.div`
  width: 80%;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  box-shadow: 0 0 7px #00000040;
  margin: 1rem auto;

  @media (min-width: 768px) {
    width: 70%;
  }
  @media (min-width: 960px) {
    width: 40%;
  }
`;

export const ArrowContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0.3rem 0.5rem;
  cursor: pointer;
  transition: 100ms;

  img {
    width: 25px;
  }

  span {
    font-weight: 600;
  }

  @media (min-width: 960px) {
    &:hover {
      background-color: #f0f0f0;
    }
  }
`;
