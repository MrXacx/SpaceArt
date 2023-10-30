import styled from "styled-components";

export const HeaderContainer = styled.header`
  width: 100%;
  height: 100px;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 0 2rem;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  backdrop-filter: blur(8px) saturate(1.2);
  box-shadow: 0 1px 15px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;

  @media (max-width: 393px) {
    padding: 1rem;
    justify-content: center;
  }
`;

export const SpaceartContainer = styled.div`
  display: flex;
  flex-direction: row;
  cursor: pointer;
`;

export const SpaceartTitle = styled.div`
  display: flex;
  align-items: center;
  span:first-of-type {
    color: #fa8b08;
  }
  span {
    font-size: 4rem;
    color: #000;
    white-space: nowrap;
    @media (max-width: 393px) {
      font-size: 2rem;
    }
  }
`;

export const SpaceartLogo = styled.img`
  width: 2.5rem;
  margin-right: 0.5rem;
`;

export const NavItemContainer = styled.ul`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 2rem;
  margin: 0 0.5rem;
`;

export const NavContainer = styled.nav`
  display: flex;
  flex-direction: row;

  @media (max-width: 393px) {
    display: none;
  }
`;

export const NavItems = styled.li`
  list-style: none;
  color: #000;
  cursor: pointer;
  font-size: 19px;
  font-weight: 500;
  text-decoration: none;
  white-space: nowrap;
  justify-self: center;
  align-self: center;

  @media (max-width: 393px) {
    font-size: 1rem;
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

  :hover {
    background-color: #f47c2e;
  }

  @media (max-width: 393px) {
    display: none;
  }
`;
