import styled from "styled-components";

export const Icon = styled.img`
  cursor: pointer;
`;

export const ArtistSelected = styled.div`
  display: flex;
  flex-direction: row;
  width: 99%;
  height: 10vh;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-left: none;
  align-items: center;
  margin: 10px auto;
`;

export const ProfileImage = styled.img`
  object-fit: cover;
  max-width: 15vw;
  height: 100%;
  border-radius: 10px 0 0 10px;
`;

export const ProfileInnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 100%;
  padding-left: 15px;
`;

export const ProfileDetail = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;

  span {
    padding: 0.25rem 1rem;
    background-color: #fa8b08;
    color: #fff;
    border-radius: 50px;
    font-size: 0.65rem;

    @media (min-width: 960px) {
      font-size: 0.7rem;
    }
  }

  h3 {
    padding-right: 10px;
    margin: 0;
    font-size: 1rem;
  }
`;

export const LocalContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  ${Icon} {
    cursor: default;
    margin-left: -5px;
    height: 1.25rem;
  }

  span {
    font-size: 0.65rem;
    @media (min-width: 960px) {
      font-size: 0.7rem;
    }
  }
`;

export const ArtistInfo = styled.div`
  display: flex;
  flex-direction: column;
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

export const FormInputTextbox = styled.textarea`
  width: 97%;
  max-width: 97%;
  height: 100px;
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

export const SignContainer = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  margin: 0 auto;
  max-height: 50vh;
  overflow: hidden scroll;

  @media (min-width: 768px) {
    width: 50vw;
  }
`;