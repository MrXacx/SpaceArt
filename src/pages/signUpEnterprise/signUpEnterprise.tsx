import SpaceartLogo from "../../assets/spaceart.svg";
import Footer from "../../components/footer/footer";
import HeaderAlt from "../../components/headerAltWhite/headerAltWhite";
import { FormInputFullField } from "../signIn/signInStyles";
import {
  FormInputButton,
  FormInputHalfField,
  HeaderLogo,
  InnerContainer,
  MainSignUpContainer,
  SignContainer,
  FormInputErrorMessage
} from "./signUpStyles";

import { useState, useContext } from "react";
import { CNPJWebClient } from "../../services/CNPJWebClient";
import { enterpriseSignUpSchema } from "../../schemas/user/SignUpSchemas";
import { UserContext } from "../../contexts/UserContext";
import { PostalCodeWebClient } from "../../services/PostalCodeWebClient";

function SignUpEnterprise() {
  const { SignUpEnterprise } = useContext(UserContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [section, setSection] = useState("");
  const [cnpj, setCNPJ] = useState("");
  const [cep, setCEP] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const [inputErrorMessage, setInputErrorMessage] = useState("");

  const [isValidInput, setInputValidate] = useState(true);

const searchCNPJ = (code: string) => {

  new CNPJWebClient()
    .fetch(code)
    .then(cnpj => {
      setName(cnpj.nameFantasy);
      setCompanyName(cnpj.companyName);
    })
    .catch(console.log);
  }

  const searchLocation = (code: string) => {

    new PostalCodeWebClient()
      .fetch(code)
      .then(location => {
        setState(location.state);
        setCity(location.city);
        setNeighborhood(location.neighborhood);
      })
      .catch(console.log);
  }


const userSignUp = () => {
  const userData: any = {
    name, email, phone, cnpj, companyName, cep, state, city, neighborhood, address, password, repeatPassword
  }

  let { error } = enterpriseSignUpSchema.validate(userData);
  if (error) {
    
    setInputErrorMessage(error.message);
    setInputValidate(false);

  } else {

    userData.location = { cep, state, city, neighborhood, address };
    delete userData.cep;
    delete userData.state;
    delete userData.city;
    delete userData.neighborhood;
    delete userData.address;
    delete userData.repeatPassword;
    SignUpEnterprise(userData);
  }
}

return (
  <>
    <HeaderAlt />
    <MainSignUpContainer>
      <InnerContainer>
        <HeaderLogo>
          <img alt="Space art logo" src={SpaceartLogo} />
          <h1>Cadastro de artista</h1>
        </HeaderLogo>
        <SignContainer onSubmit={(e: any) => {
          e.preventDefault();
          userSignUp();
        }}>
          <FormInputErrorMessage visibility={isValidInput}>{inputErrorMessage}</FormInputErrorMessage>
          <FormInputFullField
            type="text"
            placeholder="Nome fantasia"
            value={name}
            onChange={(e: any) => setName(e.target.value)}
            disabled
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
            placeholder="CNPJ"
            inputMode="numeric"
            value={cnpj}
            onChange={(e: any) => setCNPJ(e.target.value)}
          />
          
          <FormInputFullField
            type="text"
            placeholder="Setor de atuação"
            value={section}
            onChange={(e: any) => setSection(e.target.value)}
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
            type="text"
            placeholder="Bairro"
            value={city}
            onChange={(e: any) => setCity(e.target.value)}
            disabled
          />
          <FormInputHalfField
            type="text"
            placeholder="Endereço"
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
    </MainSignUpContainer>
    <Footer />
  </>
);
}
export default SignUpEnterprise;
