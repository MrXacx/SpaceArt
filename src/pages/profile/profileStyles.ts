import styled, { createGlobalStyle } from "styled-components";

export const ProfileGlobalStyle = createGlobalStyle`

  *::-webkit-scrollbar-thumb {
    background-color: transparent;
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
  grid-template-columns: 1fr;

  @media (min-width: 768px) {
    padding-top: 2rem;
  }
  @media (min-width: 960px) {
    grid-template-columns: 1fr 1fr;
    padding: 2rem 1rem;
  }
`;

export const ProfileContent = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
    margin-bottom: 2rem;
  }
  @media (min-width: 960px) {
    align-items: center;
  }
`;

export const DescriptionContainer = styled.div<{ is_visible: boolean }>`
  width: 100%;
  display: ${({ is_visible }) => (is_visible ? "flex" : "none")};
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  justify-self: center;
  align-self: center;
  color: #000;
  background-color: #fcfcfc;
  padding: 1rem 0;

  span {
    font-size: 1.5rem;
    text-align: jusify;
    margin: 0 auto;
    font-weight: 800;
  }

  p {
    width: 60vw;
    max-width: 60vw;
    border-radius: 5px;
    margin: 1.5rem auto 0 auto;
    line-height: 1.5rem;
    text-align: justify;
    display: flex;
    flex-wrap: wrap;
    text-align: justify;
  }

  @media (min-width: 768px) {
    p {
      margin: 1rem 0 0 0;
    }
  }
  @media (min-width: 960px) {
    width: 50%;
    max-width: 50%;
    margin: 0;
    color: #fff;
    background-color: transparent;

    span {
      text-align: center;
    }

    p {
      padding: 2rem;
      border: 1px solid #fff;
      max-width: 80%;
    }
  }
`;

export const UserImage = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  align-items: center;
  justify-content: center;
  width: 100%;

  > img {
    display: none;
  }

  @media (min-width: 768px) {
    width: auto;
    > img {
      display: flex;
    }
  }
`;

export const Blob = styled.div`
  display: flex;
  justify-content: center;
  border: 3px solid #ff8311;
  margin: 0.5rem;
  max-width: 40vw;
  border-radius: 50%;
  height: 18vh;
  overflow: hidden;

  img {
    width: max-content;
    height: 100%;
  }

  @media (min-width: 768px) {
    margin: 0.5rem;
    height: 17vh;
    max-width: 22vw;
  }

  @media (min-width: 960px) {
    margin: 0.5rem 0.5rem 1rem 0.5rem;
    height: 25vh;
    max-width: 12vw;
  }
  @media (min-width: 1024px) {
    max-width: 15vw;
  }
`;

export const Icon = styled.img<{ hidden?: boolean }>`
  display: ${({ hidden }) => (hidden ? "none" : "flex")};
  max-width: 23px;
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  justify-content: center;
  margin: 0 auto;

  @media (min-width: 768px) {
    margin: 0 1rem;
  }

  @media (min-width: 960px) {
    justify-content: flex-start;
  }
`;

export const UserStats = styled.ul`
  display: flex;
  justify-content: center;
  list-style-type: none;
  margin: 0.5rem 0;

  li {
    &:first-of-type {
      margin-right: 0.5rem;
    }
  }

  @media (min-width: 768px) {
    justify-content: flex-start;
    font-size: 0.85rem;
  }
`;

export const UserDetails = styled.div`
  margin: 0.5rem 0;

  ul {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }

  @media (min-width: 768px) {
    ul {
      justify-content: flex-start;
    }
  }
  @media (min-width: 960px) {
    ul {
      flex-direction: column;
      margin-bottom: 0;
    }
  }
`;

export const UserDetailsHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: flex-start;
  }
  @media (min-width: 960px) {
    justify-content: space-between;
  }
`;

export const UserDetailsItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  margin: 0.5rem;
  padding: 0.5rem;
  background-color: #0f0f0f75;
  max-width: 50%;
  border-radius: 5px;

  &:last-of-type {
    width: 75%;
    padding: 0.5rem 0;
  }

  a {
    text-decoration: none;
    color: #fff;
    transition: 300ms;
  }

  ${Icon} {
    margin-right: 0.5rem;
  }

  @media (min-width: 768px) {
    font-size: 0.65rem;
    width: auto;
    margin: 0 0.75rem 0 0;
    &:last-of-type {
      width: auto;
      padding: 0.5rem;
    }

    ${Icon} {
      margin-right: 0.25rem;
      width: 1rem;
    }
  }

  @media (min-width: 960px) {
    width: 100%;
    font-size: 0.75rem;
    justify-content: flex-start;
    padding: 0;
    background-color: transparent;
    margin: 0.5rem 0;

    ${Icon} {
      margin-right: 0.5rem;
      width: 1.2rem;
    }

    &:last-of-type {
      padding: 0;
    }

    span {
      width: 20vw;
    }
  }
`;

export const UserName = styled.span`
  font-size: 1.75rem;
  font-weight: 900;
  color: #ff8311;

  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
`;

export const UserType = styled.span`
  background-color: #ff8311;
  border-radius: 5px;
  padding: 0.25rem;
  margin: 1rem;
  font-size: 0.8rem;

  @media (min-width: 768px) {
    margin: 0 1rem;
  }
`;

