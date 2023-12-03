import styled from "styled-components";

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
  height: 7rem;
  background-color: rgba(255, 255, 255, 0.9);
  box-sizing: border-box;
  display: flex;
  align-items: center;
  backdrop-filter: blur(8px) saturate(1.2);
  box-shadow: 0 1px 15px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  justify-content: space-between;

  @media (max-width: 960px) {
    padding: 0 2rem;
    justify-content: space-between;
  }
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
    font-size : 2.5rem;
  }
`;

export const SpaceartLogo = styled.img`
  width: 2.5rem;
  margin-right: 1rem;
`;

export const NavItemContainer = styled.ul`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 2rem;
  margin: 0 0.5rem;
`;

export const NavContainer = styled.nav`
  display: none;

  @media (min-width: 960px) {
    display: flex;
    flex-direction: row;
  }
`;

export const NavItems = styled.li`
  list-style: none;
  color: #000;
  cursor: pointer;
  font-weight: 500;
  text-decoration: none;
  white-space: nowrap;
  justify-self: center;
  align-self: center;
  font-size: 1rem;

  @media (min-width: 960px) {
    font-size: 19px;
  }
`;

export const SignUpButton = styled.button`
  width: 150px;
  height: 40px;
  background-color: #ff6600;
  color: #fff;
  padding: 8px 10px;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.3s;
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  border: none;
  transition: 0.3s;

  @media (min-width: 960px) {
    &:hover {
      background-color: #f47c2e;
    }
  }
`;

export const Icon = styled.img`
  display: none;

  @media (max-width: 960px) {
    display: block;
  }
`;

export const HamburgerMenuContainer = styled.div<{ hide?: boolean }>`
  width: 100%;
  display: ${({ hide }) => (hide ? "none" : "flex")};
  flex-direction: column;
  justify-content: center;

  span {
    padding: 0.5rem 0;
    text-align: center;
    color: #fff;
    text-transform: uppercase;

    &:nth-of-type(3) {
      background-color: #ff6600;
      color: #fff;
    }
  }
`;
