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
  date: string[];
  time: string[];
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
            <span>{`${props.date[0]} - ${props.date[1]}`}</span>
          </SelectionHiddenDetailItem>
          <SelectionHiddenDetailItem>
            <span>Horário de início</span>
            <span>{props.time[0]}</span>
          </SelectionHiddenDetailItem>
          <SelectionHiddenDetailItem>
            <span>Horário de encerramento</span>
            <span>{props.time[0]}</span>
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
