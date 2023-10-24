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
  
  const [inputErrorMessage, setInputErrorMessage] = useState("");
  const [isInvalidInput, setInputValidate] = useState(true);
  
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
      
      setInputValidate(false)
      setInputErrorMessage(error.message);
     
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

            <FormInputErrorMessage visibility={isInvalidInput}>{inputErrorMessage}</FormInputErrorMessage>
            <FormInputFullField
              type="text"
              placeholder="Nome completo"
              value={name}
              onChange={(e: any) => setName(e.target.value)}
            />
            <FormInputHalfField
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e: any) => setEmail(e.target.value)}
            />
            <FormInputHalfField
              type="tel"
              placeholder="Telefone"
              value={phone}
              onChange={(e: any) => setPhone(e.target.value)}
            />
            <FormInputFullField
              type="text"
              placeholder="CPF"
              inputMode="numeric"
              value={cpf}
              onChange={(e: any) => setCPF(e.target.value)}
            />
            <FormInputFullField
              type="date"
              placeholder="Data de nascimento"
              value={birthday}
              onChange={(e: any) => setBirthday(e.target.value)}
            />
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
