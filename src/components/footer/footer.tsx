import {
  ArtTypeContainer,
  ArtTypeItem,
  Copyright,
  FirstRowContainer,
  FooterContainer,
  FooterTitle,
  Message,
  SecondRowContainer,
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
          <img alt="Share logo" src={ShareLogo} />
          <Message>Follow us</Message>
        </SocialMediaContainer>
      </FirstRowContainer>
      <hr />
      <SecondRowContainer>
        <section>
          <FooterTitle>Art types</FooterTitle>
          <ArtTypeContainer>
            <ArtTypeItem>Craftmanship</ArtTypeItem>
            <ArtTypeItem>Sing</ArtTypeItem>
            <ArtTypeItem>Composition</ArtTypeItem>
            <ArtTypeItem>Dance</ArtTypeItem>
            <ArtTypeItem>Scupture</ArtTypeItem>
            <ArtTypeItem>Paint</ArtTypeItem>
            <ArtTypeItem>Symphonism</ArtTypeItem>
          </ArtTypeContainer>
        </section>
        <section>
          <FooterTitle>Contacts</FooterTitle>
          <ArtTypeContainer>
            <ArtTypeItem>Phone number</ArtTypeItem>
            <ArtTypeItem>E-mail</ArtTypeItem>
          </ArtTypeContainer>
        </section>
        <section>
          <FooterTitle>Institutional</FooterTitle>
          <ArtTypeContainer>
            <ArtTypeItem>Terms and conditions</ArtTypeItem>
          </ArtTypeContainer>
        </section>
      </SecondRowContainer>
      <Copyright>
        <span>© 2023 SpaceArt. All rights reserved.</span>
      </Copyright>
    </FooterContainer>
  );
}

export default Footer;
