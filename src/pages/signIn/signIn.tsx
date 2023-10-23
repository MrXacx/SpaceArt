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
import { useState, useRef, useContext } from "react";
import { signInSchema } from "../../schemas/user/SignInSchemas";
import { UserContext } from "../../contexts/UserContext";

function SignIn() {
  const {signIn} = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValidEmail, setValidEmail] = useState(true);
  const [isValidPassword, setValidPassword] = useState(true);
  const [emailErrorMessage, setEmailErrorMessage] = useState("")
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("")

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);


  const userSignIn = () => {
    const { error } = signInSchema.validate({ email, password }); // Valida email e senha
    
    if (error) { // Executa se error contiver conteúdo

      if (error.message.includes("email")) { // Executa caso o erro mencione o campo email
        setValidEmail(false); // Invalida estado do email
        setEmailErrorMessage(error.message); // Atualiza mensagem de erro

      }
      if (error.message.includes("password")) { // Executa cado o erro mencione o campo password
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
    
  }

  return (
    <>
      <HeaderAlt />
      <MainSignInContainer>
        <InnerContainer>
          <HeaderLogo>
            <img alt="Space art logo" src={SpaceartLogo} />
            <h1>Login</h1>
          </HeaderLogo>
          <SignContainer>
            <FormInputFullField
              style={isValidEmail ? {} : { border: "1px red solid" }}
              type="email"
              placeholder="Email"
              ref={emailRef}
              value={email}
              onChange={e => setEmail(e.target.value)}
              onKeyDown={e => {
                if (e.key.toLocaleLowerCase() === "enter" && passwordRef.current) {
                  passwordRef.current.focus();
                }
              }}
            />
            <FormInputFullField
              style={isValidPassword ? {} : { border: "1px red solid" }}
              type="password"
              placeholder="Senha"
              ref={passwordRef}
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={e => {
                if (e.key.toLocaleLowerCase() === "enter") {
                  userSignIn();
                }
              }}
            />
            <FormInputButton onClick={userSignIn}>Entrar</FormInputButton>
          </SignContainer>
        </InnerContainer>
      </MainSignInContainer>
      <Footer />
    </>
  );
}

export default SignIn;
