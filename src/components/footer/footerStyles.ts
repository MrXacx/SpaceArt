import styled from "styled-components";

export const FooterContainer = styled.footer`
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background-color: #000;
  padding: 1rem 0;

  hr {
    width: 65%;
    margin: 1.2rem 0;
    border: 1px solid #fff;
    opacity: 45%;
  }
`;

export const FirstRowContainer = styled.div`
  width: 65%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 1.5rem;

  &:only-child {
    margin: auto 1rem;
  }
`;

export const Message = styled.span`
  font-size: 14px;
`;

export const SocialMediaContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 20px;
    margin: 0 0.5rem;
  }
`;

export const SecondRowContainer = styled.div`
  width: 87%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  section {
    padding-right: 1.5rem;
    align-self: flex-start;
    justify-self: center;
  }
`;

export const FooterTitle = styled.span`
  color: #ff8311;
  font-weight: 800;
  font-size: 17px;
  margin: 1.5rem 0;
`;

export const ArtTypeContainer = styled.ul`
  display: grid;
  list-style: none;
  color: #fff;
  padding: 0;
`;

export const ArtTypeItem = styled.li`
  padding: 0.3rem;
  font-size: 14px;
`;
