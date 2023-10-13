import {
  Blob,
  Calendar,
  CalendarContainer,
  CalendarHeader,
  CalendarNumberContainer,
  DaysOfWeek,
  DescriptionContainer,
  Icon,
  MonthNavbar,
  ProfileContent,
  ProfileGlobalStyle,
  ProfileHeader,
  ProfileTools,
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
import ChatIcon from "../../assets/chat.svg"
import ReportIcon from "../../assets/report.svg"
import ShareIcon from "../../assets/share.svg"

function Profile() {
  return (
    <>
      <ProfileGlobalStyle />
      <ProfileHeader>
        <ProfileContent>
          <UserImage>
            <Blob
              src="https://thispersondoesnotexist.com/"
              alt="imagem do usuário"
            />
            <Icon src={ProfileImage} alt="Usuário com mais de 100 contratos" />
          </UserImage>
          <UserInfo>
            <UserStats>
              <li>0 Publicação</li>
              <li>0 Contrato</li>
            </UserStats>
            <UserDetails>
              <UserDetailsHeader>
                <UserName>Maria Betânia</UserName>
                <UserType>Música</UserType>
              </UserDetailsHeader>
              <ul>
                <li>
                  <Icon src={LocationIcon} alt="localização" />
                  <span>Salvador - BA</span>
                </li>
                <li>
                  <Icon src={StarIcon} alt="nota" />
                  <span>4,5</span>
                </li>
                <li>
                  <Icon src={GlobalIcon} alt="site" />
                  <a href="www.google.com" target="_blank">
                    google.com
                  </a>
                </li>
              </ul>
            </UserDetails>
            <ProfileTools>
              <Icon src={ChatIcon} alt="nova conversa"/>
              <Icon src={ReportIcon} alt="denunciar"/>
              <Icon src={ShareIcon} alt="compartilhar"/>
            </ProfileTools>
          </UserInfo>
        </ProfileContent>
        <DescriptionContainer>
          <span>Descrição</span>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
            vitae efficitur magna. Interdum et malesuada fames ac ante ipsum
            primis in faucibus. Phasellus finibus est faucibus mauris blandit
            molestie. Nulla vel velit vitae orci malesuada efficitur.
          </p>
        </DescriptionContainer>
      </ProfileHeader>
      <Wrapper>
        <CalendarContainer>
          <Calendar>
            <CalendarHeader>
              <MonthNavbar>
                <button>{"<"}</button>
                <span>Outubro</span>
                <button>{">"}</button>
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
              <span></span>
            </CalendarNumberContainer>
          </Calendar>
        </CalendarContainer>
      </Wrapper>
    </>
  );
}

export default Profile;
