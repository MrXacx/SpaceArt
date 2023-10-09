import SpaceartLogo from "../../assets/spaceart.svg";
import { FormInputFullField } from "../signIn/signInStyles";
import {
  FormInputButton,
  FormInputHalfField,
  HeaderLogo,
  InnerContainer,
  MainSignInContainer,
  SignContainer,
} from "./signUpStyles";

function SignInEnterprise() {
  return (
    <MainSignInContainer>
      <InnerContainer>
        <HeaderLogo>
          <img alt="Space art logo" src={SpaceartLogo} />
          <h1>Cadastro de artista</h1>
        </HeaderLogo>
        <SignContainer>
          <FormInputFullField type="text" placeholder="Nome fantansia" />
          <FormInputFullField type="text" placeholder="Razão social" />
          <FormInputHalfField type="email" placeholder="Email" />
          <FormInputHalfField type="tel" placeholder="Telefone" />
          <FormInputFullField type="text" placeholder="CNPJ" />
          <FormInputFullField type="text" placeholder="Setor de atuação" />
          <FormInputFullField type="text" placeholder="CEP" />
          <FormInputHalfField type="text" placeholder="Cidade" />
          <FormInputHalfField type="text" placeholder="UF" />
          <FormInputHalfField type="text" placeholder="Bairro" />
          <FormInputHalfField type="text" placeholder="Endereço" />
          <FormInputHalfField type="password" placeholder="Senha" />
          <FormInputHalfField type="password" placeholder="Repita sua senha" />
          <FormInputButton>CRIAR CONTA</FormInputButton>
        </SignContainer>
      </InnerContainer>
    </MainSignInContainer>
  );
}

export default SignInEnterprise;
