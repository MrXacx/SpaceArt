import {
  FormInputButton,
  FormInputFullField,
  HeaderLogo,
  InnerContainer,
  MainSignInContainer,
  SignContainer,
  FormInputErrorMessage,
} from "./signInStyles";

import { useState, useContext } from "react";
import { signInSchema } from "../../schemas/user/SignInSchemas";
import { UserContext } from "../../contexts/UserContext";
import HeaderAltBlack from "../../components/headerAltBlack/headerAltBlack";

function SignIn() {
  const { signIn } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const [isValidInput, setValidInput] = useState('true');
  const [inputErrorMessage, setInputErrorMessage] = useState("");

  const userSignIn = () => {
    const { error } = signInSchema.validate({ email, password }); // Valida email e senha
    if (error) {
      // Executa se error contiver conteúdo
      setValidInput('false'); // Invalida estado do entrada
      setInputErrorMessage(error.message); // Atualiza mensagem de erro

    } else {
      // Remove qualquer configuração de estado inválido
      setValidInput('true');
      setInputErrorMessage("");
      signIn(email, password);
    }
  };

  return (
    <>
      <HeaderAltBlack />
      <MainSignInContainer>
        <InnerContainer>
          <HeaderLogo>
            <h1>Login</h1>
          </HeaderLogo>

          <SignContainer
            onSubmit={(e: any) => {
              e.preventDefault();
              userSignIn();
            }}
          >
            <FormInputErrorMessage visibility={isValidInput}>{inputErrorMessage}</FormInputErrorMessage>
            <FormInputFullField
              type="email"
              placeholder="Email"
              autoComplete="true"
              value={email}
              onChange={(e: any) => setEmail(e.target.value)}
            />

            <FormInputFullField
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e: any) => setPassword(e.target.value)}
            />

            <FormInputButton>Entrar</FormInputButton>

          </SignContainer>
        </InnerContainer>
      </MainSignInContainer>
    </>
  );
}

export default SignIn;
