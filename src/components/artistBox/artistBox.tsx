import {
  ArtistSelected,
  Icon,
  LocalContainer,
  ProfileDetail,
  ProfileImage,
  ProfileInformationContainer,
  ProfileInnerContainer,
} from "./artistBoxStyles";
import LocalIcon from "../../assets/local.svg";
import XIcon from "../../assets/x.svg";

function ArtistBox() {
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
        <Icon alt="X" src={XIcon} />
      </ProfileInformationContainer>
    </ArtistSelected>
  );
}

export default ArtistBox;
