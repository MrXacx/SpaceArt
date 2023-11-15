import {
  HeaderLogo,
  Icon,
  ModalContainer,
  SignContainer,
  Modal,
} from "./myContractStyles";
import XIcon from "../../assets/x.svg";
import { useContext, useEffect, useState } from "react";
import { ModalContext } from "../../contexts/ModalContext";
import ContractBox from "../contractBox/contractBox";
import { UserContext } from "../../contexts/UserContext";

function MyContract() {
  const { hideMyContract, toogleMyContractVisibility } = useContext(ModalContext);
  const { fetchAgreementsByUser } = useContext(UserContext);
  const [contracts, setContracts] = useState([]);

  useEffect(() =>
    fetchAgreementsByUser()
      .then(setContracts)
      .catch(console.error)
  ,[fetchAgreementsByUser]);

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
