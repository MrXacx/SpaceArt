import styled from "styled-components";

export const MainContainer = styled.div`
  display: flex;
  align-items: center;
  min-height: 100vh;
  background: #fff;
  `;

export const BoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 20vh;
`;

export const ConfigContainer = styled.div`
  width: 100%;
  max-width: 40%;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-shadow: 0 0 7px #00000040;
  margin: 0 auto 20px;
`;

export const ArrowContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: .3rem 0;

  img {
    width: 25px;
    cursor: pointer;
  }

  span {
    font-weight: 600;
  }
`;
