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
import { ArtType } from "../../enums/ArtType";

interface ArtistBoxProps{
  name: string;
  image: string;
  art: ArtType;
  city: string;
  state: string;
}

function ArtistBoxCheck(prop: ArtistBoxProps) {
  return (
    <ArtistSelected>
      <ProfileImage alt={prop.name} src={prop.image} />
      <ProfileInformationContainer>
        <ProfileInnerContainer>
          <ProfileDetail>
            <h3>{prop.name}</h3>
            <span>{prop.art}</span>
          </ProfileDetail>
          <LocalContainer>
            <Icon alt="local" src={LocalIcon} />
            <span>{`${prop.city} - ${prop.state}`}</span>
          </LocalContainer>
        </ProfileInnerContainer>
        <input type="checkbox"></input>
      </ProfileInformationContainer>
    </ArtistSelected>
  );
}

export default ArtistBoxCheck;
