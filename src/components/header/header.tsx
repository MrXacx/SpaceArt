import Spaceart from "../../assets/spaceart.svg";
import {
  HeaderContainer,
  NavContainer,
  NavItemContainer,
  NavItems,
  SignUpButton,
  SpaceartContainer,
  SpaceartLogo,
  SpaceartTitle,
} from "./headerStyles";
import { useNavigate } from "react-router-dom";

function Header() {
const navigate = useNavigate()
  return (
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
          <NavItems onClick={() => navigate("/sign-in")}>ENTRAR</NavItems>
          <SignUpButton onClick={() => navigate("/sign-up-artist")}>CADASTRAR</SignUpButton>
        </NavItemContainer>
      </NavContainer>
    </HeaderContainer>
  );
}

export default Header;
