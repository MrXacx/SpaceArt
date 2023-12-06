import {
  FormInputButton,
  FormInputFullField,
  FormInputHalfField,
  FormSelectField,
  HeaderLogo,
  Icon,
  InnerContainer,
  MainSignUpContainer,
  ModalContainer,
  SignContainer,
  Modal,
  FormInputErrorMessage,
} from "./newSelectionStyles";
import XIcon from "../../assets/x.svg";
import { useContext, useState } from "react";
import { ModalContext } from "../../contexts/ModalContext";
import { selectionSchema } from "../../schemas/services/SelectionSchemas";
import { UserContext } from "../../contexts/UserContext";
import { ArtType, ArtTypesUtil } from "../../enums/ArtType";
import dayjs from "dayjs";

function NewSelection() {
  const { hideNewSelection, toogleNewSelectionVisibility } =
    useContext(ModalContext);
  const { id, sendSelection } = useContext(UserContext);
  const [inputErrorMessage, setInputErrorMessage] = useState("");
  const [title, setTitle] = useState("");
  const [art, setArt] = useState<ArtType>();
  const [price, setPrice] = useState<number>();
  const [initialTime, setInitialTime] = useState("");
  const [finalTime, setFinalTime] = useState("");
  const [initialDate, setInitialDate] = useState("");
  const [finalDate, setFinalDate] = useState("");

  const createSelection = () => {
    const formatedInitialDate = dayjs(initialDate, "YYYY-MM-DD").format(
      "DD/MM/YYYY"
    );
    const formatedFinalDate = dayjs(finalDate, "YYYY-MM-DD").format(
      "DD/MM/YYYY"
    );

    let { error } = selectionSchema.validate({
      title,
      art,
      price,
      initialTime,
      finalTime,
      initialDate: formatedInitialDate,
      finalDate: formatedFinalDate,
    });

    const initialDayJS = dayjs(`${initialDate} ${initialTime}`);

    if (error) {
      // Execute in case exists format error
      setInputErrorMessage(error.message);
    } else if (!initialDayJS.isAfter()) {
      // Execute in case initial time doesn't be on a future period
      setInputErrorMessage(
        `${initialDate} ${initialTime} refer to a period in the past`
      );
    } else if (initialDayJS.isAfter(`${finalDate} ${finalTime}`, "minute")) {
      // Execute in case end time wouldn't be take place after initial time
      setInputErrorMessage(
        `${finalDate} ${finalTime} refer to a anterior period ${initialDate} ${initialTime}`
      );
    } else {
      // Execute in case error wouldn't be found

      sendSelection({
        owner: id,
        title,
        price,
        art,
        initialDate: formatedInitialDate,
        finalDate: formatedFinalDate,
        initialTime,
        finalTime,
      })
        .then(() => toogleNewSelectionVisibility())
        .catch((e: any) => {
          console.log(e.message);
          setInputErrorMessage("Ocorreu uma falha na criação da seleção");
        });
    }
  };
  return (
    <Modal hidden={hideNewSelection}>
      <ModalContainer>
        <MainSignUpContainer>
          <InnerContainer>
            <HeaderLogo>
              <Icon
                alt="X"
                src={XIcon}
                onClick={() => toogleNewSelectionVisibility()}
              />
              <h1>New selection</h1>
            </HeaderLogo>
            <SignContainer
              onSubmit={(e: any) => {
                e.preventDefault();
                createSelection();
              }}
            >
              <FormInputErrorMessage hidden={inputErrorMessage.length === 0}>
                {inputErrorMessage}
              </FormInputErrorMessage>
              <FormInputFullField
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e: any) => setTitle(e.target.value)}
              />
              <FormSelectField
                value={art}
                onChange={(e: any) => setArt(e.target.value)}
              >
                <option disabled selected>
                  Art
                </option>
                {ArtTypesUtil.values().map((item) => (
                  <option value={item}>{item}</option>
                ))}
              </FormSelectField>
              <FormInputFullField
                type="number"
                placeholder="Valor"
                value={price}
                onChange={(e: any) => setPrice(e.target.value)}
              />
              <FormInputHalfField
                type="date"
                placeholder="Data de abertura"
                value={initialDate}
                onChange={(e: any) => setInitialDate(e.target.value)}
              />
              <FormInputHalfField
                type="date"
                placeholder="Data de encerramento"
                value={finalDate}
                onChange={(e: any) => setFinalDate(e.target.value)}
              />
              <FormInputHalfField
                type="time"
                placeholder="Horário de inicío"
                value={initialTime}
                onChange={(e: any) => setInitialTime(e.target.value)}
              />
              <FormInputHalfField
                type="time"
                placeholder="Horário de encerramento"
                value={finalTime}
                onChange={(e: any) => setFinalTime(e.target.value)}
              />
              <FormInputButton>CREATE ACCOUNT</FormInputButton>
            </SignContainer>
          </InnerContainer>
        </MainSignUpContainer>
      </ModalContainer>
    </Modal>
  );
}

export default NewSelection;
