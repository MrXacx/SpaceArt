import {
  ContractCard,
  ContractInnerContainer,
  ContractMask,
  ContractDetailHeader,
  ContractHiddenDetailItem,
  ContractHiddenDetail,
} from "./contractBoxStyles";
import { useState } from "react";
import { ArtType } from "../../enums/ArtType";

interface ContractBoxProps {
  id: string;
  art: ArtType,
  date: string,
  price: number;
  time: {
    start: string,
    end: string,
  };
  description: string;
  status: string;
}


function ContractBox(props: ContractBoxProps) {
  const [isOpened, setOpened] = useState(false);

  return (
    <ContractCard>
      <ContractInnerContainer>
        <ContractMask opened={isOpened}>
          <ContractDetailHeader>
            <span>{props.art}</span>
            <h3>{props.date}</h3>
          </ContractDetailHeader>
          <input type="checkbox" onClick={() => setOpened(!isOpened)} />
        </ContractMask>
        <ContractHiddenDetail opened={isOpened}>
          <ContractHiddenDetailItem>
            <span>Preço</span>
            <span>{`R$${props.price}`}</span>
          </ContractHiddenDetailItem>
          <ContractHiddenDetailItem>
            <span>Período</span>
            <span>{`${props.time.start} - ${props.time.end}`}</span>
          </ContractHiddenDetailItem>
          <ContractHiddenDetailItem>
            <span>Descrição</span>
            <span>{props.description}</span>
          </ContractHiddenDetailItem>
        </ContractHiddenDetail>
      </ContractInnerContainer>
    </ContractCard>
  );
}

export default ContractBox;
