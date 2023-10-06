import styled from "styled-components";

export const FooterContainer = styled.footer`
  margin-top: 2.5rem;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background-color: #000;
  padding: 1rem 0;

  hr {
    width: 95%;
    margin: 1.2rem 0;
    border: 1px solid #fff;
    opacity: 45%;
  }
`;

export const FirstRowContainer = styled.div`
  width: 75%;
  display: flex;
  align-items: center;
  align-items: center;
  margin: 0 1.5rem;

  &:only-child {
    margin: auto 1rem;
  }
`;

export const Message = styled.span`
  font-size: 14px;
`;

export const SocialMediaContainer = styled.div`
  img {
    margin: 0 0.5rem;
  }
`;

export const SecondRowContainer = styled.div`
  width: 75%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;
