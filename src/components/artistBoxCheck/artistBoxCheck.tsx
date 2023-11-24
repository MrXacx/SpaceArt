import {
  ArtistSelected,
  Icon,
  LocalContainer,
  ProfileDetail,
  ProfileImage,
  ProfileInformationContainer,
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
  art: ArtType | string;
  location: {
    CEP: string;
    city: string;
    state: string;
  };
  wage: number;
}

function ArtistBoxCheck(props: ArtistBoxProps) {
  const { artist, setArtist } = useContext(SelectArtistContext);

  return (
    <ArtistSelected
      selected={artist?.id === props.id}
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
    >
      <ProfileImage alt={props.name} src={props.image} />
      <ProfileInformationContainer>
        <ProfileDetail>
          <h3>{props.name}</h3>
          <span>{props.art}</span>
        </ProfileDetail>
        <LocalContainer>
          <Icon alt="local" src={LocalIcon} />
          <span>{`${props.location.city} - ${props.location.state}`}</span>
        </LocalContainer>
      </ProfileInformationContainer>
    </ArtistSelected>
  );
}

export default ArtistBoxCheck;
