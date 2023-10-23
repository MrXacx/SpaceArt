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
  const [isValidEmail, setValidEmail] = useState(true);
  const [isValidPassword, setValidPassword] = useState(true);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

  const userSignIn = () => {
    const { error } = signInSchema.validate({ email, password }); // Valida email e senha

    if (error) {
      // Executa se error contiver conteúdo

      if (error.message.includes("email")) {
        // Executa caso o erro mencione o campo email
        setValidEmail(false); // Invalida estado do email
        setEmailErrorMessage(error.message); // Atualiza mensagem de erro
      }
      if (error.message.includes("password")) {
        // Executa cado o erro mencione o campo password
        setValidPassword(false); // Invalida estado da senha
        setPasswordErrorMessage(error.message); // Atualiza mensagem de erro
      }
    } else {
      // Remove qualquer configuração de estado inválido
      setValidPassword(true);
      setEmailErrorMessage("");
      setValidPassword(false);
      setPasswordErrorMessage("");

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
          <SignContainer>

            <FormInputErrorMessage visibility={isValidEmail}>{emailErrorMessage}</FormInputErrorMessage>
            <FormInputFullField
              isWrong={!isValidPassword}
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e: any) => setEmail(e.target.value)}
            />
            <FormInputErrorMessage visibility={isValidPassword}>{passwordErrorMessage}</FormInputErrorMessage>
            <FormInputFullField
              isWrong={!isValidPassword}
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e: any) => setPassword(e.target.value)}
            />
              <FormInputButton onClick={userSignIn}>Entrar</FormInputButton>
          </SignContainer>
        </InnerContainer>
      </MainSignInContainer>
    </>
  );
}

export default SignIn;
