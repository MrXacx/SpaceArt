import styled from "styled-components";

export const Modal = styled.div<{ hidden?: boolean }>`
  visibility: ${({ hidden }) => hidden ? 'hidden' : 'visible'};
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

export const ModalContainer = styled.div`
  display: flex;
  width: 50vw;
  min-height: 70vh;
  background-color: white;
  border-radius: 6px;
  flex-direction: column;
  padding: 50px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
`;

export const MainSignUpContainer = styled.div`
  display: grid;
  min-height: 80vh;
`;

export const InnerContainer = styled.div`
  justify-self: center;
  align-self: center;
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

export const SignContainer = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  width: 50vw;
  margin: 0 auto;
`;

export const ArtistInfo = styled.div`
  display: flex;
  flex-direction: column;
`;
