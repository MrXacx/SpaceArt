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
  } = useContext(ModalContext);

  const [contractFilter, setContractFilter] = useState(
    AgreementStatus.accepted
  );

  const [selectionFilter, setSelectionFilter] = useState(
    SelectionStatus.active
  );

  const agreementServices = [
    {
      title: "Criar contrato",
      toogle: () => toogleNewContractVisibility(),
    },
    {
      title: "Contratos pendentes",
      toogle: () => {
        toogleMyContractVisibility();
        setContractFilter(AgreementStatus.pending);
      },
    },
  ];

  const selectionServices = [
    { title: "Criar seleção", toogle: () => toogleNewSelectionVisibility() },
    {
      title: "Ativas",
      toogle: () => {
        toogleMySelectionVisibility();
        setSelectionFilter(SelectionStatus.active);
      },
    },
    {
      title: "Em espera",
      toogle: () => {
        toogleMySelectionVisibility();
        setSelectionFilter(SelectionStatus.onHold);
      },
    },
    {
      title: "Histórico",
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
            <h2>Contratos</h2>
            {type === AccountType.enterprise ? (
              agreementServices.map((service) => (
                <ArrowContainer onClick={() => service.toogle()}>
                  <span>{service.title}</span>
                  <img alt={service.title} src={ArrowIcon} />
                </ArrowContainer>
              ))
            ) : (
              <ArrowContainer
                onClick={() => {
                  toogleMyContractVisibility();
                  setContractFilter(AgreementStatus.accepted);
                }}
              >
                <span>Contratos ativos</span>
                <img alt="Contratos ativos" src={ArrowIcon} />
              </ArrowContainer>
            )}
            <ArrowContainer
              onClick={() => {
                toogleMyContractVisibility();
                setContractFilter(AgreementStatus.completed);
              }}
            >
              <span>Histórico</span>
              <img alt="Histórico" src={ArrowIcon} />
            </ArrowContainer>
          </ServicesContainer>

          <ServicesContainer>
            <h2>Seleções</h2>

            {type === AccountType.enterprise ? (
              selectionServices.map((service) => (
                <ArrowContainer onClick={() => service.toogle()}>
                  <span>{service.title}</span>
                  <img alt={service.title} src={ArrowIcon} />
                </ArrowContainer>
              ))
            ) : (
              <ArrowContainer
                onClick={() => {
                  toogleMySelectionVisibility();
                  setSelectionFilter(SelectionStatus.active);
                }}
              >
                <span>Buscar seleções</span>
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
    </>
  );
}

export default Services;
