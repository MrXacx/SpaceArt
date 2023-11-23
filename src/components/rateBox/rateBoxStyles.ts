import styled from "styled-components";

export const RateCard = styled.div`
  display: flex;
  flex-direction: row;
  width: 80%;
  height: fit-content;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  align-items: center;
  margin: 10px 0;
  padding: 0 0.5rem;
`;

export const RateInnerContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const AuthorDetails = styled.div`
  width: 100%;
  padding: 0.5rem 0;
  display: flex;
  align-items: center;

  img {
    max-width: 10vw;
    height: 7vh;
    overflow: hidden;
    border-radius: 50%;
    margin-right: 0.5rem;
  }

  @media (min-width: 768px) {
    img {
      max-width: 6vw;
    }
  }

  @media (min-width: 960px) {
    img {
      max-width: 5vw;
    }
  }
`;
export const RateValueContainer = styled.div`
  display: flex;
  align-items: center;

  img {
    height: 1rem;
    margin-right: 0.5rem;
  }
  span {
    font-weight: 300;
  }

  @media (min-width: 768px) {
    img {
      height: 1.15rem;
      margin-right: 0.5rem;
    }
  }
`;
export const RateMessageContainer = styled.p`
  text-align: justify;
  padding: 0 0.25rem;
`;
