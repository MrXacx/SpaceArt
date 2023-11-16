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
import { Enterprise } from "../../api/User";

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
            <SelectionOptionButton hidden={!dayjs().isBefore(`${props.date.end} ${props.time.end}`, 'minutes')} danger={true} onClick={() => deleteSelection(props.id)}>Deletar</SelectionOptionButton>
            <SelectionOptionButton hidden={!dayjs().isAfter(`${props.date.start} ${props.time.start}`)} onClick={() => setSelection(new Enterprise(props.id))}>Obter resultados</SelectionOptionButton>
          </SelectionOptions>

        </SelectionHiddenDetail>
      </SelectionInnerContainer>
    </SelectionCard>
  );
}

export default SelectionBox;
