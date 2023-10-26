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



export const Spacing = styled.div`
  height: 100px;
  background-color: #fff;
`;

export const ProfileGlobalStyle = createGlobalStyle`

  *::-webkit-scrollbar-thumb {
    background-color: transparent;
  }

  body {
    background-color: #202020;
  }

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
  background-color: #202020;
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
    text-align: center;
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
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  background-color: #000;
  padding: 1rem 1rem;
  border-radius: 0 0 5px 5px;
  color: #fff;

  span {
    border-radius: 50%;
    padding: 0.6rem 0.15rem;
    transition: 300ms;
    cursor: pointer;
    text-align: center;
  }
`;

export const JobsDayContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const DateHeader = styled.span`
  border-left: 2px solid #ff8311;
  margin-bottom: 1rem;
  text-align: center;
  text-transform: uppercase;
  box-shadow: 0 2px 5px #0005;
  color: #fff;
  width: 60%;
  background-color: #000;
  border-radius: 5px;
  padding: 1rem;
`;

export const JobWrapper = styled.div`
  height: 33vh;
  width: 100%;
  overflow-y: scroll;
`;

export const Jobs = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  overflow-y: hidden;
  height: auto;
  width: 100%;
`;

export const JobInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 0.75rem 0;
  transition: 300ms;
  width: 60%;
  background-color: #000;
  color: #fff;
  border-radius: 5px;
  padding: 1rem;
`;

export const JobHour = styled.span`
  color: #fff;
`;

export const TypeJobIcon = styled.div`
  background-color: #ff8311;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  padding: 0.5rem;

  ${Icon} {
    width: 20px;
  }
`;

export const PostWrapper = styled.ol`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

export const Post = styled.li`
  margin: 1rem;
  padding: 1vw;
  background-color: #202020;
  border-radius: 5px;
  box-shadow: 0 5px 10px #0005;

  img {
    border-radius: 5px;
    width: 20vw;
    object-fit: cover;
    transition: 300ms;
    margin: 0.25rem;
  }
`;
