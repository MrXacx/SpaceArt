import styled from "styled-components";

export const FeedContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  row-gap: 35px;
  box-sizing: border-box;
  margin-top: 20vh;
`;

export const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  padding: 20px;
  width: 500px;
  height: 600px;
  margin: 0 auto;
  background-color: #fff;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2)
`;

export const ProfileContainer = styled.div`
  display: flex;
  align-items: center;

  img {
    max-width: 45px;
    padding-right: 10px;
  }

  div {
    width: 100%;
    display: flex;
    justify-content: space-between;

    span {
      font-size: 1rem;

      &:first-of-type {
        font-weight: 600;
      }
    }
  }
`;

export const TextContentContainer = styled.div`
  p {
    font-size: 1rem;
  }
`;

export const ProfilePostImage = styled.img`
  width: 100%;
  align-self: end;
`;
