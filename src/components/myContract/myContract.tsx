/* eslint-disable eqeqeq */
import {
  HeaderLogo,
  Icon,
  ModalContainer,
  SignContainer,
  Modal,
  SearchResults,
} from "./myContractStyles";
import XIcon from "../../assets/x.svg";
import { useContext, useEffect, useState } from "react";
import { ModalContext } from "../../contexts/ModalContext";
import ContractBox from "../contractBox/contractBox";
import { UserContext } from "../../contexts/UserContext";
import { AgreementStatus } from "../../enums/ServiceStatus";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { ArtType } from "../../enums/ArtType";
import RateBox from "../rateBox/rateBox";
import { useNavigate } from "react-router-dom";
interface MyContractProps {
  filter: AgreementStatus;
}

function MyContract(props: MyContractProps) {
  const {
    hideMyContract,
    toogleMyContractVisibility,
    hideLookRates,
    toogleLookRatesVisibility,
  } = useContext(ModalContext);
  const { id, fetchAgreementsByUser } = useContext(UserContext);

  const [contracts, setContracts] = useState<any[]>([
    {
      id: "",
      title: "",
      locked: false,
      art: ArtType.music,
      time: { start: "07:30", end: "16:00" },
      date: "17/11/2023",
      price: 500,
      description: "testando",
      status: "send",
    },
    {
      id: "",
      title: "",
      locked: false,
      art: ArtType.music,
      time: { start: "17:30", end: "23:00" },
      date: "17/11/2023",
      price: 500,
      description: "testando",
      status: "accepted",
    },
    {
      id: "",
      title: "",
      locked: false,
      art: ArtType.music,
      time: { start: "09:50", end: "17:00" },
      date: "17/11/2023",
      price: 500,
      description: "testando",
      status: "accepted",
    },
    {
      id: "",
      title: "",
      locked: false,
      art: ArtType.music,
      time: { start: "10:00", end: "14:00" },
      date: "17/11/2023",
      price: 500,
      description: "testando",
      status: "refused",
    },
  ]);
  const [rates, setRates] = useState<any[]>([]);

  dayjs.extend(customParseFormat);

  const filter = [
    (item: any): boolean => item.status == "send",
    (item: any): boolean =>
      item.status == "accepted" &&
      dayjs(`${item.date} ${item.time.end}`, "DD/MM/YYYY HH:mm").isAfter(),
    (item: any): boolean =>
      (item.status == "accepted" &&
        dayjs(
          `${item.date} ${item.time.end}`,
          "DD/MM/YYYY HH:mm"
        ).isBefore()) ||
      item.status == "refused",
  ][props.filter];

  useEffect(() => {
    fetchAgreementsByUser(id).then(setContracts).catch(console.error);
  }, [fetchAgreementsByUser, id]);

  return (
    <Modal hidden={hideMyContract}>
      <ModalContainer hidden={!hideLookRates}>
        <HeaderLogo>
          <Icon
            alt="X"
            src={XIcon}
            onClick={() => toogleMyContractVisibility()}
          />
          <h1>Meus contratos</h1>
        </HeaderLogo>
        <SignContainer>
          {contracts
            .filter((item: any) => filter(item))
            .map((item: any) => (
              <ContractBox
                id={item.id}
                status={item.status}
                art={item.art}
                time={item.time}
                price={item.price}
                date={item.date}
                description={item.description}
              />
            ))}
        </SignContainer>
      </ModalContainer>
      <ModalContainer hidden={hideLookRates}>
        <HeaderLogo>
          <Icon
            alt="X"
            src={XIcon}
            onClick={() => toogleLookRatesVisibility()}
          />
          <h1>Selecione um artista</h1>
        </HeaderLogo>
        <SignContainer>
          <SearchResults>
            {rates.map((rate) => (
              <RateBox
                author={{
                  id: rate.author.id,
                  index: rate.author.index,
                  image: rate.author.image,
                  name: rate.author.name,
                }}
                rate={rate.rate}
                description={rate.description}
              />
            ))}
          </SearchResults>
        </SignContainer>
      </ModalContainer>
    </Modal>
  );
}

export default MyContract;
