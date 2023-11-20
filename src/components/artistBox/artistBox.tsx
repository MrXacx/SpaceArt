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
import { ModalContext } from "../../contexts/ModalContext";

interface ArtistBoxProps {
  name: string;
  image: string;
  art: ArtType;
  location: {
    city: string;
    state: string;
  };
}

function ArtistBox(props: ArtistBoxProps) {
  const { setArtist } = useContext(SelectArtistContext);
  const { setSkipSelectArtistToContract } = useContext(ModalContext);

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
        <Icon
          alt="X"
          src={XIcon}
          onClick={(e: any) => {
            setArtist(undefined);
            setSkipSelectArtistToContract(false);
          }}
        />
      </ProfileInformationContainer>
    </ArtistSelected>
  );
}

export default ArtistBox;
