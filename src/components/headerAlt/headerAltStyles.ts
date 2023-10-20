import styled from "styled-components";

export const HeaderContainer = styled.header`
  width: 100%;
  height: 100px;
  background-color: #fff;
  padding: 0 32px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  backdrop-filter: blur(8px) saturate(1.2);
  box-shadow: 0 1px 30px #f0f0f0;
  position: fixed;
  top: 0;

  span:first-of-type {
    font-size: 50px;
    color: #fa8b08;
    padding-left: 20px;
    white-space: nowrap;
  }

  span {
    font-size: 50px;
    color: #000;
    white-space: nowrap;
  }
`;

export const SpaceartContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const SpaceartTitle = styled.div``;

export const SpaceartLogo = styled.img`
  width: 50px;
`;

export const NavItemContainer = styled.ul`
  width: 100%;
  display: flex;
  align-items: center;
`;

export const NavContainer = styled.nav`
  display: flex;
  flex-direction: row;
`;

export const NavItems = styled.li<{ visibility?: string }>`
  list-style: none;
  color: #000;
  cursor: pointer;
  font-size: 19px;
  font-weight: 500;
  text-decoration: none;
  padding-right: 30px;
  white-space: nowrap;
  visibility: ${({ visibility }) => visibility ? visibility : "visible"};
`;

export const SignUpButton = styled.button<{ visibility?: string }>`
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
  visibility: ${({ visibility }) => visibility ? visibility : "visible"};

  :hover {
    background-color: #f47c2e;
  }
`;
