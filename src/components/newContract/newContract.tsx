import {
  FormInputButton,
  FormInputFullField,
  FormInputHalfField,
  FormInputTextbox,
  HeaderLogo,
  Icon,
  ModalContainer,
  SignContainer,
} from "./newContractStyles";
import XIcon from "../../assets/x.svg";
import { useContext, useState } from "react";
import { ModalContext } from "../../contexts/ModalContext";
import ArtistBoxCheck from "../artistBoxCheck/artistBoxCheck";
import { ArtType } from "../../enums/ArtType";

function NewContract() {
  const { hideModal, setHideModal } = useContext(ModalContext);

  const [art] = useState<ArtType>();
  const [price, setPrice] = useState(0.0);

  return (
    <ModalContainer>
      <HeaderLogo>
        <Icon alt="X" src={XIcon} onClick={() => setHideModal(!hideModal)} />
        <h1>Novo contrato</h1>
      </HeaderLogo>
      <SignContainer>
        <ArtistBoxCheck
          name={''}
          image={''}
          art={ArtType.dance}
          city={''}
          state={''}
        />
        <FormInputFullField value={art} type="text" placeholder="Arte" disabled/>
        <FormInputFullField
        type="number"
        placeholder="Valor"
        value={price.toFixed(2)}
        onChange={(e: any) => setPrice(e.target.value)}
        />
        <FormInputFullField type="text" placeholder="Data do evento" />
        <FormInputHalfField type="text" placeholder="Horário de início" />
        <FormInputHalfField type="text" placeholder="Horário de encerramento" />
        <FormInputTextbox type="textbox" placeholder="Descrição" />
        <FormInputButton>CRIAR CONTRATO</FormInputButton>
      </SignContainer>
    </ModalContainer>
  );
}

export default NewContract;
