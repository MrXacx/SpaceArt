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
} from "./signUpStyles";
import { useState, useContext } from "react";
import { CNPJWebClient } from "../../services/CNPJWebClient";
import { enterpriseSignUpSchema } from "../../schemas/user/SignUpSchemas";
import { UserContext } from "../../contexts/UserContext";

// function SignUpEnterprise() {
//   return (
//     <>
//       <HeaderAlt />
//       <MainSignUpContainer>
//         <InnerContainer>
//           <HeaderLogo>
//             <img alt="Space art logo" src={SpaceartLogo} />
//             <h1>Cadastro do artista</h1>
//           </HeaderLogo>
//           <SignContainer>
//             <FormInputFullField type="text" placeholder="Nome fantansia" />
//             <FormInputFullField type="text" placeholder="Razão social" />
//             <FormInputHalfField type="email" placeholder="Email" />
//             <FormInputHalfField type="tel" placeholder="Telefone" />
//             <FormInputFullField type="text" placeholder="CNPJ" />
//             <FormInputFullField type="text" placeholder="Setor de atuação" />
//             <FormInputFullField type="text" placeholder="CEP" />
//             <FormInputHalfField type="text" placeholder="Cidade" />
//             <FormInputHalfField type="text" placeholder="UF" />
//             <FormInputHalfField type="text" placeholder="Bairro" />
//             <FormInputHalfField type="text" placeholder="Endereço" />
//             <FormInputHalfField type="password" placeholder="Senha" />
//             <FormInputHalfField
//               type="password"
//               placeholder="Repita sua senha"
//             />
//             <FormInputButton>CRIAR CONTA</FormInputButton>
//           </SignContainer>
//         </InnerContainer>
//       </MainSignUpContainer>
//       <Footer />
//     </>
//   );
// }
function SignUpEnterprise() {
  const { SignUpEnterprise } = useContext(UserContext);

  const [nameFantasy, setNameFantasy] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [razaoSocial, setRazaoSocial] = useState("");
  const [cnpj, setCNPJ] = useState("");
  const [cep, setCEP] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const [inputErrorMessage, setInputErrorMessage] = useState("");

  const [isValidInput, setInputValidate] = useState(true);

const searcCNPJ = (code: string) => {

  new CNPJWebClient()
    .fetch(code)
    .then(enter => {
      setCNPJ(enter.code)
      setRazaoSocial(enter.razaoSocial)
      setNameFantasy(enter.nomeFantasia);
    })
    .catch(console.log);
  }


const userSignUp = () => {
  const userData: any = {
    nameFantasy, email, phone, cnpj, razaoSocial, cep, state, city, password, repeatPassword
  }

  let { error } = enterpriseSignUpSchema.validate(userData);
  if (error) {
    const message = error.message;
    setInputErrorMessage(error.message);
    setInputValidate(false);
  } else {
    userData.location = { cep, state, city };
    delete userData.cep;
    delete userData.state;
    delete userData.city;
    delete userData.repeatPassword;
    SignUpEnterprise(userData);
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
          <FormInputErrorMessage visibility={isValidInput}>O nome deve ter entre 1 e 30 caracteres</FormInputErrorMessage>
          <FormInputFullField
            type="text"
            placeholder="Nome completo"
            value={nameFantasy}
            onChange={(e: any) => setNameFantasy(e.target.value)}
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
            placeholder="Razão Social"
            value={razaoSocial}
            onChange={(e: any) => setRazaoSocial(e.target.value)}
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
export default SignUpEnterprise;
