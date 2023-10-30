import {
  ArtTypeContainer,
  ArtTypeItem,
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
          <img alt="Compartilhar logo" src={ShareLogo} />
        <Message>Siga-nos</Message>
        </SocialMediaContainer>
      </FirstRowContainer>
      <hr />
      <SecondRowContainer>
        <section>
          <FooterTitle>Tipos de arte</FooterTitle>
          <ArtTypeContainer>
            <ArtTypeItem>Artesanato</ArtTypeItem>
            <ArtTypeItem>Composição</ArtTypeItem>
            <ArtTypeItem>Canção</ArtTypeItem>
            <ArtTypeItem>Dança</ArtTypeItem>
            <ArtTypeItem>Escultura</ArtTypeItem>
            <ArtTypeItem>Pintura</ArtTypeItem>
            <ArtTypeItem>Sinfonismo</ArtTypeItem>
          </ArtTypeContainer>
        </section>
        <section>
          <FooterTitle>Contatos</FooterTitle>
          <ArtTypeContainer>
            <ArtTypeItem>Telefone</ArtTypeItem>
            <ArtTypeItem>E-mail</ArtTypeItem>
            <ArtTypeItem>Horário de funcionamento</ArtTypeItem>
          </ArtTypeContainer>
        </section>
        <section>
          <FooterTitle>Institucional</FooterTitle>
          <ArtTypeContainer>
            <ArtTypeItem>Sobre nós</ArtTypeItem>
            <ArtTypeItem>Termos e condições de uso</ArtTypeItem>
          </ArtTypeContainer>
        </section>
      </SecondRowContainer>
    </FooterContainer>
  );
}

export default Footer;
