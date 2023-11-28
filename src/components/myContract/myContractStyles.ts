import styled from "styled-components";

export const Modal = styled.div<{ hidden?: boolean }>`
  visibility: ${({ hidden }) => (hidden ? "hidden" : "visible")};
  width: 100%;
  height: 100%;
  overflow: hidden scroll;
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

export const ModalContainer = styled.div<{ hidden: boolean }>`
  display: ${({ hidden }) => (hidden ? "none" : "flex")};
  width: 72%;
  height: 70vh;
  background-color: white;
  border-radius: 6px;
  flex-direction: column;
  padding: 50px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  @media (min-width: 768px) {
    width: 50vw;
  }
`;

export const HeaderLogo = styled.header`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    align-items: flex-end;
    max-width: 10px;
    padding-right: 50px;
    margin: 0 0 0 auto;
  }

  h1 {
    font-size: 1.7em;
  }
`;

export const Icon = styled.img`
  cursor: pointer;
`;

export const SignContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  margin: 0 auto;
  max-height: 50vh;
  overflow: hidden scroll;

  @media (min-width: 768px) {
    width: 50vw;
  }
`;

export const SearchResults = styled.div`
  width: 90%;
  height: 45vh;
  max-height: 45vh;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
