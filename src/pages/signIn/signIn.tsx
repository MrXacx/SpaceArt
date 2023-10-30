import {
  FormInputButton,
  FormInputFullField,
  HeaderLogo,
  InnerContainer,
  MainSignInContainer,
  SignContainer,
  FormInputErrorMessage,
} from "./signInStyles";
<<<<<<< HEAD

=======
>>>>>>> 33f828e (feed typescript)
import { useState, useContext } from "react";
import { signInSchema } from "../../schemas/user/SignInSchemas";
import { UserContext } from "../../contexts/UserContext";
import HeaderAltBlack from "../../components/headerAltBlack/headerAltBlack";

function SignIn() {
  const { signIn } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
<<<<<<< HEAD
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
=======
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

>>>>>>> 33f828e (feed typescript)
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
<<<<<<< HEAD
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
              type="text"
=======
          <SignContainer onSubmit={(e: any) => {
            e.preventDefault();
            userSignIn()
          }}>

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
>>>>>>> 33f828e (feed typescript)
              placeholder="Senha"
              value={password}
              onChange={(e: any) => setPassword(e.target.value)}
            />
<<<<<<< HEAD
            <FormInputButton>Entrar</FormInputButton>
=======
              <FormInputButton>Entrar</FormInputButton>
>>>>>>> 33f828e (feed typescript)
          </SignContainer>
        </InnerContainer>
      </MainSignInContainer>
    </>
  );
}

export default SignIn;
