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
import HeaderSignIn from "../../components/headerSignIn/headerSignIn";

function SignIn() {
  const { signIn } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [inputErrorMessage, setInputErrorMessage] = useState("");

  const userSignIn = () => {
    const { error } = signInSchema.validate({ email, password }); // Valida email e senha
    if (error) {
      // Executa se error contiver conteúdo
      setInputErrorMessage(error.message); // Atualiza mensagem de erro

    } else {
      // Remove qualquer configuração de estado inválido
      setInputErrorMessage("");
      
      try {
        signIn(email, password);
      } catch (e: any) {
        setInputErrorMessage(e.message);
      }
    }
  };

  return (
    <>
      <HeaderSignIn />
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
            <FormInputErrorMessage hidden={inputErrorMessage.length === 0}>{inputErrorMessage}</FormInputErrorMessage>
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
