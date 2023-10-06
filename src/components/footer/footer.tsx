import {
  FirstRowContainer,
  FooterContainer,
  Message,
  SocialMediaContainer,
} from "./footerStyles";
import SpaceartLogo from "../../assets/spaceart.svg";
import InstagramLogo from "../../assets/instagram.svg";
import FacebookLogo from "../../assets/facebook.svg";
import ShareLogo from "../../assets/share.svg";

function Footer() {
  return (
    <FooterContainer>
      <FirstRowContainer>
        <img alt="SpaceArt logo" src={SpaceartLogo} />
        <SocialMediaContainer>
          <img alt="Instagram logo" src={InstagramLogo} />
          <img alt="Facebook logo" src={FacebookLogo} />
          <img alt="Compartilhar logo" src={ShareLogo} />
        </SocialMediaContainer>
        <Message>Siga-nos</Message>
      </FirstRowContainer>
      <hr />
    </FooterContainer>
  );
}

export default Footer;
