import styled from "styled-components";

export const MainSignInContainer = styled.div`
  display: grid;
  min-height: 100vh;
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

export const FormInputErrorMessage = styled.span<{visibility: string}>`
  width: 100%;
  display: ${visibility => new Boolean(visibility) ? 'inline' : 'none'};
  color: white;
  font-size: 1rem;
  text-align: center;
  margin: .5rem 0;
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
  width: 35.3%;
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
