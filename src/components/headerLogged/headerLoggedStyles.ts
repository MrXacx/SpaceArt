import styled from "styled-components";

export const Icon = styled.img`
  width: 1rem;
  height: 1rem;
  padding: 0.7rem;
  border-radius: 5px;
  &:hover {
    background-color: #f0f0f0;
  }
`;

export const HeaderMainContainer = styled.div`
  position: fixed;
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  top: 0;
`;

export const HeaderContainer = styled.header`
  width: 100%;
  height: 5.25rem;
  background-color: rgba(255, 255, 255, 0.96);
  padding: 1rem;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  backdrop-filter: blur(8px) saturate(1.2);
  box-shadow: 0 1px 15px rgba(0, 0, 0, 0.1);
`;

export const SpaceartContainer = styled.div`
  display: flex;
  flex-direction: row;
  cursor: pointer;
`;

export const SpaceartTitle = styled.span`
  margin: auto 0;
  font-size: 2.25rem;
  color: #000;
  white-space: nowrap;

  span {
    color: #fa8b08;
  }

  @media (min-width: 960px) {
    font-size: 2.5rem;
  }
`;

export const SpaceartLogo = styled.img`
  width: 2.5rem;
  margin-right: 1rem;
`;

export const NavContainer = styled.nav`
  display: flex;
  align-items: center;
  flex-direction: row;

  ${Icon} {
    display: none;

    &:last-of-type {
      display: flex;
    }

    @media (min-width: 960px) {
      display: flex;
      &:last-of-type {
        display: none;
      }
    }
  }
`;

export const FloatingButton = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  padding: 1rem;
  border-radius: 50%;
  position: fixed;
  right: 20px;
  bottom: 50px;
  box-shadow: 0 0 80px #000;
  background-color: #ff6600;

  @media (min-width: 960px) {
    display: none;
  }
`;

export const ProfilePicture = styled.div`
  max-width: 40px;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  overflow: hidden;

  img {
    height: 40px;
    width: inherit;
  }
`;

export const HamburgerMenuContainer = styled.div<{ hide?: boolean }>`
  width: 100%;
  display: ${({ hide }) => (hide ? "none" : "flex")};
  flex-direction: column;
  justify-content: center;
  background-color: #fff;

  span {
    padding: 0.5rem 0;
    text-align: center;
    cursor: pointer;
    transition: 200ms;
    border-bottom: 1px solid #0002;

    &:hover {
      background-color: #ff6600;
      border: none;
      color: #fff;
    }
  }
`;
