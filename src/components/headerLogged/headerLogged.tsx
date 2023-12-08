import {
  HeaderContainer,
  Icon,
  NavContainer,
  ProfilePicture,
  SpaceartContainer,
  SpaceartLogo,
  SpaceartTitle,
  HamburgerMenuContainer,
  HeaderMainContainer,
  FloatingButton,
} from "./headerLoggedStyles";
import Spaceart from "../../assets/spaceart.svg";
import SearchBlackIcon from "../../assets/search_black.svg";
import HomeIcon from "../../assets/house.svg";
import PlusIcon from "../../assets/plus.svg";
import WhitePlusIcon from "../../assets/white_plus.svg";
import SuitcaseIcon from "../../assets/suitcase.svg";
import SettingIcon from "../../assets/settings.svg";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";
import { HideContext } from "../../contexts/HideContext";
import HamburgerIcon from "../../assets/hamburger.svg";

function HeaderLogged() {
  const { user, isLogged } = useContext(UserContext);
  const { hide, setHide } = useContext(HideContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogged) navigate("/signIn");
  }, [isLogged, navigate]);

  return (
    <>
      <HeaderMainContainer>
        <HeaderContainer>
          <SpaceartContainer onClick={() => navigate("/")} >
            <SpaceartLogo alt="Spaceart logo" src={Spaceart} />
            <SpaceartTitle translate="no">
              <span>S</span>PACE ART
            </SpaceartTitle>
          </SpaceartContainer>
          <NavContainer>
            <Icon
              src={HomeIcon}
              title="Go home"
              onClick={() => navigate("/feed")}
            />
            <Icon src={PlusIcon} title="New post" />
            <Icon
              src={SearchBlackIcon}
              title="Search"
              onClick={() => navigate("/search")}
            />
            <Icon
              src={SuitcaseIcon}
              title="Services"
              onClick={() => navigate("/services")}
            />
            <Icon
              src={SettingIcon}
              title="Configuration"
              onClick={() => navigate("/config")}
            />
            <ProfilePicture>
              <img
                src={user.image}
                alt={`${user.name}'s profile`}
                onClick={() => navigate(`/user/${user.index}`)}
              />
            </ProfilePicture>
            <Icon src={HamburgerIcon} alt="" onClick={() => setHide(!hide)} />
          </NavContainer>
        </HeaderContainer>
        <HamburgerMenuContainer hide={hide}>
          <span
            onClick={() => {
              setHide(true);
              navigate("/feed");
            }}
          >
            HOME
          </span>
          <span
            onClick={() => {
              setHide(true);
              navigate("/search");
            }}
          >
            SEARCH
          </span>
          <span
            onClick={() => {
              setHide(true);
              navigate("/services");
            }}
          >
            SERVICES
          </span>
          <span
            onClick={() => {
              setHide(true);
              navigate("/config");
            }}
          >
            CONFIGURATION
          </span>
        </HamburgerMenuContainer>
      </HeaderMainContainer>
      <FloatingButton src={WhitePlusIcon} title="Nova publicação" />
    </>
  );
}

export default HeaderLogged;
