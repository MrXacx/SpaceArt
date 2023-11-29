import {
  HamburgerMenuContainer,
  HeaderContainer,
  HeaderMainContainer,
  Icon,
  NavContainer,
  NavItemContainer,
  NavItems,
  SignUpButton,
  SpaceartContainer,
  SpaceartLogo,
  SpaceartTitle,
} from "./headerStyles";
import { useNavigate } from "react-router-dom";
import Spaceart from "../../assets/spaceart.svg";
import HamburgerIcon from "../../assets/hamburger.svg";
import { HideContext } from "../../contexts/HideContext";
import { useContext } from "react";

function Header() {
  const { hide, setHide } = useContext(HideContext);
  const navigate = useNavigate();
  return (
    <>
      <HeaderMainContainer>
        <HeaderContainer>
          <SpaceartContainer onClick={() => navigate("/")}>
            <SpaceartLogo alt="Spaceart logo" src={Spaceart} />
            <SpaceartTitle>
              <span>S</span>
              <span>PACE ART</span>
            </SpaceartTitle>
          </SpaceartContainer>
          <NavContainer>
            <NavItemContainer>
              <NavItems>QUEM SOMOS</NavItems>
              <NavItems>CATEGORIAS DE ARTE</NavItems>
              <NavItems>BUSQUE ARTISTAS</NavItems>
            </NavItemContainer>
          </NavContainer>
          <NavContainer>
            <NavItemContainer>
              <NavItems onClick={() => navigate("/signIn")}>ENTRAR</NavItems>
              <SignUpButton onClick={() => navigate("/signUp/artist")}>
                CADASTRAR
              </SignUpButton>
            </NavItemContainer>
          </NavContainer>
          <Icon src={HamburgerIcon} alt="" onClick={() => setHide(!hide)} />
        </HeaderContainer>
        <HamburgerMenuContainer hide={hide}>
          <span onClick={() => navigate("/signUp/enterprise")}>
            CADASTRAR COMO EMPRESA
          </span>
          <span onClick={() => navigate("/signUp/artist")}>
            CADASTRAR COMO ARTISTA
          </span>
          <span onClick={() => navigate("/signIn")}>ENTRAR</span>
        </HamburgerMenuContainer>
      </HeaderMainContainer>
    </>
  );
}

export default Header;
