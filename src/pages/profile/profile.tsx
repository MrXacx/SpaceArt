import {
  Blob,
  Calendar,
  CalendarContainer,
  CalendarHeader,
  CalendarNumberContainer,
  CalendarNumberItem,
  DateHeader,
  DaysOfWeek,
  DescriptionContainer,
  Icon,
  JobHour,
  JobInfo,
  JobWrapper,
  Jobs,
  JobsDayContainer,
  MonthNavbar,
  Post,
  PostWrapper,
  ProfileContent,
  ProfileGlobalStyle,
  ProfileHeader,
  ProfileTools,
  TypeJobIcon,
  UserDetails,
  UserDetailsHeader,
  UserImage,
  UserInfo,
  UserName,
  UserStats,
  UserType,
  Wrapper,
  UserDetailsItem,
} from "./profileStyles";
import ProfileImage from "../../assets/verified.svg";
import LocationIcon from "../../assets/location.svg";
import StarIcon from "../../assets/star.svg";
import GlobalIcon from "../../assets/global.svg";
import ShareIcon from "../../assets/share.svg";
import MusicIcon from "../../assets/music.svg";
import Footer from "../../components/footer/footer";
import HeaderLogged from "../../components/headerLogged/headerLogged";
import { UserContext } from "../../contexts/UserContext";
import { useContext, useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import portugueseLocale from "dayjs/locale/pt-br";
import customParseFormat from "dayjs/plugin/customParseFormat";
import calendar from "dayjs/plugin/calendar";

function Profile() {
  dayjs.extend(customParseFormat);
  dayjs.extend(calendar);
  dayjs.locale(portugueseLocale);

  const params = useParams();
  const {
    index,
    user,
    fetchAnotherUser,
    fetchPostsByUser,
    fetchAgreementsByUser,
  } = useContext(UserContext);
  const [profileData, setProfileData] = useState<any>({});
  const [posts, setPosts] = useState<any[]>([]);
  const [agreements, setAgreements] = useState<any[]>([]);
  const [date, setDate] = useState(dayjs().set("date", 1));
  const [selectedDate, selectDate] = useState(dayjs());

  const fetchProfileOwner = useCallback(() => {
    if (params.index === index) {
      // Executa caso o index da url condizer com o do usuário logado
      setProfileData(user);
      return user.id;
    } else {
      // Executa caso o perfil seja de outro usuário
      return fetchAnotherUser(params.index) // busca dados do usuário
        .then((data: any) => {
          setProfileData(data ?? {});
          return data.id;
        });
    }
  }, [fetchAnotherUser, index, params, user]);
  const fecthPosts = useCallback(
    (id: string) => fetchPostsByUser(id).then(setPosts),
    [fetchPostsByUser]
  );
  const fetchAgreement = useCallback(
    (id: string) => fetchAgreementsByUser(id).then(setAgreements),
    [fetchAgreementsByUser]
  );

  useEffect(() => {
    fetchProfileOwner()
      .then((id: string) => Promise.all([fecthPosts(id), fetchAgreement(id)]))
      .catch((e: any) => console.error(e.message));
  }, [fetchAgreement, fecthPosts, fetchProfileOwner]);

  const iterateCalendar = () => {
    let i = 0;
    const days: any = [];
    switch (date.format("dddd").toLowerCase()) {
      case "sunday":
        i = 0;
        break;
      case "monday":
        i = -1;
        break;
      case "tuesday":
        i = -2;
        break;
      case "wednesday":
        i = -3;
        break;
      case "thursday":
        i = -4;
        break;
      case "friday":
        i = -5;
        break;
      case "saturday":
        i = -6;
        break;
    }

    const limit = 35 + i;

    while (i < limit) {
      const currentDate = date.add(i++, "days");
      days.push(
        <CalendarNumberItem
          // eslint-disable-next-line no-loop-func
          selected={Boolean(
            currentDate.format("DD/MM/YYYY") ===
              selectedDate.format("DD/MM/YYYY")
          ).toString()}
          onClick={() => {
            selectDate(currentDate.clone());
          }}
        >
          {currentDate.format("DD")}
        </CalendarNumberItem>
      );
    }
    return days;
  };

  return (
    <>
      <HeaderLogged />
      <ProfileGlobalStyle />
      <ProfileHeader>
        <ProfileContent>
          <UserImage>
            <Blob>
              <img src={profileData.image} alt={profileData.name ?? ""} />
            </Blob>
            <Icon src={ProfileImage} alt="Usuário com mais de 100 contratos" />
          </UserImage>
          <UserInfo>
            <UserStats>
              <li>{`${posts.length} Publicações`}</li>
              <li>{`${agreements.length} Contratos`}</li>
            </UserStats>

            <UserDetails>
              <UserDetailsHeader>
                <UserName>
                  {profileData.name ?? "Usuário desconhecido"}
                </UserName>
                <UserType>{profileData.art ?? profileData.type ?? ""}</UserType>
              </UserDetailsHeader>

              <ul>
                <UserDetailsItem>
                  <Icon src={LocationIcon} alt="localização" />
                  <span>{`${profileData.location?.city ?? ""} - ${
                    profileData.location?.state ?? ""
                  }`}</span>
                </UserDetailsItem>

                <UserDetailsItem>
                  <Icon src={StarIcon} alt="nota" />
                  <span>{profileData.rate?.toFixed(2)}</span>
                </UserDetailsItem>

                <UserDetailsItem>
                  <Icon src={GlobalIcon} alt="site" />
                  <a
                    href={profileData.website}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Meu site
                  </a>
                </UserDetailsItem>
              </ul>
            </UserDetails>

            <ProfileTools>
              <Icon
                src={ShareIcon}
                alt="compartilhar"
                onClick={() => {
                  window.navigator
                    .share({
                      title: `${profileData.name} | Space Art`,
                      text: `Conheça o perfil de ${profileData.name} no Space Art`,
                      url: window.location.href,
                    })
                    .catch(console.log);
                }}
              />
            </ProfileTools>
          </UserInfo>
        </ProfileContent>

        <DescriptionContainer is_visible={profileData.description}>
          <span>Descrição</span>
          <p>{profileData.description}</p>
        </DescriptionContainer>
      </ProfileHeader>

      <Wrapper>
        <CalendarContainer>
          <Calendar>
            <CalendarHeader>
              <MonthNavbar>
                <button onClick={() => setDate(date.subtract(1, "month"))}>
                  {"<"}
                </button>

                <span>
                  {date.format(
                    dayjs().isSame(date, "year") ? "MMMM" : "MMMM/YYYY"
                  )}
                </span>

                <button onClick={() => setDate(date.add(1, "month"))}>
                  {">"}
                </button>
              </MonthNavbar>

              <DaysOfWeek>
                <span>Dom</span>
                <span>Seg</span>
                <span>Ter</span>
                <span>Qua</span>
                <span>Qui</span>
                <span>Sex</span>
                <span>Sab</span>
              </DaysOfWeek>
            </CalendarHeader>
            <CalendarNumberContainer>
              {iterateCalendar()}
            </CalendarNumberContainer>
          </Calendar>
          <JobsDayContainer hidden={agreements.length === 0}>
            <DateHeader>
              {dayjs(selectedDate).calendar(null, {
                sameDay: "[Hoje]",
                nextDay: "[Amanhã] ",
                lastDay: "[Ontem]",
                nextWeek: "DD/MM/YYYY",
                lastWeek: "DD/MM/YYYY",
                sameElse: "DD/MM/YYYY",
              })}
            </DateHeader>

            <JobWrapper>
              <Jobs>
                {agreements
                  .filter((item: any) =>
                    selectedDate.isSame(dayjs(item.date, "DD/MM/YYYY"), "date")
                  )
                  .sort((a: any, b: any) =>
                    dayjs(a.time.start, "HH:mm").isBefore(
                      dayjs(b.time.start, "HH:mm")
                    )
                      ? -1
                      : 1
                  )
                  .map((item: any) => (
                    <JobInfo>
                      <JobHour>{`${item.time.start} - ${item.time.end}`}</JobHour>
                      <TypeJobIcon>
                        <Icon alt={item.art} src={MusicIcon} />
                      </TypeJobIcon>
                    </JobInfo>
                  ))}
              </Jobs>
            </JobWrapper>
          </JobsDayContainer>
        </CalendarContainer>
        <PostWrapper>
          {posts.map((post: any) => (
            <Post>
              <img src={post.media} alt={post.message} />
            </Post>
          ))}
        </PostWrapper>
      </Wrapper>
      <Footer />
    </>
  );
}

export default Profile;
