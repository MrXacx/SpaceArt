import { useNavigate } from "react-router-dom";
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
} from "./headerSignInStyles";


function HeaderSignIn() {
  const navigate = useNavigate();
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
          <NavItems onClick={() => navigate("/sign-up-artist")}>CRIAR UMA CONTA</NavItems>
        </NavItemContainer>
      </NavContainer>
    </HeaderContainer>
  );
}

export default HeaderSignIn;
