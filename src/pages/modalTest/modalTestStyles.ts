import styled from "styled-components";

<<<<<<< HEAD
<<<<<<< HEAD
export const Icon = styled.img`
  
`;

=======
>>>>>>> 33f828e (feed typescript)
=======
>>>>>>> react
export const ModalButton = styled.button`
  padding: 0.6rem 1.2rem;
  color: #fff;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  opacity: 0.9;
  font-size: 1rem;
  background-color: #007bff;
`;
<<<<<<< HEAD
<<<<<<< HEAD

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
  height: 70vh;
  background-color: white;
  border-radius: 6px;
  display: flex;
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
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    max-width: 50px;
    margin-bottom: 0.8rem;
  }

  h1 {
    font-size: 1.7em;
  }
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
=======
>>>>>>> 33f828e (feed typescript)
=======
>>>>>>> react
