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
import SuitcaseIcon from "../../assets/suitcase.svg";
import ChatIcon from "../../assets/black_chat.svg";
import SettingIcon from "../../assets/star.svg";
import ThreePointsIcon from "../../assets/three_points.svg";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

function HeaderLogged() {
  const { user, isLogged } = useContext(UserContext);
  const navigate = useNavigate();
  if (!isLogged) navigate("/signIn");

  return (
    <HeaderContainer>
      <SpaceartContainer>
        <SpaceartLogo alt="Spaceart logo" src={Spaceart} />
        <SpaceartTitle onClick={() => navigate("/")}>
          <span>S</span>
          <span>PACE ART</span>
        </SpaceartTitle>
      </SpaceartContainer>
      <NavContainer>
        <NavItemContainer>
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
            src={ChatIcon}
            title="Conversas"
            onClick={() => navigate("/services")}
          />
          <Icon
            src={SettingIcon}
            title="Configurações"
            onClick={() => navigate("/config")}
          />
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
