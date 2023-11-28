import SpaceartLogo from "../../assets/spaceart.svg";
import Footer from "../../components/footer/footer";
import HeaderAlt from "../../components/headerSignUp/headerSignUp";
import {
  FormInputButton,
  FormInputFullField,
  FormInputHalfField,
  FormSelectField,
  HeaderLogo,
  InnerContainer,
  MainSignUpContainer,
  SignContainer,
  FormInputErrorMessage,
} from "./signUpStyles";

import { useState, useContext } from "react";
import { PostalCodeWebClient } from "../../services/PostalCodeWebClient";
import { artistSignUpSchema } from "../../schemas/user/SignUpSchemas";
import { UserContext } from "../../contexts/UserContext";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { ArtTypesUtil } from "../../enums/ArtType";

function SignUpArtist() {
  const { signUpArtist } = useContext(UserContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [CPF, setCPF] = useState("");
  const [birthday, setBirthday] = useState("");
  const [wage, setWage] = useState(0);
  const [art, setArt] = useState("");
  const [CEP, setCEP] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [inputErrorMessage, setInputErrorMessage] = useState("");

  const searchLocation = (code: string) => {
    new PostalCodeWebClient()
      .fetch(code)

      .then((location: any) => {
        setState(location.state);
        setCity(location.city);
      })
      .catch(console.log);
  };

  const userSignUp = () => {
    const userData: any = {
      name,
      email,
      phone,
      CPF,
      birthday: dayjs(birthday).format("DD/MM/YYYY"),
      art,
      wage,
      CEP,
      state,
      city,
      password,
      repeatPassword,
    };

    let { error } = artistSignUpSchema.validate(userData); // Obtém mensagem de erro, caso exita

    if (!error) {
      dayjs.extend(relativeTime);
      const dateDiff = parseInt(dayjs(birthday).toNow(true).substring(0, 2)); // Obtém idade do usuário

      if (dateDiff >= 18) {
        setInputErrorMessage("");

        userData.location = { CEP, state, city };

        // Apaga itens não utilizados
        delete userData.CEP;
        delete userData.state;
        delete userData.city;
        delete userData.repeatPassword;

        signUpArtist(userData);
        return;
      }

      error = new Error("O usuário deve ter 18 anos ou mais.");
    }

    setInputErrorMessage(error.message);
  };

  return (
    <>
      <HeaderAlt
        altPageRoute="/signUp/enterprise"
        altPageTitle="SOU EMPREENDEDOR"
      />
      <MainSignUpContainer>
        <InnerContainer>
          <HeaderLogo>
            <img alt="Space art logo" src={SpaceartLogo} />
            <h1>Cadastro de artista</h1>
          </HeaderLogo>
          <SignContainer
            onSubmit={(e: any) => {
              e.preventDefault();
              userSignUp();
            }}
          >
            <FormInputErrorMessage hidden={inputErrorMessage.length === 0}>
              {inputErrorMessage}
            </FormInputErrorMessage>

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
              value={CPF}
              onChange={(e: any) => setCPF(e.target.value)}
            />

            <FormInputFullField
              type="date"
              placeholder="Data de nascimento"
              value={birthday}
              onChange={(e: any) => setBirthday(e.target.value)}
            />
            <FormSelectField
              value={art}
              onChange={(e: any) => setArt(e.target.value)}
            >
              <option value="" disabled>
                Escolha uma modalidade artística
              </option>
              {ArtTypesUtil.values().map((type: any) => (
                <option value={type}>{type}</option>
              ))}
            </FormSelectField>

            <FormInputFullField
              type="number"
              placeholder="Pretensão salarial"
              value={wage > 0 ? wage : ""}
              onChange={(e: any) => setWage(e.target.value)}
            />

            <FormInputFullField
              type="text"
              placeholder="CEP"
              inputMode="numeric"
              value={CEP}
              onChange={(e: any) => {
                setCEP(e.target.value);
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
      </MainSignUpContainer>
      <Footer />
    </>
  );
}

export default SignUpArtist;
