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
    <HeaderMainContainer>
      <HeaderContainer>
        <SpaceartContainer onClick={() => navigate("/")}>
          <SpaceartLogo alt="Spaceart logo" src={Spaceart} />
          <SpaceartTitle translate="no">
            <span>S</span>PACE ART
          </SpaceartTitle>
        </SpaceartContainer>
        <NavContainer>
          <NavItemContainer>
            <NavItems>
              <a href="#about-us">HOW WE ARE</a>
            </NavItems>
            <NavItems>
              <a href="#art-types">ARTIST CATEGORY</a>
            </NavItems>
            <NavItems>
              <a href="#search-artists">SEARCH ARTIST</a>
            </NavItems>
          </NavItemContainer>
        </NavContainer>
        <NavContainer>
          <NavItemContainer>
            <NavItems onClick={() => navigate("/signIn")}>SIGN IN</NavItems>
            <SignUpButton onClick={() => navigate("/signUp/artist")}>
              SIGN UP
            </SignUpButton>
          </NavItemContainer>
        </NavContainer>
        <Icon src={HamburgerIcon} alt="" onClick={() => setHide(!hide)} />
      </HeaderContainer>
      <HamburgerMenuContainer hide={hide}>
        <span
          onClick={() => {
            setHide(true);
            navigate("/signUp/enterprise");
          }}
        >
          SIGN UP AS ENTERPRISE
        </span>
        <span
          onClick={() => {
            setHide(true);
            navigate("/signUp/artist");
          }}
        >
          SIGN UP AS ARTIST
        </span>
        <span
          onClick={() => {
            setHide(true);
            navigate("/signIn");
          }}
        >
          SIGN IN
        </span>
      </HamburgerMenuContainer>
    </HeaderMainContainer>
  );
}

export default Header;
