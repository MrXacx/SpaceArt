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
} from "./headerSignUpStyles";

function HeaderSignUp() {

  const navigate = useNavigate();

  return (
    <HeaderContainer>
      <SpaceartContainer onClick={() => navigate('/')}>
        <SpaceartLogo alt="Spaceart logo" src={Spaceart} />
        <SpaceartTitle>
          <span>S</span>
          <span>PACE ART</span>
        </SpaceartTitle>
      </SpaceartContainer>

      <NavContainer>
        <NavItemContainer>
          <NavItems onClick={() => navigate('/sign-in')}>JÁ TENHO UMA CONTA</NavItems>
          <SignUpButton onClick={() => navigate('/sign-up-enterprise')}>SOU EMPREEDEDOR</SignUpButton>
        </NavItemContainer>
      </NavContainer>
    </HeaderContainer>
  );
}

export default HeaderSignUp;