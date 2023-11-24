import styled from "styled-components";
import EclipseImage from "../../assets/eclipse.jpg";

export const MainSignInContainer = styled.div`
  display: grid;
  min-height: 100vh;
  background-image: url(${EclipseImage});
  background-position: 50% 45%;
  background-size: 98%;
`;

export const InnerContainer = styled.div`
  justify-self: center;
  align-self: center;
`;

export const HeaderLogo = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1.5rem;

  img {
    max-width: 80px;
    margin-bottom: 0.8rem;
  }

  h1 {
    font-size: 1.7em;
    color: #fff;
  }
`;

export const SignContainer = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-wrap: wrap;
  width: 18vw;
  margin: 0 auto;
`;

export const FormInputErrorMessage = styled.span<{ hidden: boolean }>`
  width: 100%;
  display: ${(hidden) => hidden ? 'none' : 'inline'};
  color: white;
  font-size: .75rem;
  text-align: center;
  margin: .75rem 0;
`;

export const FormInputFullField = styled.input`
  width: 100%;
  height: 25px;
  padding: 0.5rem;
  border-radius: 3px;
  margin: 0.5rem 0;
  color: #fff;
  background-color: transparent;
  border: 1px solid #fff;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: #fff;
  }

  &:disabled {
    background-color: rgb(210, 210, 210);
  }
  
`;

export const FormInputButton = styled.button`
  width: 100%;
  background-color: #ff8311;
  padding: 0.5rem;
  border-radius: 3px;
  border: none;
  color: #fff;
  font-weight: 700;
  text-transform: uppercase;
  margin-top: 1.5rem;
  cursor: pointer;

  &::placeholder {
    color: #000;
  }

  &:disabled {
    background-color: rgb(210, 210, 210);
  }
`;
