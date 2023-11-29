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
<<<<<<< HEAD
import { UserContext } from "../../contexts/UserContext";
=======
>>>>>>> main

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
}

function ContractBox(props: ContractBoxProps) {
  const [isOpened, setOpened] = useState(false);
<<<<<<< HEAD
  const [hidden, setHidden] = useState(false);
  const { deleteAgreement } = useContext(UserContext);
  const { setAgreement } = useContext(SelectAgreementContext);
  const { toogleLookRatesVisibility } = useContext(ModalContext);

  return hidden ? (
    <></>
  ) : (
=======
  const { setAgreement } = useContext(SelectAgreementContext);
  const { toogleLookRatesVisibility } = useContext(ModalContext);

  return (
>>>>>>> main
    <ContractCard>
      <ContractInnerContainer>
        <ContractMask opened={isOpened} onClick={() => setOpened(!isOpened)}>
          <ContractDetailHeader>
            <span>{props.art}</span>
            <h3>{props.date}</h3>
          </ContractDetailHeader>
          <input type="checkbox" checked={isOpened} />
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

          <ContractOptions>
            <ContractOptionButton
              type="button"
              hidden={false}
              danger={true}
<<<<<<< HEAD
              onClick={() => {
                if (
                  window.confirm(
                    "Você tem certeza disso? Essa ação não pode ser desfeita!"
                  )
                ) {
                  deleteAgreement(props.id).then(() => setHidden(true));
                }
              }}
=======
              onClick={() => {}}
>>>>>>> main
            >
              Interromper
            </ContractOptionButton>
            <ContractOptionButton
              type="button"
              hidden={false}
              onClick={() => {
                setAgreement(
                  new Agreement().build({ id: props.id, status: props.status })
                );
                toogleLookRatesVisibility();
              }}
            >
              Conferir avaliações
            </ContractOptionButton>
          </ContractOptions>
        </ContractHiddenDetail>
      </ContractInnerContainer>
    </ContractCard>
  );
}

export default ContractBox;
