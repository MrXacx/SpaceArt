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
import { Artist } from "../../api/User";
import { useContext } from "react";
import { SelectArtistContext } from "../../contexts/SelectArtistContext";

interface ArtistBoxProps {
  id: string;
  name: string;
  image: string;
  art: ArtType;
  location: {
    city: string;
    state: string;
  };
  wage: number;
}

function ArtistBoxCheck(props: ArtistBoxProps) {
  const { setArtist } = useContext(SelectArtistContext);

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
            <span>{`${props.location.city} - ${props.location.state}`}</span>
          </LocalContainer>
        </ProfileInnerContainer>
        <input
          type="radio"
          name="artist"
          onClick={(e: any) =>
            setArtist(
              new Artist(props.id).build({
                id: props.id,
                name: props.name,
                image: props.image,
                art: props.art,
                wage: props.wage,
                location: props.location,
              })
            )
          }
        />
      </ProfileInformationContainer>
    </ArtistSelected>
  );
}

export default ArtistBoxCheck;
