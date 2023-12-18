import {
  ContractCard,
  ContractInnerContainer,
  ContractMask,
  ContractDetailHeader,
  ContractHiddenDetailItem,
  ContractHiddenDetail,
  ContractOptions,
  ContractOptionButton,
} from "./contractBoxStyles";
import { useContext, useState } from "react";
import { ArtType } from "../../enums/ArtType";
import { SelectAgreementContext } from "../../contexts/SelectAgreement";
import { ModalContext } from "../../contexts/ModalContext";
import { Agreement } from "../../api/Agreement";
import { UserContext } from "../../contexts/UserContext";

interface ContractBoxProps {
  id: string;
  art: ArtType;
  date: string;
  price: number;
  time: {
    start: string;
    end: string;
  };
  description: string;
  status: string;
  rateable: boolean;
}

function ContractBox(props: ContractBoxProps) {
  const [isOpened, setOpened] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { deleteAgreement } = useContext(UserContext);
  const { setAgreement } = useContext(SelectAgreementContext);
  const { toogleLookRatesVisibility } = useContext(ModalContext);

  return hidden ? (
    <></>
  ) : (
    <ContractCard>
      <ContractInnerContainer>
        <ContractMask opened={isOpened} onClick={() => setOpened(!isOpened)}>
          <ContractDetailHeader>
            <span>{props.art}</span>
            <h3>{props.date}</h3>
          </ContractDetailHeader>
          <input type="checkbox" defaultChecked={false} checked={isOpened} />
        </ContractMask>
        <ContractHiddenDetail opened={isOpened}>
          <ContractHiddenDetailItem>
            <span>Price</span>
            <span>{`R$${props.price}`}</span>
          </ContractHiddenDetailItem>
          <ContractHiddenDetailItem>
            <span>Period</span>
            <span>{`${props.time.start} - ${props.time.end}`}</span>
          </ContractHiddenDetailItem>
          <ContractHiddenDetailItem>
            <span>Description</span>
            <span>{props.description}</span>
          </ContractHiddenDetailItem>

          <ContractOptions>
            <ContractOptionButton
              type="button"
              hidden={props.rateable}
              danger={true}
              onClick={() => {
                if (
                  window.confirm(
                    "Are you sure? This action can't be unchanged!"
                  )
                ) {
                  deleteAgreement(props.id).then(() => setHidden(true));
                }
              }}
            >
              Interrupt
            </ContractOptionButton>
            <ContractOptionButton
              type="button"
              hidden={!props.rateable}
              onClick={() => {
                setAgreement(
                  new Agreement().build({ id: props.id, status: props.status })
                );
                toogleLookRatesVisibility();
              }}
            >
              Check rating
            </ContractOptionButton>
          </ContractOptions>
        </ContractHiddenDetail>
      </ContractInnerContainer>
    </ContractCard>
  );
}

export default ContractBox;
