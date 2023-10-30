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
<<<<<<< HEAD
<<<<<<< HEAD
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

function HeaderLogged() {
  const navigate = useNavigate()
  const { user } = useContext(UserContext);

=======

function HeaderLogged() {
>>>>>>> 33f828e (feed typescript)
=======

function HeaderLogged() {
>>>>>>> react
  return (
    <HeaderContainer>
      <SpaceartContainer>
        <SpaceartLogo alt="Spaceart logo" src={Spaceart} />
<<<<<<< HEAD
<<<<<<< HEAD
        <SpaceartTitle onClick={() => navigate('/')}>
=======
        <SpaceartTitle>
>>>>>>> 33f828e (feed typescript)
=======
        <SpaceartTitle>
>>>>>>> react
          <span>S</span>
          <span>PACE ART</span>
        </SpaceartTitle>
      </SpaceartContainer>
      <NavContainer>
        <NavItemContainer>
<<<<<<< HEAD
<<<<<<< HEAD
          <Icon src={SearchIcon} onClick={() => navigate('/search')} />
          <Icon src={HomeIcon} onClick={() => navigate('/feed')} />
          <Icon src={PlusIcon} />
          <Icon src={ThreePointsIcon} />
          <ProfilePicture
            src={user.image}
            alt={`Foto de perfil de ${user.name}`}
            onClick={() => navigate('/profile')}
          />
=======
=======
>>>>>>> react
          <Icon src={SearchIcon} />
          <Icon src={HomeIcon} />
          <Icon src={PlusIcon} />
          <Icon src={ThreePointsIcon} />
          <ProfilePicture src="https://thispersondoesnotexist.com/" alt="profile" />
<<<<<<< HEAD
>>>>>>> 33f828e (feed typescript)
=======
>>>>>>> react
        </NavItemContainer>
      </NavContainer>
    </HeaderContainer>
  );
}

export default HeaderLogged;
