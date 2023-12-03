import styled from "styled-components";

export const FeedContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  box-sizing: border-box;
  margin: 3rem 0;
  
  row-gap: 25px;
  @media (min-width: 960px) {
    row-gap: 35px;
  }
`;

export const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 20px;
  width: 90%;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .2);

  @media (min-width: 768px) {
    background-color: #fff;
    border-radius: 20px;
    width: 500px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
    
  }
`;

export const ProfileContainer = styled.div`
  display: flex;
  align-items: center;

  img {
    max-width: 45px;
    padding-right: 10px;
    border-radius: 50%;
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

export const TextContentContainer = styled.p`
  font-size: 0.8rem 0;
`;

export const ProfilePostImage = styled.div`
  width: 100%;
  max-height: 300px;
  align-self: end;
  display: flex;
  justify-content: center;
  overflow: hidden;

  img {
    width: 100%;
    border-radius: 5px;
  }
`;
