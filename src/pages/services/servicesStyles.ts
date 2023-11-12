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
`;

export const ServicesContainer = styled.div`
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

  img {
    width: 25px;
    cursor: pointer;
  }

  span {
    font-weight: 600;
  }
`;

export const Modal = styled.div<{ hideModal?: boolean }>`
  visibility: ${({ hideModal }) => (hideModal ? "hidden" : "visible")};
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.55);
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 5;
  display: flex;
  align-items: center;
  justify-content: center;
`;