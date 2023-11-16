/* eslint-disable eqeqeq */
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
import { AgreementStatus } from "../../enums/ServiceStatus";
import dayjs from "dayjs";
interface MyContractProps {
  filter: AgreementStatus;
}

function MyContract(props: MyContractProps) {
  const { hideMyContract, toogleMyContractVisibility } = useContext(ModalContext);
  const { fetchAgreementsByUser } = useContext(UserContext);
  const [contracts, setContracts] = useState<any[]>([]);

  const filter = ([
    (item: any): boolean => item.status == "send",
    (item: any): boolean => item.status == "accepted" && dayjs().isAfter(`${item.date} ${item.time.end}`),
    (item: any): boolean => item.status == "accepted" || item.status == "refused",
  ])[props.filter];

  useEffect(() =>
    fetchAgreementsByUser()
      .then(setContracts)
      .catch(console.error)
    , [fetchAgreementsByUser]);

  return (
    <Modal hidden={hideMyContract}>
      <ModalContainer>
        <HeaderLogo>
          <Icon alt="X" src={XIcon} onClick={() => toogleMyContractVisibility()} />
          <h1>Meus contratos</h1>
        </HeaderLogo>
        <SignContainer>
          {contracts
            .filter((item: any) => filter(item))
            .map(
              (item: any) =>
                <ContractBox
                  id={item.id}
                  status={item.status}
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

export default MyContract;
