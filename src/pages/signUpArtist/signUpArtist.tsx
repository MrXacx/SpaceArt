
import SpaceartLogo from "../../assets/spaceart.svg";
import { FormInputButton, FormInputFullField, FormInputHalfField, HeaderLogo, InnerContainer, MainSignInContainer, SignContainer } from "./signUpStyles";

function SignUpArtist() {
  return (
    <MainSignInContainer>
      <InnerContainer>
        <HeaderLogo>
          <img alt="Space art logo" src={SpaceartLogo} />
          <h1>Cadastro de artista</h1>
        </HeaderLogo>
        <SignContainer>
          <FormInputFullField type="text" placeholder="Nome completo" />
          <FormInputHalfField type="email" placeholder="Email" />
          <FormInputHalfField type="tel" placeholder="Telefone" />
          <FormInputFullField type="text" placeholder="CPF" />
          <FormInputFullField type="date" placeholder="Data de nascimento" />
          <FormInputFullField type="text" placeholder="CEP" />
          <FormInputHalfField type="text" placeholder="Cidade" />
          <FormInputHalfField type="text" placeholder="UF" />
          <FormInputHalfField type="password" placeholder="Senha" />
          <FormInputHalfField type="password" placeholder="Repita sua senha" />
          <FormInputButton>CRIAR CONTA</FormInputButton>
        </SignContainer>
      </InnerContainer>
    </MainSignInContainer>
  );
}

export default SignUpArtist;