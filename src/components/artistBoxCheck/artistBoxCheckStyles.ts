import styled from "styled-components";

export const Icon = styled.img`
  cursor: pointer;
`;

export const ArtistSelected = styled.div<{ selected: boolean }>`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 10vh;
  border-radius: 10px;
  border: ${({ selected }) =>
    selected ? "1px solid rgba(0, 0, 0, 0)" : "1px solid rgba(0, 0, 0, 0.3)"};
  border-left: none;
  align-items: center;
  margin: 10px auto;
  transition: 300ms;
  cursor: pointer;
  background-color: ${({ selected }) => (selected ? "#fa8b08" : "#fff")};
  color: ${({ selected }) => (selected ? "#fff" : "#000")};

  > div > div:last-of-type {
    display: ${({ selected }) => (selected ? "none" : "flex")};
  }
`;

export const ProfileImage = styled.img`
  object-fit: cover;
  max-width: 15vw;
  height: 100%;
  border-radius: 10px 0 0 10px;
`;

export const ProfileDetail = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

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
  flex-direction: column;
  justify-content: space-evenly;
  height: 100%;
  padding-left: 15px;
`;
