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
import SearchBlackIcon from "../../assets/search_black.svg";
import HomeIcon from "../../assets/house.svg";
import PlusIcon from "../../assets/plus.svg";
import ThreePointsIcon from "../../assets/three_points.svg";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

function HeaderLogged() {
  const navigate = useNavigate()
  const { user } = useContext(UserContext);

  return (
    <HeaderContainer>
      <SpaceartContainer>
        <SpaceartLogo alt="Spaceart logo" src={Spaceart} />
        <SpaceartTitle onClick={() => navigate('/')}>
          <span>S</span>
          <span>PACE ART</span>
        </SpaceartTitle>
      </SpaceartContainer>
      <NavContainer>
        <NavItemContainer>
          <Icon src={SearchBlackIcon} onClick={() => navigate('/search')} />
          <Icon src={HomeIcon} onClick={() => navigate('/feed')} />
          <Icon src={PlusIcon} />
          <Icon src={ThreePointsIcon} />
          <ProfilePicture
            src={user.image}
            alt={`Perfil de ${user.name}`}
            onClick={() => navigate(`/user/${user.index}`)}
          />
        </NavItemContainer>
      </NavContainer>
    </HeaderContainer>
  );
}

export default HeaderLogged;
