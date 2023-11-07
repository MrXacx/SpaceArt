import styled from "styled-components";

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

export const SearchArtistInputContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
`;

export const SearchArtistInput = styled.input`
  width: 77%;
  height: 56px;
  border-radius: 5px 0 0 5px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-right: 0;
  padding-left: 20px;

  &::placeholder {
    font-size: 16px;
    font-weight: 600;
  }

  &:focus {
    border: 1px solid #fa8b08;
    outline: none;
  }
`;

export const SearchArtistButton = styled.button`
  height: 60px;
  width: 100px;
  background-color: #fa8b08;
  border-radius: 0 5px 5px 0;
  border: none;
  cursor: pointer;

  img {
    width: 20px;
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
