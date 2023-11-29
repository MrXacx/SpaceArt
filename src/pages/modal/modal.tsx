import {
  FormInputButton,
  FormInputFullField,
  FormInputHalfField,
  FormInputTextbox,
  HeaderLogo,
  InnerContainer,
  MainSignUpContainer,
  SignContainer,
} from "./modalStyles";

function Modal() {
  return (
    <MainSignUpContainer>
      <InnerContainer>
        <HeaderLogo>
          <h1>Nova seleção</h1>
        </HeaderLogo>
        <SignContainer>
          <FormInputFullField type="text" placeholder="Título" />
          <FormInputFullField type="text" placeholder="Arte" />
          <FormInputFullField type="text" placeholder="Valor" />
          <FormInputHalfField type="email" placeholder="Data de abertura" />
          <FormInputHalfField type="tel" placeholder="Data de encerramento" />
          <FormInputHalfField type="text" placeholder="Horário de iníco" />
          <FormInputHalfField
            type="text"
            placeholder="Horário de encerramento"
          />
          <FormInputTextbox type="textbox" placeholder="Descrição" />
          <FormInputButton>CRIAR CONTA</FormInputButton>
        </SignContainer>
      </InnerContainer>
    </MainSignUpContainer>
  );
}

export default Modal;
