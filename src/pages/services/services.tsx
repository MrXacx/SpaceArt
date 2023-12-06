import {
  ArrowContainer,
  BoxContainer,
  ServicesContainer,
  MainContainer,
} from "./servicesStyles";
import ArrowIcon from "../../assets/arrow.png";
import Footer from "../../components/footer/footer";
import HeaderLogged from "../../components/headerLogged/headerLogged";
import { ModalContext } from "../../contexts/ModalContext";
import NewContract from "../../components/newContract/newContract";
import MyContract from "../../components/myContract/myContract";
import NewSelection from "../../components/newSelection/newSelection";
import MySelection from "../../components/mySelection/mySelection";
import SearchSelection from "../../components/searchSelection/searchSelection";
import { useContext, useState } from "react";
import { AgreementStatus, SelectionStatus } from "../../enums/ServiceStatus";
import { UserContext } from "../../contexts/UserContext";
import { AccountType } from "../../enums/AccountType";

function Services() {
  const { type } = useContext(UserContext);

  const {
    toogleNewContractVisibility,
    toogleNewSelectionVisibility,
    toogleMyContractVisibility,
    toogleMySelectionVisibility,
    toogleSearchSelectionVisibility,
  } = useContext(ModalContext);

  const [contractFilter, setContractFilter] = useState(
    AgreementStatus.accepted
  );

  const [selectionFilter, setSelectionFilter] = useState(
    SelectionStatus.active
  );

  const selectionServices = [
    { title: "Create selection", toogle: () => toogleNewSelectionVisibility() },
    {
      title: "Activ",
      toogle: () => {
        toogleMySelectionVisibility();
        setSelectionFilter(SelectionStatus.active);
      },
    },
    {
      title: "Waitlist",
      toogle: () => {
        toogleMySelectionVisibility();
        setSelectionFilter(SelectionStatus.onHold);
      },
    },
    {
      title: "History",
      toogle: () => {
        toogleMySelectionVisibility();
        setSelectionFilter(SelectionStatus.closed);
      },
    },
  ];

  return (
    <>
      <HeaderLogged />
      <MainContainer>
        <BoxContainer>
          <ServicesContainer>
            <h2>Contracts</h2>
            {type === AccountType.enterprise ? (
              <ArrowContainer onClick={() => toogleNewContractVisibility()}>
                <span>Create contracts</span>
                <img alt="Criar contrato" src={ArrowIcon} />
              </ArrowContainer>
            ) : (
              <></>
            )}

            <ArrowContainer
              onClick={() => {
                toogleMyContractVisibility();
                setContractFilter(AgreementStatus.accepted);
              }}
            >
              <span>Active contracts</span>
              <img alt="Contratos ativos" src={ArrowIcon} />
            </ArrowContainer>
            {type === AccountType.enterprise ? (
              <ArrowContainer
                onClick={() => {
                  toogleMyContractVisibility();
                  setContractFilter(AgreementStatus.accepted);
                }}
              >
                <span>Pending contracts</span>
                <img alt="Pending contracts" src={ArrowIcon} />
              </ArrowContainer>
            ) : (
              <></>
            )}

            <ArrowContainer
              onClick={() => {
                toogleMyContractVisibility();
                setContractFilter(AgreementStatus.pending);
              }}
            >
              <span>History</span>
              <img alt="History" src={ArrowIcon} />
            </ArrowContainer>
          </ServicesContainer>

          <ServicesContainer>
            <h2>Selection</h2>

            {type === AccountType.enterprise ? (
              selectionServices.map((service) => (
                <ArrowContainer onClick={() => service.toogle()}>
                  <span>{service.title}</span>
                  <img alt={service.title} src={ArrowIcon} />
                </ArrowContainer>
              ))
            ) : (
              <ArrowContainer onClick={() => toogleSearchSelectionVisibility()}>
                <span>Search selection</span>
                <img alt="Buscar seleções" src={ArrowIcon} />
              </ArrowContainer>
            )}
          </ServicesContainer>
        </BoxContainer>
      </MainContainer>
      <Footer />

      <NewContract />
      <MyContract filter={contractFilter} />
      <NewSelection />
      <MySelection filter={selectionFilter} />
      <SearchSelection />
    </>
  );
}

export default Services;
