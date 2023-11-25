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
import { AccountType } from "../../enums/AccountType";

interface SelectionBoxProps {
  id: string;
  title: string;
  art: ArtType;
  price: number;
  date: string[];
  time: string[];
  locked: boolean;
}

function SelectionBox(props: SelectionBoxProps) {
  const [hidden, setHidden] = useState(false);
  const [isOpened, setOpened] = useState(false);

  const { deleteSelection, type, submitApplication } = useContext(UserContext);
  const { setSelection } = useContext(SelectSelectionContext);
  const { toogleSelectArtistVisibility } = useContext(ModalContext);
  dayjs.extend(customParseFormat);
  const isAfter = dayjs(
    `${props.date[1]} ${props.time[1]}`,
    "DD/MM/YYYY HH:mm"
  ).isAfter();

  return hidden ? (
    <></>
  ) : (
    <SelectionCard>
      <SelectionInnerContainer>
        <SelectionMask opened={isOpened} onClick={() => setOpened(!isOpened)}>
          <SelectionDetailHeader>
            <span>{props.art}</span>
            <h3>{props.title}</h3>
          </SelectionDetailHeader>
          <input type="checkbox" checked={isOpened} />
        </SelectionMask>
        <SelectionHiddenDetail opened={isOpened}>
          <SelectionHiddenDetailItem>
            <span>Preço</span>
            <span>{`R$${props.price.toFixed(2)}`}</span>
          </SelectionHiddenDetailItem>
          <SelectionHiddenDetailItem>
            <span>Data de abertura</span>
            <span>{`${props.date[0]} ${props.time[0]}`}</span>
          </SelectionHiddenDetailItem>
          <SelectionHiddenDetailItem>
            <span>Data de encerramnto</span>
            <span>{`${props.date[1]} ${props.time[1]}`}</span>
          </SelectionHiddenDetailItem>

          <SelectionOptions>
            <SelectionOptionButton
              type="button"
              hidden={type === AccountType.artist || isAfter}
              danger={true}
              onClick={() => {
                deleteSelection(props.id);
                setHidden(true);
              }}
            >
              Deletar
            </SelectionOptionButton>
            <SelectionOptionButton
              type="button"
              hidden={type === AccountType.artist || !isAfter}
              onClick={() => {
                setSelection(new Enterprise(props.id));
                toogleSelectArtistVisibility();
              }}
            >
              Obter resultados
            </SelectionOptionButton>
            <SelectionOptionButton
              type="button"
              hidden={type === AccountType.enterprise || !isAfter}
              onClick={() => submitApplication(props.id)}
            >
              Aplicar para a vaga
            </SelectionOptionButton>
          </SelectionOptions>
        </SelectionHiddenDetail>
      </SelectionInnerContainer>
    </SelectionCard>
  );
}

export default SelectionBox;
