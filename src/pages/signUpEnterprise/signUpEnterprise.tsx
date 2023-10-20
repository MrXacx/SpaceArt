import SpaceartLogo from "../../assets/spaceart.svg";
import Footer from "../../components/footer/footer";
import HeaderAlt from "../../components/headerAlt/headerAlt";
import { FormInputFullField } from "../signIn/signInStyles";
import {
  FormInputButton,
  FormInputHalfField,
  HeaderLogo,
  InnerContainer,
  MainSignUpContainer,
  SignContainer,
} from "./signUpStyles";

function SignUpEnterprise() {
  return (
    <>
      <HeaderAlt />
      <MainSignUpContainer>
        <InnerContainer>
          <HeaderLogo>
            <img alt="Space art logo" src={SpaceartLogo} />
            <h1>Cadastro do artista</h1>
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
            <FormInputHalfField
              type="password"
              placeholder="Repita sua senha"
            />
            <FormInputButton>CRIAR CONTA</FormInputButton>
          </SignContainer>
        </InnerContainer>
      </MainSignUpContainer>
      <Footer />
    </>
  );
}

export default SignUpEnterprise;
