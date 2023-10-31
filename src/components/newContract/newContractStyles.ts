import styled from "styled-components";

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

export const ModalContainer = styled.div`
  width: 50vw;
  min-height: 70vh;
  background-color: white;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  padding: 50px;

  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
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
`;

export const ArtistSelected = styled.div`
  display: flex;
  flex-direction: row;
  width: 77%;
  height: 100px;
  border-radius: 10px;
  border: 1px solid #000;
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

  span {
    padding: 5px 20px;
    background-color: #fa8b08;
    font-size: 0.8em;
    color: #fff;
    border-radius: 50px;
  }

  h3 {
    padding-right: 10px;
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

export const FormInputTextbox = styled.input`
  width: 75%;
  height: 100px;
  padding: 0.5rem;
  border-radius: 3px;
  margin: 0.5rem 0;
  border: 1px solid #545454;
  transition: 300ms;

  &:focus {
    padding: 0.5rem;
    border-radius: 3px;
    margin: 0.5rem 0;
    border: 1px solid #545454;
    transition: 300ms;
    outline: none;
    transform: scale(1.03);
  }

  &::placeholder {
    color: #000;
  }

  &:disabled {
    background-color: rgb(182, 182, 182);
  }
`;

export const FormInputFullField = styled.input`
  width: 75%;
  height: 25px;
  padding: 0.5rem;
  border-radius: 3px;
  margin: 0.5rem 0;
  border: 1px solid #545454;
  transition: 300ms;

  &:focus {
    padding: 0.5rem;
    border-radius: 3px;
    margin: 0.5rem 0;
    border: 1px solid #545454;
    transition: 300ms;
    outline: none;
    transform: scale(1.03);
  }

  &::placeholder {
    color: #000;
  }

  &:disabled {
    background-color: rgb(182, 182, 182);
  }
`;

export const FormInputHalfField = styled.input`
  width: 35.7%;
  height: 25px;
  padding: 0.5rem;
  border-radius: 3px;
  margin: 0.5rem 0.5rem;
  border: 1px solid #545454;
  transition: 300ms;

  &:focus {
    padding: 0.5rem;
    border-radius: 3px;
    margin: 0.5rem 0;
    border: 1px solid #545454;
    transition: 300ms;
    outline: none;
    transform: scale(1.03);
  }

  &::placeholder {
    color: #000;
  }

  &:disabled {
    background-color: rgb(182, 182, 182);
  }
`;

export const FormInputButton = styled.button`
  width: 77%;
  background-color: #ff8311;
  padding: 0.5rem;
  border-radius: 3px;
  border: none;
  box-shadow: 0 1px 4px #000;
  color: #fff;
  font-weight: 700;
  text-transform: uppercase;
  margin-top: 1.5rem;

  &::placeholder {
    color: #000;
  }

  &:disabled {
    background-color: rgb(182, 182, 182);
  }
`;
