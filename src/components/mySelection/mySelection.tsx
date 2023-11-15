import {
  HeaderLogo,
  Icon,
  ModalContainer,
  SignContainer,
  Modal,
} from "./mySelectionStyles";
import XIcon from "../../assets/x.svg";
import { useContext, useState } from "react";
import { ModalContext } from "../../contexts/ModalContext";
import SelectionBox from "../selectionBox/selectionBox";

function MySelection() {
  const { hideMySelection, toogleMySelectionVisibility } = useContext(ModalContext);
  const [selections, setSelections] = useState([]);


  return (
    <Modal hidden={hideMySelection}>
      <ModalContainer>
        <HeaderLogo>
          <Icon alt="X" src={XIcon} onClick={() => toogleMySelectionVisibility()} />
          <h1>Minhas seleções</h1>
        </HeaderLogo>
        <SignContainer>
          {selections.map(
            (item: any) =>
              <SelectionBox
                id={item.id}
                title={item.title}
                locked={item.locked}
                art={item.art}
                time={item.price}
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
