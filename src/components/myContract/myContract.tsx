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
import IsSameOrAfter from "dayjs/plugin/isSameOrAfter";
import RateBox from "../rateBox/rateBox";
import { SelectAgreementContext } from "../../contexts/SelectAgreement";
import { Agreement } from "../../api/Agreement";
import { AccountType } from "../../enums/AccountType";
import NewRate from "../newRate/newRate";

interface MyContractProps {
  filter: AgreementStatus;
}

const isCompleted = (item: any) => item.status == "accepted" &&
dayjs(`${item.date} ${item.time.end}`, "DD/MM/YYYY HH:mm").isBefore();

const tryFilterFunction = (status: AgreementStatus) => {
  switch(status){
    case AgreementStatus.pending:
      return (item: any) => item.status == "send";
    case AgreementStatus.accepted:
      return (item: any) => item.status == "accepted" && dayjs( `${item.date} ${item.time.end}`,"DD/MM/YYYY HH:mm" )
      .isSameOrAfter();

    case AgreementStatus.completed:
      return isCompleted;

  }
}


function MyContract(props: MyContractProps) {
  const {
    hideMyContract,
    toogleMyContractVisibility,
    hideLookRates,
    toogleLookRatesVisibility,
  } = useContext(ModalContext);
  const { id, type, fetchAgreementsByUser, fetchRatesFromAgreement } =
    useContext(UserContext);
  const { agreement } = useContext(SelectAgreementContext);

  const [contracts, setContracts] = useState<any[]>([]);
  const [rates, setRates] = useState<any[]>([]);
  const [alreadyPublishedRate, setAlreadyPublishedRate] =
    useState<boolean>(true);
  const [rated, setRatedUser] = useState<any>({});

  dayjs.extend(customParseFormat);
  dayjs.extend(IsSameOrAfter);

  const filter = tryFilterFunction(props.filter)
  
  useEffect(() => {
    fetchAgreementsByUser(id).then(setContracts).catch(console.log);
  }, [fetchAgreementsByUser, id]);

  useEffect(() => {
    if (agreement) {
      fetchRatesFromAgreement(agreement.getID()).then(setRates); // Get contract rate
    }
  }, [agreement, fetchRatesFromAgreement, type]);

  useEffect(() => {
    setAlreadyPublishedRate(rates.some((rate) => rate.author.getID() === id));
  }, [id, rates]);
  useEffect(() => {
    if (agreement && !alreadyPublishedRate) {
      agreement
        .fetch()
        .then((response: Agreement) => response.toObject())
        .then((reponse: any) =>
          type == AccountType.artist ? reponse.hirer : reponse.hired
        )
        .then((user: any) => user.fetch())
        .then(setRatedUser);
    }
  }, [agreement, alreadyPublishedRate, id, rates, type]);

  return (
    <Modal hidden={hideMyContract}>
      <ModalContainer hidden={!hideLookRates}>
        <HeaderLogo>
          <Icon
            alt="X"
            src={XIcon}
            onClick={() => toogleMyContractVisibility()}
          />
          <h1>My contracts</h1>
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
                rateable={isCompleted(item)}
              />
            ))}
        </SignContainer>
      </ModalContainer>
      <ModalContainer hidden={hideLookRates}>
        <HeaderLogo>
          <Icon
            alt="X"
            src={XIcon}
            onClick={() => {
              setRates([]);
              setRatedUser({});
              toogleLookRatesVisibility()
            }}
          />
          <h1>{alreadyPublishedRate ? "Rates" : "Publish a rate"}</h1>
        </HeaderLogo>
        <SignContainer>
          {alreadyPublishedRate ? (
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
          ) : (
            <NewRate
              agreement={agreement?.getID() ?? ""}
              rated={{
                name: rated.name,
                image: rated.image,
                art: rated.art,
                type: rated.type,
                location: {
                  city: rated.location?.city ?? "",
                  state: rated.location?.state ?? "",
                },
              }}
            />
          )}
        </SignContainer>
      </ModalContainer>
    </Modal>
  );
}

export default MyContract;