export const ProfileTools = styled.div`
  width: 55%;
  display: flex;
  margin: 0 auto 1rem auto;
  align-items: center;
  justify-content: center;

  ${Icon} {
    height: 1.5rem;
    margin: 0 0.5rem;
    cursor: pointer;
    padding: 0.75rem;
    border-radius: 5px;

    &:hover {
      background-color: #0f0f0f75;
    }
  }

  @media (min-width: 768px) {
    justify-content: flex-start;
    margin: 0;
    ${Icon} {
      margin: 0 0.5rem 0 0;
      height: 1rem;
      padding: 0.5rem;
    }
  }
`;

export const Wrapper = styled.div`
  margin: 1rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const CalendarContainer = styled.div`
  display: grid;
  width: 100%;
  background-color: transparent;
  padding: 2rem 0;
  margin-bottom: 2rem;
  gap: 2rem;

  @media (min-width: 768px) {
    width: 80%;
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 960px) {
    background-color: #fff;
    width: 63%;
    max-height: 55vh;
    padding: 2rem 0;
    border-radius: 5px;
    box-shadow: 0 5px 10px #0005;
  }
`;

export const Calendar = styled.div`
  display: grid;
  grid-template-rows: 1fr 5fr;
  height: 50vh;
  width: 100%;
  justify-self: center;
  background-color: #000;
  border-radius: 5px;

  @media (min-width: 768px) {
    width: 40vw;
    height: 55vh;
  }
  @media (min-width: 960px) {
    width: 80%;
  }
`;

export const CalendarHeader = styled.header`
  padding: 0.75rem 1rem 0.25rem 1rem;

  span {
    color: #fff;
    font-weight: 800;
    text-align: center;
  }
`;

export const MonthNavbar = styled.nav`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  font-size: 20px;
  margin-bottom: 0.75rem;

  button {
    width: 3rem;
    font-size: 2.25rem;
    font-weight: bold;
    background-color: transparent;
    box-shadow: none;
    border: none;
    cursor: pointer;
    color: #ff8311;
    border-radius: 3px;
    &:hover {
      background-color: #0f0f0f44;
    }
  }
`;

export const DaysOfWeek = styled.div`
  display: grid;
  place-items: center;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.5rem;
`;

export const CalendarNumberContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.5rem;
  padding: 1rem;
  color: #fff;
`;

export const CalendarNumberItem = styled.span<{ selected: string }>`
  align-self: center;
  justify-self: center;
  width: 100%;
  height: 50%;
  border-radius: 50%;
  padding: 0;
  transition: 300ms;
  cursor: pointer;
  text-align: center;
  border-radius: 3px;
  background-color: ${(c) =>
    JSON.parse(c.selected) ? "#ff831185" : "transparent"};
  font-weight: ${(c) => (JSON.parse(c.selected) ? "bold" : "500")};
  border: 1px solid transparent;

  @media (min-width: 768px) {
    padding: 0.2rem 0;
  }
  @media (min-width: 960px) {
    padding: 0.6rem 0.15rem;
    &:hover {
      border: 1px solid #ff831185;
      font-weight: bold;
    }
  }
`;

export const JobsDayContainer = styled.div<{ hidden: boolean }>`
  width: 100%;
  display: ${({ hidden }) => (hidden ? "none" : "block")};
  flex-direction: column;
  align-items: center;
  @media (min-width: 960px) {
    width: 80%;
  }
`;

export const DateHeader = styled.span`
  border-left: 2px solid #ff8311;
  margin-bottom: 1rem;
  text-align: center;
  text-transform: uppercase;
  box-shadow: 0 2px 5px #0005;
  color: #fff;
  width: 100%;
  background-color: #000;
  border-radius: 5px;
  padding: 1rem;

  @media (min-width: 960px) {
    width: 60%;
  }
`;

export const JobWrapper = styled.div`
  max-height: 33vh;
  width: 100%;
  overflow-y: scroll;
`;

export const Jobs = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem 1rem;

  width: 100%;

  @media (min-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    overflow-y: hidden;
    height: auto;
  }
`;

export const JobInfo = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-end;
  align-items: center;
  margin: 0.75rem 0;
  transition: 300ms;
  background-color: #000;
  color: #fff;
  border-radius: 5px;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    width: 60%;
    padding: 1rem;
  }
`;

export const JobHour = styled.span`
  color: #fff;
  margin: 0 auto;
  @media (min-width: 768px) {
    margin: 0;
  }
`;

export const TypeJobIcon = styled.div`
  background-color: #ff8311;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px 0 0 5px;
  padding: 1rem 0.5rem;

  ${Icon} {
    width: 20px;
  }

  @media (min-width: 768px) {
    border-radius: 50%;
    padding: 0.5rem;
  }
`;

export const PostWrapper = styled.ol`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem 0;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }
`;

export const Post = styled.li`
  border-radius: 5px;
  box-shadow: 0 5px 10px #0005;
  width: 100%;
  display: flex;
  flex-direction: column;

  img {
    border-radius: 5px;
    width: inherit;
    height: 30vh;
    object-fit: cover;
    transition: 300ms;
    margin: 0.25rem;
  }

  @media (min-width: 768px) {
    max-width: 20vw;
    background-color: #202020;
    padding: 1vw;
  }
`;
