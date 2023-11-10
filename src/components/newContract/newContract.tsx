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
import { SelectArtistContext } from "../../contexts/SelectArtistContext";
import ArtistBox from "../artistBox/artistBox";
import { ArtType, ArtTypesUtil } from "../../enums/ArtType";
import { agreementSchema } from "../../schemas/services/AgreementSchemas";

function NewContract() {
  const { hideModal, setHideModal } = useContext(ModalContext);
  const { artist } = useContext(SelectArtistContext);

  const selectedArtist = artist.toObject();

  const [art] = useState<ArtType>(ArtTypesUtil.parse(selectedArtist.art));
  const [price, setPrice] = useState(selectedArtist.wage);
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [description, setDescription] = useState('');
  const [inputErrorMessage, setInputErrorMessage] = useState('');
  const [isValidInput, setInputValidate] = useState('true');

  const createAgreement = () => {

    const { error } = agreementSchema.validate({
      art, price, date, startTime, endTime, description
    });

    if(error) {
      setInputValidate('false');
      setInputErrorMessage(error.message);
    } else {
      // Chama contexto
    }
  }

  return (
    <ModalContainer>
      <HeaderLogo>
        <Icon alt="X" src={XIcon} onClick={() => setHideModal(!hideModal)} />
        <h1>Novo contrato</h1>
      </HeaderLogo>
      <SignContainer onSubmit={(e: any) => {
        e.preventDefault();
        createAgreement();
      }}>
        <ArtistBox
          name={selectedArtist.name}
          image={selectedArtist.image}
          art={selectedArtist.art}
          cep={selectedArtist.location?.cep}
          city={selectedArtist.location?.city}
          state={selectedArtist.location?.state}
        />
        <FormInputFullField value={art} type="text" placeholder="Arte" disabled />
        <FormInputFullField
          type="number"
          placeholder="Valor"
          value={price.toFixed(2)}
          onChange={(e: any) => setPrice(e.target.value)}
        />
        <FormInputFullField
          type="date"
          placeholder="Data do evento"
          value={date}
          onChange={(e: any) => setDate(e.target.value)}
        />
        <FormInputHalfField
          type="time"
          placeholder="Horário de início"
          value={startTime}
          onChange={(e: any) => setStartTime(e.target.value)}
        />
        <FormInputHalfField
          type="time"
          placeholder="Horário de encerramento"
          value={endTime}
          onChange={(e: any) => setEndTime(e.target.value)}
        />
        <FormInputTextbox
          type="textbox"
          placeholder="Descrição"
          value={description}
          onChange={(e: any) => setDescription(e.target.value)}
        />
        <FormInputButton>CRIAR CONTRATO</FormInputButton>
      </SignContainer>
    </ModalContainer>
  );
}

export default NewContract;