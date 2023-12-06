import SpaceartLogo from "../../assets/spaceart.svg";
import Footer from "../../components/footer/footer";
import HeaderAlt from "../../components/headerSignUp/headerSignUp";
import {
  FormInputButton,
  FormInputFullField,
  FormInputHalfField,
  HeaderLogo,
  InnerContainer,
  MainSignUpContainer,
  SignContainer,
  FormInputErrorMessage,
  FormSelectField,
} from "./signUpStyles";

import { useState, useContext } from "react";
import { CNPJWebClient } from "../../services/CNPJWebClient";
import { enterpriseSignUpSchema } from "../../schemas/user/SignUpSchemas";
import { UserContext } from "../../contexts/UserContext";
import { PostalCodeWebClient } from "../../services/PostalCodeWebClient";

function SignUpEnterprise() {
  const { signUpEnterprise } = useContext(UserContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [section, setSection] = useState("");
  const [CNPJ, setCNPJ] = useState("");
  const [CEP, setCEP] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const [inputErrorMessage, setInputErrorMessage] = useState("");

  const businessSections = [
    "arts",
    "trade",
    "education",
    "engineering",
    "finance",
    "health",
    "transportation",
  ].sort((a: string, b: string) => a.localeCompare(b));

  const searchCNPJ = (code: string) => {
    new CNPJWebClient()
      .fetch(code)
      .then((CNPJ) => {
        setName(CNPJ.nameFantasy);
        setCompanyName(CNPJ.companyName);
      })
      .catch(console.log);
  };

  const searchLocation = (code: string) => {
    new PostalCodeWebClient()
      .fetch(code)
      .then((location) => {
        setState(location.state);
        setCity(location.city);
        setNeighborhood(location.neighborhood);
      })
      .catch(console.log);
  };

  const userSignUp = () => {
    const userData: any = {
      name,
      email,
      phone,
      CNPJ,
      section,
      companyName,
      CEP,
      state,
      city,
      neighborhood,
      address,
      password,
      repeatPassword,
    };

    let { error } = enterpriseSignUpSchema.validate(userData);
    if (error) {
      setInputErrorMessage(error.message);
    } else {
      userData.location = { CEP, state, city, neighborhood, address };

      // Remove itens que não são esperados no contexto
      delete userData.CEP;
      delete userData.state;
      delete userData.city;
      delete userData.neighborhood;
      delete userData.address;
      delete userData.repeatPassword;

      signUpEnterprise(userData);
    }
  };

  return (
    <>
      <HeaderAlt altPageRoute="/signUp/artist" altPageTitle="ARTIST" />
      <MainSignUpContainer>
        <InnerContainer>
          <HeaderLogo>
            <img alt="Space art logo" src={SpaceartLogo} />
            <h1>Entrepreneur registration</h1>
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
              placeholder="Nickname"
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
              placeholder="Phone number"
              value={phone}
              onChange={(e: any) => setPhone(e.target.value)}
            />

            <FormInputFullField
              type="text"
              placeholder="CNPJ"
              inputMode="numeric"
              value={CNPJ}
              onChange={(e: any) => {
                const CNPJ = e.target.value;
                setCNPJ(CNPJ);
                if (CNPJ.length === 14) searchCNPJ(CNPJ);
              }}
            />

            <FormSelectField
              value={section}
              onChange={(e: any) => setSection(e.target.value)}
            >
              <option value="" disabled>
                Choose an industry
              </option>
              {businessSections.map((section) => (
                <option value={section}>{section}</option>
              ))}
            </FormSelectField>

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
              placeholder="City"
              value={city}
              onChange={(e: any) => setCity(e.target.value)}
              disabled
            />

            <FormInputHalfField
              type="text"
              placeholder="State"
              value={state}
              onChange={(e: any) => setState(e.target.value)}
              disabled
            />

            <FormInputHalfField
              type="text"
              placeholder="Neighborhood"
              value={neighborhood}
              onChange={(e: any) => setNeighborhood(e.target.value)}
              disabled
            />
            <FormInputHalfField
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e: any) => setAddress(e.target.value)}
            />

            <FormInputHalfField
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e: any) => setPassword(e.target.value)}
            />
            <FormInputHalfField
              type="password"
              placeholder="Repeat password"
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
export default SignUpEnterprise;
