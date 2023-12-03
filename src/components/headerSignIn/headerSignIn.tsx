import { useNavigate } from "react-router-dom";
import Spaceart from "../../assets/spaceart.svg";
import {
  HamburgerMenuContainer,
  HeaderMainContainer,
  HeaderContainer,
  NavContainer,
  NavItems,
  SpaceartContainer,
  SpaceartLogo,
  SpaceartTitle,
  Icon,
} from "./headerSignInStyles";
import { useContext, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";
import { HideContext } from "../../contexts/HideContext";
import HamburgerIcon from "../../assets/white_hamburger.svg";

function HeaderSignIn() {
  const navigate = useNavigate();
  const { hide, setHide } = useContext(HideContext);
  const { isLogged } = useContext(UserContext);

  useEffect(() => {
    if (isLogged) navigate("/feed");
  }, [isLogged, navigate]);

  return (
    <HeaderMainContainer>
      <HeaderContainer>
        <SpaceartContainer onClick={() => navigate("/")}>
          <SpaceartLogo alt="Spaceart logo" src={Spaceart} />
          <SpaceartTitle>
            <span>S</span>PACE ART
          </SpaceartTitle>
        </SpaceartContainer>
        <NavContainer>
          <NavItems onClick={() => navigate("/signUp/artist")}>
            CRIAR UMA CONTA
          </NavItems>
          <NavItems onClick={() => setHide(!hide)}>
            <Icon src={HamburgerIcon} alt="" />
          </NavItems>
        </NavContainer>
      </HeaderContainer>
      <HamburgerMenuContainer hide={hide}>
        <span
          onClick={() => {
            setHide(true);
            navigate("/signUp/artist");
          }}
        >
          CADASTRAR COMO ARTISTA
        </span>
        <span
          onClick={() => {
            setHide(true);
            navigate("/signUp/enterprise");
          }}
        >
          CADASTRAR COMO EMPRESA
        </span>
      </HamburgerMenuContainer>
    </HeaderMainContainer>
  );
}

export default HeaderSignIn;
