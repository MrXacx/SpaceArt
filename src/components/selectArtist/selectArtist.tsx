import {
  FormInputButton,
  HeaderLogo,
  Icon,
  ModalContainer,
  SearchArtistButton,
  SearchArtistInput,
  SearchArtistInputContainer,
  SignContainer,
} from "./selectArtistStyles";
import { useContext } from "react";
import { ModalContext } from "../../contexts/ModalContext";
import XIcon from "../../assets/x.svg";

import SearchWhiteIcon from "../../assets/search_white.svg"

function SelectArtist() {
  const { hideModal, setHideModal } = useContext(ModalContext);

  return (
    <ModalContainer>
      <HeaderLogo>
        <Icon alt="X" src={XIcon} onClick={() => setHideModal(!hideModal)} />
        <h1>Select artist</h1>
      </HeaderLogo>
      <SignContainer>
        <SearchArtistInputContainer>
          <SearchArtistInput type="text" placeholder="Artista" />
          <SearchArtistButton>
            <img src={SearchWhiteIcon} />
          </SearchArtistButton>
        </SearchArtistInputContainer>

        <FormInputButton>Next</FormInputButton>
      </SignContainer>
    </ModalContainer>
  );
}

export default SelectArtist;
