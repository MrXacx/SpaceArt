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

function Header() {
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
          <NavItems>QUEM SOMOS</NavItems>
          <NavItems>CATEGORIAS DE ARTE</NavItems>
          <NavItems>BUSQUE ARTISTAS</NavItems>
        </NavItemContainer>
      </NavContainer>
      <NavContainer>
        <NavItemContainer>
          <NavItems>ENTRAR</NavItems>
          <SignUpButton>CADASTRAR</SignUpButton>
        </NavItemContainer>
      </NavContainer>
    </HeaderContainer>
  );
}

export default Header;
