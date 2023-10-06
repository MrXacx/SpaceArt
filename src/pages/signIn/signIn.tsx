import {
  FormInputButton,
  FormInputFullField,
  HeaderLogo,
  InnerContainer,
  MainSignInContainer,
  SignContainer,
} from "./signInStyles";
import SpaceartLogo from "../../assets/spaceart.svg";

function SignIn() {
  return (
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
  );
}

export default SignIn;
