import styled from "styled-components";

export const CardProfileContent = styled.div`
  width: 300px;
  border-radius: 20% 20px 20px 20px;
  box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;

  > img {
    width: inherit;
    max-height: 200px;
    height: 200px;
  object-fit: cover;
  border-radius: 20px 20px 0 0;
  }
`;

export const CardProfileDetail = styled.div`
  width: 100%;
  flex: 1;
  border-radius: 5px;
  margin-top: -20px;
  padding: 10px 0;
  background-color: white;
  color: #000;;
  box-shadow: 0px -25px 10px 0px rgba(0, 0, 0, 0.5);
  
  div {
    &:first-of-type {
      display: flex;
      justify-content: space-around;
      align-items: center;

      span {
        font-size: 1.3em;
        font-weight: 600;

        &:last-of-type {
          padding: 5px 20px;
          background-color: #fa8b08;
          font-size: 0.8em;
          color: #fff;
          border-radius: 50px;
        }
      }
    }
  }
`;

export const UserCardDetailContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 0 0 15px;

  &:last-of-type {
    padding: 10px 0 15px 15px;
  }

  span {
    font-size: 1em;
    font-weight: 600;
    color: #000;
  }

  img {
    width: 25px;
    padding: 0 15px 0 0;
  }
`;
