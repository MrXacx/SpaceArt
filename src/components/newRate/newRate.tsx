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
  LocalContainer,
} from "./newRateStyles";

import { ArtType } from "../../enums/ArtType";
import LocalIcon from "../../assets/location.svg";
import { AccountType } from "../../enums/AccountType";
import { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { SelectAgreementContext } from "../../contexts/SelectAgreement";
import { Agreement } from "../../api/Agreement";
interface NewRateProps {
  agreement: string;
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
  const [rate, setRate] = useState(0);
  const [description, setDescription] = useState("");
  const { setAgreement } = useContext(SelectAgreementContext);

  const { id, sendRate } = useContext(UserContext);

  const publish = () => {
    sendRate({
      author: id,
      agreement: props.agreement,
      score: rate,
      description,
    }).then(() => setAgreement(new Agreement(props.agreement)));
  };

  return (
    <SignContainer
      onSubmit={(e) => {
        e.preventDefault();
        publish();
      }}
    >
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
        <Rating
          style={{ maxWidth: 125 }}
          value={rate}
          onChange={setRate}
          isRequired
        />
      </ArtistSelected>

      <FormInputTextbox
        placeholder="Describe the experience"
        onChange={(e: any) => setDescription(e.target.value)}
      >
        {description}
      </FormInputTextbox>
      <FormInputButton>CREATE RATING</FormInputButton>
    </SignContainer>
  );
}

export default NewRate;
