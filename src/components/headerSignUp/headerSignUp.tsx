import { useNavigate } from "react-router-dom";
import Spaceart from "../../assets/spaceart.svg";
import {
  HamburgerMenuContainer,
  HeaderMainContainer,
  HeaderContainer,
  Icon,
  NavContainer,
  NavItemContainer,
  NavItems,
  SignUpButton,
  SpaceartContainer,
  SpaceartLogo,
  SpaceartTitle,
} from "./headerSignUpStyles";

import { useContext } from "react";
import { HideContext } from "../../contexts/HideContext";
import HamburgerIcon from "../../assets/hamburger.svg";

interface HeaderProps {
  altPageTitle: string;
  altPageRoute: string;
}

function HeaderSignUp(props: HeaderProps) {
  const { hide, setHide } = useContext(HideContext);
  const navigate = useNavigate();

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
          <NavItemContainer>
            <NavItems onClick={() => navigate("/signIn")}>
              JÁ TENHO UMA CONTA
            </NavItems>
            <SignUpButton onClick={() => navigate(props.altPageRoute)}>
              {props.altPageTitle}
            </SignUpButton>
          </NavItemContainer>
        </NavContainer>
        <Icon src={HamburgerIcon} alt="" onClick={() => setHide(!hide)} />
      </HeaderContainer>
      <HamburgerMenuContainer hide={hide}>
        <span
          onClick={() => {
            setHide(true);
            navigate("/signIn");
          }}
        >
          JÁ TENHO UMA CONTA
        </span>
        <span
          onClick={() => {
            setHide(true);
            navigate(props.altPageRoute);
          }}
        >
          {props.altPageTitle}
        </span>
      </HamburgerMenuContainer>
    </HeaderMainContainer>
  );
}

export default HeaderSignUp;
