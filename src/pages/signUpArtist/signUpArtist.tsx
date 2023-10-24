import SpaceartLogo from "../../assets/spaceart.svg";
import Footer from "../../components/footer/footer";
import HeaderAlt from "../../components/headerAltWhite/headerAltWhite";
import {
  FormInputButton,
  FormInputFullField,
  FormInputHalfField,
  HeaderLogo,
  InnerContainer,
  MainSignInContainer,
  SignContainer,
  FormInputErrorMessage,
} from "./signUpStyles";

import { useState, useContext } from "react";
import { PostalCodeWebClient } from "../../services/PostalCodeWebClient";
import { artistSignUpSchema } from "../../schemas/user/SignUpSchemas";
import { UserContext } from "../../contexts/UserContext";

function SignUpArtist() {
  const { signUpArtist } = useContext(UserContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [cpf, setCPF] = useState("");
  const [birthday, setBirthday] = useState("");
  const [cep, setCEP] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const [cepErrorMessage, setCEPErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [birthdayErrorMessage, setBirthdayErrorMessage] = useState("");

  const [isValidEmail, setEmailValidate] = useState(true);
  const [isValidName, setNameValidate] = useState(true);
  const [isValidPhone, setPhoneValidate] = useState(true);
  const [isValidCPF, setCPFValidate] = useState(true);
  const [isValidCEP, setCEPValidate] = useState(true);
  const [isValidBirthday, setBirthdayValidate] = useState(true);
  const [isValidPassword, setPasswordValidate] = useState(true);
  
  const searchLocation = (code: string) => {

    new PostalCodeWebClient()
      .fetch(code)
      .then(location => {
        setState(location.state)
        setCity(location.city);
      })
      .catch(console.log);
  }

  const userSignUp = () => {
    const userData: any = {
      name, email, phone, cpf, birthday, cep, state, city, password, repeatPassword
    }

    let { error } = artistSignUpSchema.validate(userData);
    if (error) {
      const message = error.message;
      if (message.includes("name")) {

        setNameValidate(false);

      } else if (message.includes("phone")) {

        setPhoneValidate(false);

      } else if (message.includes("bithday")) {

        setBirthdayValidate(false);
        setBirthdayErrorMessage("A data deve estar no formato DD/MM/AAAA");

      } else if (message.includes("cep")) {

        setCEPValidate(false);
        setCEPErrorMessage("CEP deve conter 8 dígitos");

      } else if (message.includes("cpf")) {
        setCPFValidate(false);
      } else if (message.includes("state") || message.includes("city")) {

        setCEPValidate(false);
        setCEPErrorMessage("CEP não localizado");

      } else if (message.includes("password")) {

        setPasswordValidate(false);
        setPasswordErrorMessage(message);
        
      } else if (message.includes("repeatPassword")) {
        setPasswordValidate(false);
        setPasswordErrorMessage("As senhas devem ser idênticas");
      }

    } else {
      userData.location = { cep, state, city };
      delete userData.cep;
      delete userData.state;
      delete userData.city;
      delete userData.repeatPassword;
      signUpArtist(userData);
    }
  }

  return (
    <>
      <HeaderAlt />
      <MainSignInContainer>
        <InnerContainer>
          <HeaderLogo>
            <img alt="Space art logo" src={SpaceartLogo} />
            <h1>Cadastro de artista</h1>
          </HeaderLogo>
          <SignContainer onSubmit={(e: any) => {
            e.preventDefault();
            userSignUp();
          }}>
            <FormInputErrorMessage visibility={isValidName}>O nome deve ter entre 1 e 30 caracteres</FormInputErrorMessage>
            <FormInputFullField
              type="text"
              placeholder="Nome completo"
              value={name}
              onChange={(e: any) => setName(e.target.value)}
            />
            <FormInputErrorMessage visibility={isValidEmail}>O email apresentado é inválido</FormInputErrorMessage>
            <FormInputHalfField
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e: any) => setEmail(e.target.value)}
            />
            <FormInputErrorMessage visibility={isValidPhone}>O número de celular apresentado é inválido</FormInputErrorMessage>
            <FormInputHalfField
              type="tel"
              placeholder="Telefone"
              value={phone}
              onChange={(e: any) => setPhone(e.target.value)}
            />
            <FormInputErrorMessage visibility={isValidCPF}>O CPF deve conter 11 dígitos</FormInputErrorMessage>
            <FormInputFullField
              type="text"
              placeholder="CPF"
              inputMode="numeric"
              value={cpf}
              onChange={(e: any) => setCPF(e.target.value)}
            />
            <FormInputErrorMessage visibility={isValidBirthday}>{passwordErrorMessage}</FormInputErrorMessage>
            <FormInputFullField
              type="date"
              placeholder="Data de nascimento"
              value={birthday}
              onChange={(e: any) => setBirthday(e.target.value)}
            />
            <FormInputErrorMessage visibility={isValidCEP}>{cepErrorMessage}</FormInputErrorMessage>
            <FormInputFullField
              type="text"
              placeholder="CEP"
              inputMode="numeric"
              value={cep}
              onChange={(e: any) => {
                setCEP(e.target.value)
                if (e.target.value.length === 8) {
                  searchLocation(e.target.value);
                }
              }}
            />
            <FormInputHalfField
              type="text"
              placeholder="Cidade"
              value={city}
              onChange={(e: any) => setCity(e.target.value)}
              disabled
            />
            <FormInputHalfField
              type="text"
              placeholder="UF"
              value={state}
              onChange={(e: any) => setState(e.target.value)}
              disabled
            />
                <FormInputErrorMessage visibility={isValidPassword}>{passwordErrorMessage}</FormInputErrorMessage>
            <FormInputHalfField
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e: any) => setPassword(e.target.value)}
            />
            <FormInputHalfField
              type="password"
              placeholder="Repita sua senha"
              value={repeatPassword}
              onChange={(e: any) => setRepeatPassword(e.target.value)}
            />
            <FormInputButton>CRIAR CONTA</FormInputButton>
          </SignContainer>
        </InnerContainer>
      </MainSignInContainer>
      <Footer />
    </>
  );
}

export default SignUpArtist;
