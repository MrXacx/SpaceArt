import {
  FormInputButton,
  FormInputFullField,
  HeaderLogo,
  InnerContainer,
  MainSignInContainer,
  SignContainer,
} from "./signInStyles";
import SpaceartLogo from "../../assets/spaceart.svg";
import HeaderAlt from "../../components/headerAlt/headerAlt";
import Footer from "../../components/footer/footer";

function SignIn() {
  return (
    <>
      <HeaderAlt />
      <MainSignInContainer>
        <InnerContainer>
          <HeaderLogo>
            <img alt="Space art logo" src={SpaceartLogo} />
            <h1>Cadastro de artista</h1>
          </HeaderLogo>
          <SignContainer>
            <FormInputFullField type="email" placeholder="Email" />
            <FormInputFullField type="password" placeholder="Senha" />
            <FormInputButton>Entrar</FormInputButton>
          </SignContainer>
        </InnerContainer>
      </MainSignInContainer>
      <Footer />
    </>
  );
}

export default SignIn;
