import styled from "styled-components";

export const Icon = styled.img`
  cursor: pointer;
`;

export const ArtistSelected = styled.div`
  display: flex;
  flex-direction: row;
  width: 77%;
  height: 100px;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  align-items: center;
  margin: 10px 0;
`;

export const ProfileInnerContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 15px;

  input {
    margin: 25px;
  }
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
    padding-left: 10px;
    margin: 0;
  }
`;
