import {
  SelectionCard,
  SelectionInnerContainer,
  SelectionMask,
  SelectionDetailHeader,
  SelectionHiddenDetailItem,
  SelectionHiddenDetail,
  SelectionOptions,
  SelectionOptionButton,
} from "./selectionBoxStyles";
import { useState, useContext } from "react";
import { ArtType } from "../../enums/ArtType";
import { UserContext } from "../../contexts/UserContext";
import { SelectSelectionContext } from "../../contexts/SelectSelectionContext";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat"; 
import { Enterprise } from "../../api/User";
import { ModalContext } from "../../contexts/ModalContext";

interface SelectionBoxProps {
  id: string;
  title: string;
  art: ArtType,
  price: number;
  date: {
    start: string,
    end: string,
  };
  time: {
    start: string,
    end: string,
  };
  locked: boolean;
  description: string;
}


function SelectionBox(props: SelectionBoxProps) {
  const [isOpened, setOpened] = useState(false);
  const { deleteSelection } = useContext(UserContext);
  const { setSelection } = useContext(SelectSelectionContext);
  const { toogleSelectArtistVisibility } = useContext(ModalContext);

  dayjs.extend(customParseFormat);
  const isAfter = dayjs(`${props.date.end} ${props.time.end}`, 'DD/MM/YYYY HH:mm').isAfter();


  return (
    <SelectionCard>
      <SelectionInnerContainer>
        <SelectionMask opened={isOpened}>
          <SelectionDetailHeader>
            <span>{props.art}</span>
            <h3>{props.title}</h3>
          </SelectionDetailHeader>
          <input type="checkbox" onClick={() => setOpened(!isOpened)} />
        </SelectionMask>
        <SelectionHiddenDetail opened={isOpened}>
          <SelectionHiddenDetailItem>
            <span>Preço</span>
            <span>{`R$${props.price}`}</span>
          </SelectionHiddenDetailItem>
          <SelectionHiddenDetailItem>
            <span>Período</span>
            <span>{`${props.date.start} - ${props.date.end}`}</span>
          </SelectionHiddenDetailItem>
          <SelectionHiddenDetailItem>
            <span>Horário de início</span>
            <span>{props.time.start}</span>
          </SelectionHiddenDetailItem>
          <SelectionHiddenDetailItem>
            <span>Horário de encerramento</span>
            <span>{props.time.end}</span>
          </SelectionHiddenDetailItem>
          <SelectionHiddenDetailItem>
            <span>Descrição</span>
            <span>{props.description}</span>
          </SelectionHiddenDetailItem>

          <SelectionOptions>
            <SelectionOptionButton type="button" hidden={isAfter  && props.locked } danger={true} onClick={() => deleteSelection(props.id)}>Deletar</SelectionOptionButton>
            <SelectionOptionButton type="button" hidden={!isAfter} onClick={() => {
              setSelection(new Enterprise(props.id))
              toogleSelectArtistVisibility()
              }}>Obter resultados</SelectionOptionButton>
          </SelectionOptions>

        </SelectionHiddenDetail>
      </SelectionInnerContainer>
    </SelectionCard>
  );
}

export default SelectionBox;
