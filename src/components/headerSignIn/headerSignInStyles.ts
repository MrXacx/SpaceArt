import styled from "styled-components";

export const HeaderContainer = styled.header`
  width: 100%;
  height: 7rem;
  background-color: #050300;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 1) 0%,
    rgba(5, 3, 0, 1) 23%,
    rgba(25, 7, 3, 0.9719537473192402) 90%
  );
<<<<<<< HEAD
=======

>>>>>>> main
  padding: 1rem;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;

  @media (min-width: 960px) {
    justify-content: space-between;
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
<<<<<<< HEAD

  span:first-of-type {
    color: #fa8b08;
  }

=======
  span:first-of-type {
    color: #fa8b08;
  }
>>>>>>> main
  span {
    color: #fff;
    white-space: nowrap;
    font-size: 2rem;
<<<<<<< HEAD

=======
>>>>>>> main
    @media (min-width: 960px) {
      font-size: 4rem;
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
  place-items: center;
  column-gap: 2rem;
  margin: 0 0.5rem;
`;

export const NavContainer = styled.nav`
<<<<<<< HEAD
  display: flex;
  flex-direction: row;
  justify-content: right;
=======
  display: none;
  @media (min-width: 960px) {
    display: flex;
    flex-direction: row;
    justify-content: right;
  }
>>>>>>> main
`;

export const NavItems = styled.li`
  list-style: none;
  color: #fff;
  cursor: pointer;
  font-weight: 500;
  text-decoration: none;
  white-space: nowrap;
  font-size: 1rem;
<<<<<<< HEAD

=======
>>>>>>> main
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
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  border: none;
  transition: 0.3s;
<<<<<<< HEAD

=======
>>>>>>> main
  @media (min-width: 960px) {
    &:hover {
      background-color: #f47c2e;
    }
  }
`;
