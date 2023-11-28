import { useNavigate } from "react-router-dom";
import Spaceart from "../../assets/spaceart.svg";
import {
  HeaderContainer,
  NavContainer,
  NavItemContainer,
  NavItems,
  SpaceartContainer,
  SpaceartLogo,
  SpaceartTitle,
} from "./headerSignInStyles";
import { useContext, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";

function HeaderSignIn() {
  const navigate = useNavigate();
  const { isLogged } = useContext(UserContext);

  useEffect(() => {
    if (isLogged) navigate("/feed");
  }, [isLogged, navigate]);

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
          <NavItems onClick={() => navigate("/signUp/artist")}>
            CRIAR UMA CONTA
          </NavItems>
        </NavItemContainer>
      </NavContainer>
    </HeaderContainer>
  );
}

export default HeaderSignIn;
