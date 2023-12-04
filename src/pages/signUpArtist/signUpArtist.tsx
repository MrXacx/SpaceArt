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

    let { error } = artistSignUpSchema.validate(userData); // Obtains message error, if hesitate 

    if (!error) {
      dayjs.extend(relativeTime);
      const dateDiff = parseInt(dayjs(birthday).toNow(true).substring(0, 2)); // Gets user age

      if (dateDiff >= 18) {
        setInputErrorMessage("");

        userData.location = { CEP, state, city };

        // Delete non-utilized items
        delete userData.CEP;
        delete userData.state;
        delete userData.city;
        delete userData.repeatPassword;

        signUpArtist(userData);
        return;
      }

      error = new Error("A user must be 18 years old or older.");
    }

    setInputErrorMessage(error.message);
  };

  return (
    <>
      <HeaderAlt
        altPageRoute="/signUp/enterprise"
        altPageTitle="ENTREPRENEUR"
      />
      <MainSignUpContainer>
        <InnerContainer>
          <HeaderLogo>
            <img alt="Space art logo" src={SpaceartLogo} />
            <h1>Artist registration</h1>
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
              placeholder="Full name"
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
              placeholder="Phone number"
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
              placeholder="Birthday"
              value={birthday}
              onChange={(e: any) => setBirthday(e.target.value)}
            />
            <FormSelectField
              value={art}
              onChange={(e: any) => setArt(e.target.value)}
            >
              <option value="" disabled>
                Choose an artistic modality
              </option>
              {ArtTypesUtil.values().map((type: any) => (
                <option value={type}>{type}</option>
              ))}
            </FormSelectField>

            <FormInputFullField
              type="number"
              placeholder="Expected salary"
              value={wage > 0 ? wage : ""}
              onChange={(e: any) => setWage(e.target.value)}
            />

            <FormInputFullField
              type="text"
              placeholder="ZIP Code"
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
            <FormInputButton>CREATE ACCOUNT</FormInputButton>
          </SignContainer>
        </InnerContainer>
      </MainSignUpContainer>
      <Footer />
    </>
  );
}

export default SignUpArtist;
