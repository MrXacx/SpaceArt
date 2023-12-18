/* eslint-disable eqeqeq */
import {
  Icon,
  SignContainer,
  FormInputTextbox,
  FormInputButton,
  ArtistSelected,
  ProfileImage,
  ProfileInformationContainer,
  ProfileInnerContainer,
  ProfileDetail,
  LocalContainer
} from "./newRateStyles";
import StarIcon from "../../assets/black_star.svg";
import { ArtType } from "../../enums/ArtType";
import LocalIcon from "../../assets/location.svg";
import { AccountType } from "../../enums/AccountType";
interface NewRateProps {
  rated: {
    name: string;
    image: string;
    art?: ArtType;
    type: AccountType;
    location: {
      city: string;
      state: string;
    };
  };
}

function NewRate(props: NewRateProps) {

  return (
    <SignContainer>
      <ArtistSelected>
      <ProfileImage alt={props.rated.name} src={props.rated.image} />
      <ProfileInformationContainer>
        <ProfileInnerContainer>
          <ProfileDetail>
            <h3>{props.rated.name}</h3>
            <span>{props.rated.art}</span>
          </ProfileDetail>
          <LocalContainer>
            <Icon alt="local" src={LocalIcon} />
            <span>{`${props.rated.location.city} - ${props.rated.location.state}`}</span>
          </LocalContainer>
        </ProfileInnerContainer>
        
      </ProfileInformationContainer>
    </ArtistSelected>
      <div>
        <Icon src={StarIcon} />
        <Icon src={StarIcon} />
        <Icon src={StarIcon} />
        <Icon src={StarIcon} />
        <Icon src={StarIcon} />
      </div>

      <FormInputTextbox placeholder="Describe the experience" />
      <FormInputButton>CREATE CONTRACT</FormInputButton>
    </SignContainer>
  );
}

export default NewRate;
