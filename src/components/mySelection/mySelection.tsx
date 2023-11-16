import {
  HeaderLogo,
  Icon,
  ModalContainer,
  SignContainer,
  Modal,
} from "./mySelectionStyles";
import XIcon from "../../assets/x.svg";
import { useContext, useEffect, useState } from "react";
import { ModalContext } from "../../contexts/ModalContext";
import SelectionBox from "../selectionBox/selectionBox";
import { UserContext } from "../../contexts/UserContext";
import dayjs from "dayjs";
import { SelectionStatus } from "../../enums/ServiceStatus";

interface MySelectionProps {
  filter: SelectionStatus;
}

function MySelection(props: MySelectionProps) {
  const { hideMySelection, toogleMySelectionVisibility } = useContext(ModalContext);
  const { fetchSelectionsByOwner } = useContext(UserContext);
  const [selections, setSelections] = useState<any[]>([]);

  const filter = ([
    (item: any): boolean => dayjs().isBefore(`${item.date.start} : ${item.time.start}`, 'minute'),
    (item: any): boolean => item.locked,
    (item: any): boolean => dayjs().isAfter(`${item.date.end} : ${item.time.end}`, 'minute'),
  ])[props.filter];

  useEffect(() =>
    fetchSelectionsByOwner()
      .then(setSelections)
      .catch(console.error)
    , [fetchSelectionsByOwner]);


  return (
    <Modal hidden={hideMySelection}>
      <ModalContainer>
        <HeaderLogo>
          <Icon alt="X" src={XIcon} onClick={() => toogleMySelectionVisibility()} />
          <h1>Minhas seleções</h1>
        </HeaderLogo>
        <SignContainer>
          {selections
            .filter((item: any) => filter(item))
            .map(
              (item: any) =>
                <SelectionBox
                  id={item.id}
                  title={item.title}
                  locked={item.locked}
                  art={item.art}
                  time={item.time}
                  price={item.price}
                  date={item.date}
                  description={item.description}
                />
            )}
        </SignContainer>
      </ModalContainer>
    </Modal>
  );
}

export default MySelection;
