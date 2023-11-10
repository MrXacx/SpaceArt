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
  name: string;
  image: string;
  art: ArtType;
  cep: string;
  city: string;
  state: string;
}

function ArtistBoxCheck(prop: ArtistBoxProps) {
  const { setArtist } = useContext(SelectArtistContext);

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
        <input type="checkbox" onClick={(e: any) => setArtist(
          new Artist().build({
            name: prop.name,
            image: prop.image,
            art: prop.art,
            location: {
              cep: prop.cep,
              city: prop.city,
              state: prop.state,
            },
          })
        )} />
      </ProfileInformationContainer>
    </ArtistSelected>
  );
}

export default ArtistBoxCheck;
