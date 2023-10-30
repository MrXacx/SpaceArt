import styled from "styled-components";

export const Icon = styled.img`
<<<<<<< HEAD
<<<<<<< HEAD
  min-width: 20px;
  min-height: 20px;
  max-width: 20px;
  max-height: 20px;
  padding: .7rem;
  border-radius: 5px;
  &:hover {
    background-color: #f0f0f0;
  }
=======
  max-width: 23px;
  max-height: 23px;
  padding-right: 20px;
>>>>>>> 33f828e (feed typescript)
=======
  max-width: 23px;
  max-height: 23px;
  padding-right: 20px;
>>>>>>> react
`;

export const HeaderContainer = styled.header`
  width: 100%;
  height: 100px;
  background-color: rgba(255, 255, 255, 0.96);
  padding: 0 32px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  backdrop-filter: blur(8px) saturate(1.2);
  box-shadow: 0 1px 15px rgba(0, 0, 0, 0.1);
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
<<<<<<< HEAD
<<<<<<< HEAD
  cursor: pointer;
=======
>>>>>>> 33f828e (feed typescript)
=======
>>>>>>> react
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

export const NavItems = styled.li`
  list-style: none;
  color: #fff;
  cursor: pointer;
  font-size: 19px;
  font-weight: 500;
  text-decoration: none;
  padding-right: 30px;
  white-space: nowrap;
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
`;

export const ProfilePicture = styled.img`
  border-radius: 50px;
  min-height: 40px;
  min-width: 40px;
  max-height: 40px;
  max-width: 40px;
`;
