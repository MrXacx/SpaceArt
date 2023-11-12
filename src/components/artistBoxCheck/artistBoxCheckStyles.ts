import styled from "styled-components";

export const Icon = styled.img`
  cursor: pointer;
`;

export const ArtistSelected = styled.div`
  display: flex;
  flex-direction: row;
  width: 98%;
  height: 10vh;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-left: none;
  align-items: center;
  margin: 10px auto;
`;

export const ProfileImage = styled.img`
  object-fit: cover;
  max-width: 10vw;
  max-height: 10vh;
  border-radius: 10px 0 0 10px;
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
  margin-bottom: 10px;

  span {
    padding: 5px 20px;
    background-color: #fa8b08;
    font-size: 0.8em;
    color: #fff;
    border-radius: 50px;
  }

  h3 {
    padding-right: 10px;
    margin: 0;
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

export const ProfileInformationContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  input {
    margin: 25px;
  }
`;
