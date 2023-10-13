import styled, { createGlobalStyle } from "styled-components";

/*
:root {
    --pure-black: #000;
    --black: #202020;
    --orange: #ff8311;
    --light-black: #00000080;
    --pure-white: #fff;
    --white: #f5f5f5;
  }
*/
export const ProfileGlobalStyle = createGlobalStyle`
  ul, ol {
    list-style-type: none;
    padding: 0;
  }
`;

export const ProfileHeader = styled.header`
  background-color: #000;
  color: #fff;
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 2rem 1rem;
`;

export const ProfileContent = styled.div`
  display: flex;
  justify-content: flex-start;
`;

export const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  justify-self: center;
  align-self: center;

  span {
    font-size: 22px;
    text-align: center;
    margin: 0 auto;
    font-weight: 800;
  }

  p {
    padding: 2rem;
    border: 1px solid #fff;
    border-radius: 5px;
    margin: 1.5rem auto 0 auto;
    line-height: 1.5rem;
    max-width: 80%;
    text-align: justify;
  }
`;

export const UserImage = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  align-items: center;
  justify-content: center;
`;

export const Blob = styled.img`
  border: 3px solid #ff8311;
  margin: 0.5rem;
  max-width: 10vw;
  border-radius: 50%;
`;

export const Icon = styled.img`
  max-width: 23px;
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  margin: 0 1rem;
`;

export const UserStats = styled.ul`
  display: flex;
  list-style-type: none;

  li {
    &:first-of-type {
      margin-right: 0.5rem;
    }
  }
`;

export const UserDetails = styled.div`
  margin: 1rem 0;

  li {
    display: flex;
    align-items: center;
    font-size: 12px;
    margin: 0.75rem 0;
  }

  a {
    text-decoration: none;
    color: #fff;
    transition: 300ms;
  }

  ${Icon} {
    margin-right: 0.5rem;
  }
`;

export const ProfileTools = styled.div`
  width: 55%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  ${Icon} {
    min-height: 23px;
    cursor: pointer;
  }
`;

export const UserDetailsHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const UserName = styled.span`
  font-size: 25px;
  font-weight: 900;
  color: #ff8311;
`;

export const UserType = styled.span`
  background-color: #ff8311;
  border-radius: 5px;
  padding: 0.25rem;
  margin: 0 1rem;
  font-size: 13px;
`;

export const Wrapper = styled.div`
  margin: 1rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const CalendarContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  background-color: var(--black);
  padding: 2rem 0;
  width: 63%;
  max-height: 40vh;
  height: 40vh;
  border-radius: 5px;
  margin-bottom: 2rem;
  box-shadow: 0 5px 10px #0005;
`;

export const Calendar = styled.div`
  justify-self: center;
  align-self: flex-start;
`;

export const CalendarHeader = styled.header`
  background-color: #000;
  border-radius: 5px 5px 0 0;
  padding: 0.5rem;

  span {
    color: #fff;
    font-weight: 800;
  }
`;

export const MonthNavbar = styled.nav`
  display: flex;
  justify-content: space-evenly;
  font-size: 20px;

  button {
    width: 3rem;
    font-size: 25px;
    background-color: transparent;
    box-shadow: none;
    border: none;
    cursor: pointer;
    color: #ff8311;
  }
`;

export const DaysOfWeek = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;

export const CalendarNumberContainer = styled.div`
  background-color: #000;
  padding: 1rem 0;
  border-radius: 0 0 5px 5px;
`;
