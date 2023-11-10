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
import { useContext } from "react";
import { ArtType } from "../../enums/ArtType";
import { SelectArtistContext } from "../../contexts/SelectArtistContext";

interface ArtistBoxProps {
  name: string;
  image: string;
  art: ArtType;
  cep: string;
  city: string;
  state: string;
}

function ArtistBox(props: ArtistBoxProps) {
  const {setArtist} = useContext(SelectArtistContext);

  return (
    <ArtistSelected>
      <ProfileImage alt={props.name} src={props.image} />
      <ProfileInformationContainer>
        <ProfileInnerContainer>
          <ProfileDetail>
            <h3>{props.name}</h3>
            <span>{props.art}</span>
          </ProfileDetail>
          <LocalContainer>
            <Icon alt="local" src={LocalIcon} />
            <span>{`${props.city} - ${props.state}`}</span>
          </LocalContainer>
        </ProfileInnerContainer>
        <Icon alt="X" src={XIcon} onClick={
          (e: any) => {
            setArtist(undefined)
            // Retorna para selectArtist
          }
        }/>
      </ProfileInformationContainer>
    </ArtistSelected>
  );
}

export default ArtistBox;
