import styled from "styled-components";

export const MainSignUpContainer = styled.div`
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
  flex-wrap: wrap;
  width: 50vw;
  margin: 0 auto;
`;

export const FormInputErrorMessage = styled.span<{ hidden: string }>`
  width: 90%;
  display: ${c => JSON.parse(c.hidden) ?  'none' : 'inline'};
  color: black;
  font-size: 1rem;
  text-align: center;
  margin: .5rem 0;
`;

export const FormInputFullField = styled.input`
  width: 46vw;
  height: 3vh;
  padding: 0.5rem;
  border-radius: 3px;
  margin: 0.5rem 0;
  border: 1px solid #545454;

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

export const FormInputHalfField = styled.input`
  width: 22.2vw;
  height: 3vh;
  padding: 0.5rem;
  border-radius: 3px;
  margin: 0.5rem 0.5rem;
  border: 1px solid #545454;

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
  width: 47vw;
  height: 5vh;
  padding: 0.5rem;
  border-radius: 3px;
  margin: 0.5rem 0;
  border: 1px solid #545454;
  transition: 300ms;
  background-color: #fff;

  option {
    text-transform: capitalize;
  }

`;

export const FormInputButton = styled.button`
  width: 46vw;
  height: 5vh;
  background-color: #ff8311;
  padding: 0.5rem;
  border-radius: 3px;
  border: none;
  box-shadow: 0 1px 4px #000;
  color: #fff;
  font-weight: 700;
  text-transform: uppercase;
  margin-top: 1.5rem;
`;
