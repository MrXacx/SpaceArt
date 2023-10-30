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
<<<<<<< HEAD
  width: 18vw;
  margin: 0 auto;
`;

export const FormInputErrorMessage = styled.span<{visibility: string}>`
  width: 100%;
  display: ${(visibility) => new Boolean(visibility) ? 'inline' : 'none'};
  color: white;
  font-size: .75rem;
  text-align: center;
  margin: .75rem 0;
`


export const FormInputFullField = styled.input`
  width: 100%;
=======
  width: 20vw;
  margin: 0 auto;
`;

export const FormInputErrorMessage = styled.span<{visibility?: boolean}>`
  display: ${visibility => visibility ? 'inline' : 'none'};
  color: "red";
`

export const FormInputFullField = styled.input<{isWrong?: boolean}>`
  width: 75%;
>>>>>>> 33f828e (feed typescript)
  height: 25px;
  padding: 0.5rem;
  border-radius: 3px;
  background-color: transparent;
  margin: 0.5rem 0;
<<<<<<< HEAD
  border: 1px solid #545454;
  transition: 300ms;
  color: #fff;

=======
  border: 1px solid ${({ isWrong }) => isWrong === true ? "red" : "#545454"};
  transition: 300ms;
>>>>>>> 33f828e (feed typescript)

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
    color: #fff;
<<<<<<< HEAD
    font-weight: 500;
=======
    font-weight: 600;
>>>>>>> 33f828e (feed typescript)
    font-size: 18px;
  }

  &:disabled {
    background-color: rgb(182, 182, 182);
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

  &::placeholder {
    color: #000;
  }

  &:disabled {
    background-color: rgb(182, 182, 182);
  }
`;
