import {
  FormInputButton,
  FormInputFullField,
  FormInputHalfField,
  FormInputTextbox,
  HeaderLogo,
  Icon,
  ModalContainer,
  SignContainer,
  FormInputErrorMessage,
} from "./newContractStyles";
import XIcon from "../../assets/x.svg";
import { useContext, useState, useEffect } from "react";
import { ModalContext } from "../../contexts/ModalContext";
import { SelectArtistContext } from "../../contexts/SelectArtistContext";
import { UserContext } from "../../contexts/UserContext";
import ArtistBox from "../artistBox/artistBox";
import { ArtType, ArtTypesUtil } from "../../enums/ArtType";
import { agreementSchema } from "../../schemas/services/AgreementSchemas";
import dayjs from "dayjs";

function NewContract() {
  const { hideModal, setHideModal } = useContext(ModalContext);
  const { id, sendAgreement } = useContext(UserContext);
  const { artist } = useContext(SelectArtistContext);

  const selectedArtist = artist?.toObject() ?? {};

  const [art, setArt] = useState<ArtType>();
  const [price, setPrice] = useState(0);
  const [date, setDate] = useState('');
  const [initialTime, setInitialTime] = useState('');
  const [finalTime, setFinalTime] = useState('');
  const [description, setDescription] = useState('');
  const [inputErrorMessage, setInputErrorMessage] = useState('');
  const [isValidInput, setInputValidate] = useState('true');

  useEffect(() => {
    try { // Substitui dados pelos valores do artista selecionado
      setArt(ArtTypesUtil.parse(selectedArtist.art));
      setPrice(selectedArtist.wage);
    } catch (e: any) {
      setPrice(0);
      setArt(undefined);
    }
  }, [setArt, selectedArtist]);

  const createAgreement = () => {
    const formatedDate = dayjs(date).format('DD/MM/YYYY');

    const { error } = agreementSchema.validate({
      art, price, date: formatedDate, initialTime, finalTime, description
    });

    if (error) {
      setInputValidate('false');
      setInputErrorMessage(error.message);

    } else {
      setInputValidate('true');
      setInputErrorMessage('');
      sendAgreement({
        hirer: id,
        hired: selectedArtist.id,
        art,
        price,
        date: formatedDate,
        initialTime,
        finalTime,
        description
      })
        .then(() => alert('criou'));
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
        <FormInputErrorMessage hidden={isValidInput}>{inputErrorMessage}</FormInputErrorMessage>
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
          value={initialTime}
          onChange={(e: any) => setInitialTime(e.target.value)}
        />
        <FormInputHalfField
          type="time"
          placeholder="Horário de encerramento"
          value={finalTime}
          onChange={(e: any) => setFinalTime(e.target.value)}
        />
        <FormInputTextbox
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
