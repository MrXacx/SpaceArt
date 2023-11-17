import styled from "styled-components";

export const Modal = styled.div<{ hidden?: boolean }>`
  visibility: ${({ hidden }) => hidden ? 'hidden' : 'visible'};
  width: 100vw;
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

export const ModalContainer = styled.div`
  display: flex;
  width: 50vw;
  height: 70vh;
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
  display: flex;
  flex-wrap: wrap;
  width: 50vw;
  margin: 0 auto;
  max-height: 50vh;
  overflow: hidden scroll;
`;

export const ProfileInformationContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  ${Icon} {
    &:last-child {
      padding-right: 25px;
    }
  }
`;

export const ArtistSelected = styled.div`
  display: flex;
  flex-direction: row;
  width: 77%;
  height: 100px;
  border-radius: 10px;
  border: 1px solid #000;
  align-items: center;
`;

export const ProfileImage = styled.img`
  object-fit: cover;
  max-width: 100px;
  max-height: 100px;
  border-radius: 10px;
`;

export const ProfileInnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 15px;
`;

export const ProfileDetail = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;

  span {
    padding: 5px 20px;
    background-color: #fa8b08;
    font-size: 0.8em;
    color: #fff;
    border-radius: 50px;
  }

  h3 {
    padding-right: 10px;
    margin: 0;
  }
`;

export const LocalContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  ${Icon} {
    cursor: default;
    margin-left: -5px;
  }

  span {
    :last-of-type {
      padding: 5px 20px;
      background-color: #fa8b08;
      font-size: 0.8em;
      color: #fff;
      border-radius: 50px;
    }
  }
`;

export const ArtistInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

