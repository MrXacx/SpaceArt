import {
  ArtistSelected,
  Icon,
  LocalContainer,
  ProfileDetail,
  ProfileImage,
  ProfileInformationContainer,
  ProfileInnerContainer,
} from "./artistBoxCheckStyles";
import LocalIcon from "../../assets/local.svg";


function ArtistBoxCheck() {
  return (
    <ArtistSelected>
      <ProfileImage alt="profile" src="https://thispersondoesnotexist.com/" />
      <ProfileInformationContainer>
        <ProfileInnerContainer>
          <ProfileDetail>
            <h3>Maria Betânia</h3>
            <span>Música</span>
          </ProfileDetail>
          <LocalContainer>
            <Icon alt="local" src={LocalIcon} />
            <span>Salvador - BA</span>
          </LocalContainer>
        </ProfileInnerContainer>
        <input type="checkbox"></input>
      </ProfileInformationContainer>
    </ArtistSelected>
  );
}

export default ArtistBoxCheck;
