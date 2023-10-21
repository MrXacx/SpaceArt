import {
  HeaderContainer,
  Icon,
  NavContainer,
  NavItemContainer,
  ProfilePicture,
  SpaceartContainer,
  SpaceartLogo,
  SpaceartTitle,
} from "./headerLoggedStyles";
import Spaceart from "../../assets/spaceart.svg";
import SearchIcon from "../../assets/search.svg";
import HomeIcon from "../../assets/house.svg";
import PlusIcon from "../../assets/plus.svg";
import ThreePointsIcon from "../../assets/three_points.svg";

function HeaderLogged() {
  return (
    <HeaderContainer>
      <SpaceartContainer>
        <SpaceartLogo alt="Spaceart logo" src={Spaceart} />
        <SpaceartTitle>
          <span>S</span>
          <span>PACE ART</span>
        </SpaceartTitle>
      </SpaceartContainer>
      <NavContainer>
        <NavItemContainer>
          <Icon src={SearchIcon} />
          <Icon src={HomeIcon} />
          <Icon src={PlusIcon} />
          <Icon src={ThreePointsIcon} />
          <ProfilePicture src="https://thispersondoesnotexist.com/" alt="profile" />
        </NavItemContainer>
      </NavContainer>
    </HeaderContainer>
  );
}

export default HeaderLogged;
