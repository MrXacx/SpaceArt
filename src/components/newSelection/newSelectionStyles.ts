import styled from "styled-components";

export const Modal = styled.div<{ hidden?: boolean }>`
  visibility: ${({hidden}) => hidden ? 'hidden' : 'visible'};
  width: 100vw;
  height: 70vh;
  max-height: 70vh;
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
  box-sizing: border-box;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
`;

export const MainSignUpContainer = styled.div`
  display: grid;
  min-height: 70vh;
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

export const FormInputFullField = styled.input`
  width: 75%;
  height: 25px;
  padding: 0.5rem;
  border-radius: 3px;
  margin: 0.5rem 0;
  border: 1px solid #545454;
  transition: 300ms;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: #000;
  }

  &:disabled {
    background-color: rgb(210, 210, 210);
  }
`;

export const FormSelectField = styled.select`
  width: 75%;
  height: 25px;
  padding: 0.5rem;
  border-radius: 3px;
  margin: 0.5rem 0;
  border: 1px solid #545454;
  transition: 300ms;
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
    outline: none;
  }

  &::placeholder {
    color: #000;
  }

  &:disabled {
    background-color: rgb(210, 210, 210);
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
    background-color: rgb(210, 210, 210);
  }
`;

export const FormInputErrorMessage = styled.span<{ hidden: boolean }>`
  width: 90%;
  display: ${({hidden}) => hidden ? "none" : "inline"};
  color: black;
  font-size: 1rem;
  text-align: center;
  margin: .5rem 0;
`;
