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
  height: 5.25rem;
  background-color: transparent;
  padding: 1rem;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const SpaceartContainer = styled.div`
  display: flex;
  flex-direction: row;
  cursor: pointer;
`;

export const SpaceartTitle = styled.span`
  margin: auto 0;
  font-size: 2.25rem;
  color: #fff;
  white-space: nowrap;
  filter: brightness(0.7);

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
  flex-direction: row;
  justify-content: right;
`;

export const NavItems = styled.span`
  color: #fff;
  cursor: pointer;
  font-weight: 500;
  text-decoration: none;
  white-space: nowrap;
  font-size: 1rem;

  &:first-of-type {
    display: none;
  }
  &:last-of-type {
    display: block;
  }

  @media (min-width: 960px) {
    &:first-of-type {
      display: block;
    }
    &:last-of-type {
      display: none;
    }
    font-size: 1rem;
  }
`;

export const HamburgerMenuContainer = styled.div<{ hide?: boolean }>`
  width: 100%;
  display: ${({ hide }) => (hide ? "none" : "flex")};
  flex-direction: column;
  justify-content: center;
  background-color: transparent;

  span {
    padding: 0.5rem 0;
    text-align: center;
    background-color: #050300;
    color: #fff;

    &:hover {

    }
  }
`;

export const Icon = styled.img`
  width: 1rem;
  height: 1rem;
  padding: 0.7rem;
  border-radius: 5px;
`;
