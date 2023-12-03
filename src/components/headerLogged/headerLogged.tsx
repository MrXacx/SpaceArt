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
    // if (!isLogged) navigate("/signIn");
  }, [isLogged, navigate]);

  return (
    <>
      <HeaderMainContainer>
        <HeaderContainer>
          <SpaceartContainer>
            <SpaceartLogo alt="Spaceart logo" src={Spaceart} />
            <SpaceartTitle onClick={() => navigate("/")}>
              <span>S</span>PACE ART
            </SpaceartTitle>
          </SpaceartContainer>
          <NavContainer>
            <Icon
              src={HomeIcon}
              title="Ir para home"
              onClick={() => navigate("/feed")}
            />
            <Icon src={PlusIcon} title="Nova publicação" />
            <Icon
              src={SearchBlackIcon}
              title="Pesquisar"
              onClick={() => navigate("/search")}
            />
            <Icon
              src={SuitcaseIcon}
              title="Serviços"
              onClick={() => navigate("/services")}
            />
            <Icon
              src={SettingIcon}
              title="Configurações"
              onClick={() => navigate("/config")}
            />
            <ProfilePicture>
              <img
                src={user.image}
                alt={`Perfil de ${user.name}`}
                onClick={() => navigate(`/user/${user.index}`)}
              />
            </ProfilePicture>
            <Icon src={HamburgerIcon} alt="" onClick={() => setHide(!hide)} />
          </NavContainer>
        </HeaderContainer>
        <HamburgerMenuContainer hide={hide}>
          <span
            onClick={() => {
              setHide(true)
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
            PESQUISAR
          </span>
          <span
            onClick={() => {
              setHide(true);
              navigate("/services");
            }}
          >
            SERVIÇOS
          </span>
          <span
            onClick={() => {
              setHide(true);
              navigate("/config");
            }}
          >
            CONFIGURAÇÕES
          </span>
        </HamburgerMenuContainer>
      </HeaderMainContainer>
      <FloatingButton src={PlusIcon} title="Nova publicação" />
    </>
  );
}

export default HeaderLogged;
