import {
  SelectionCard,
  SelectionInnerContainer,
  SelectionMask,
  SelectionDetailHeader,
  SelectionHiddenDetailItem,
  SelectionHiddenDetail,
} from "./selectionBoxStyles";
import { useState } from "react";
import { ArtType } from "../../enums/ArtType";

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
        </SelectionHiddenDetail>
      </SelectionInnerContainer>
    </SelectionCard>
  );
}

export default SelectionBox;
