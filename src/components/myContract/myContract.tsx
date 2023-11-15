import {
  HeaderLogo,
  Icon,
  ModalContainer,
  SignContainer,
  Modal,
} from "./myContractStyles";
import XIcon from "../../assets/x.svg";
import { useContext, useState } from "react";
import { ModalContext } from "../../contexts/ModalContext";
import ContractBox from "../contractBox/contractBox";

function MyContract() {
  const { hideMyContract, toogleMyContractVisibility } = useContext(ModalContext);
  const [contracts, setContracts] = useState([]);

  return (
    <Modal hidden={hideMyContract}>
      <ModalContainer>
        <HeaderLogo>
          <Icon alt="X" src={XIcon} onClick={() => toogleMyContractVisibility()} />
          <h1>Meus contratos</h1>
        </HeaderLogo>
        <SignContainer>
          {contracts.map(
            (item: any) =>
              <ContractBox
                id={item.id}
                status={item.status}
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

export default MyContract;
