import {
  Blob,
  Calendar,
  CalendarContainer,
  CalendarHeader,
  CalendarNumberContainer,
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
  Spacing,
  TypeJobIcon,
  UserDetails,
  UserDetailsHeader,
  UserImage,
  UserInfo,
  UserName,
  UserStats,
  UserType,
  Wrapper,
} from "./profileStyles";
import ProfileImage from "../../assets/verified.svg";
import LocationIcon from "../../assets/location.svg";
import StarIcon from "../../assets/star.svg";
import GlobalIcon from "../../assets/global.svg";
import ChatIcon from "../../assets/chat.svg";
import ReportIcon from "../../assets/report.svg";
import ShareIcon from "../../assets/share.svg";
import MusicIcon from "../../assets/music.svg";
import Footer from "../../components/footer/footer";
import HeaderLogged from "../../components/headerLogged/headerLogged";
import { UserContext } from "../../contexts/UserContext";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import portuguesPlugin from "dayjs/locale/pt-br";

function Profile() {
  const params = useParams();
  const { index, user, type, fetchAnotherUser, fetchPostsByUser } =
    useContext(UserContext);
  const [profileData, setProfileData] = useState<any>({});
  const [posts, setPosts] = useState<any[]>([]);

  const [date, setDate] = useState(dayjs().set("date", 1));
  const [selectedDate, selectDate] = useState(dayjs());

  useEffect(() => {
    if (params.index === index) {
      // Executa caso o index da url condizer com o do usuário logado
      setProfileData(user);
    } else {
      // Executa caso o perfil seja de outro usuário
      fetchAnotherUser(params.index) // busca dados do usuário
        .then(setProfileData);
    }
  }, [index, user, fetchAnotherUser, setProfileData, params]);

  useEffect(() => {
    if (profileData) {
      fetchPostsByUser(profileData.id).then(setPosts);
    }
  }, [fetchPostsByUser, profileData]);

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
        <span
          // eslint-disable-next-line no-loop-func
          onClick={() => {
            selectDate(currentDate.clone());
          }}
        >
          {currentDate.format("DD")}
        </span>
      );
    }
    return days;
  };

  return (
    <>
      <HeaderLogged />
      <Spacing />
      <ProfileGlobalStyle />
      <ProfileHeader>
        <ProfileContent>
          <UserImage>
            <Blob src={profileData.image ?? ""} alt={profileData.name ?? ""} />
            <Icon src={ProfileImage} alt="Usuário com mais de 100 contratos" />
          </UserImage>
          <UserInfo>
            <UserStats>
              <li>{`${posts.length} Publicações`}</li>
              <li>0 Contrato</li>
            </UserStats>

            <UserDetails>
              <UserDetailsHeader>
                <UserName>
                  {profileData.name ?? "Usuário desconhecido"}
                </UserName>
                <UserType>
                  {profileData.art ?? profileData.type ?? "Não encontrado"}
                </UserType>
              </UserDetailsHeader>

              <ul>
                <li>
                  <Icon src={LocationIcon} alt="localização" />
                  <span>{`${profileData.location?.city} - ${profileData.location?.state}`}</span>
                </li>
                <li>
                  <Icon src={StarIcon} alt="nota" />
                  <span>{profileData.rate?.toFixed(2)}</span>
                </li>
                <li>
                  <Icon src={GlobalIcon} alt="site" />
                  <a
                    href={profileData.website ?? `/user/${profileData.index}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {profileData.website ?? ""}
                  </a>
                </li>
              </ul>
            </UserDetails>

            <ProfileTools>
              <Icon
                hidden={Boolean(
                  // eslint-disable-next-line eqeqeq
                  type == profileData.type
                ).toString()}
                src={ChatIcon}
                alt="nova conversa"
              />
              <Icon src={ReportIcon} alt="denunciar" />
              <Icon src={ShareIcon} alt="compartilhar" />
            </ProfileTools>
          </UserInfo>
        </ProfileContent>

        <DescriptionContainer>
          <span>Descrição</span>
          <p>{profileData.description ?? "Olá, mundo!"}</p>
        </DescriptionContainer>
      </ProfileHeader>

      <Wrapper>
        <CalendarContainer>
          <Calendar>
            <CalendarHeader>
              <MonthNavbar>
                <button
                  onClick={() => {
                    if (date.month() > 0) setDate(date.subtract(1, "month"));
                  }}
                >
                  {"<"}
                </button>

                <span>{date.locale(portuguesPlugin).format("MMMM")}</span>

                <button
                  onClick={() => {
                    if (date.month() < 11) setDate(date.add(1, "month"));
                  }}
                >
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
          <JobsDayContainer>
            <DateHeader>
              {selectedDate.locale(portuguesPlugin).format("MMMM, [DIA] DD")}
            </DateHeader>
            <JobWrapper>
              <Jobs>
                <JobInfo>
                  <JobHour>13:00 - 14:50</JobHour>
                  <TypeJobIcon>
                    <Icon alt="" src={MusicIcon} />
                  </TypeJobIcon>
                </JobInfo>
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
