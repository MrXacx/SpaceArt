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

function Services() {

  // Criar alternativa para conter mais de um modal na mesma página
  const { toogleNewContractVisibility, toogleNewSelectionVisibility, toogleMyContractVisibility, toogleMySelectionVisibility } = useContext(ModalContext);
  const [contractFilter, setContractFilter] = useState(AgreementStatus.accepted);
  const [selectionFilter, setSelectionFilter] = useState(SelectionStatus.active);

  const agreementServices = [
    { title: 'Criar contrato', toogle: () => toogleNewContractVisibility() },
    {
      title: 'Contratos ativos', toogle: () => {
        toogleMyContractVisibility()
        setContractFilter(AgreementStatus.accepted);
      }
    },
    {
      title: 'Contratos pendentes', toogle: () => {
        toogleMyContractVisibility()
        setContractFilter(AgreementStatus.pending);
      }
    },
    {
      title: 'Histórico', toogle: () => {
        toogleMyContractVisibility()
        setContractFilter(AgreementStatus.completed);
      }
    },
  ]

  const selectionServices = [
    { title: 'Criar seleção', toogle: () => toogleNewSelectionVisibility() },
    {
      title: 'Ativas', toogle: () => {
        toogleMySelectionVisibility()
        setSelectionFilter(SelectionStatus.active);
      }
    },
    {
      title: 'Em espera', toogle: () => {
        toogleMySelectionVisibility()
        setSelectionFilter(SelectionStatus.onHold);
      }
    },
    {
      title: 'Histórico', toogle: () => {
        toogleMySelectionVisibility()
        setSelectionFilter(SelectionStatus.closed);
      }
    },
  ]

  return (
    <>
      <HeaderLogged />
      <MainContainer>
        <BoxContainer>

          <ServicesContainer>
            <h2>Contratos</h2>
            {agreementServices.map(
              (service) =>
                <ArrowContainer>
                  <span>{service.title}</span>
                  <img
                    alt={service.title}
                    src={ArrowIcon}
                    onClick={() => service.toogle()}
                  />
                </ArrowContainer>
            )}
          </ServicesContainer>

          <ServicesContainer>
            <h2>Seleções</h2>
            {selectionServices.map(
              (service) =>
                <ArrowContainer>
                  <span>{service.title}</span>
                  <img
                    alt={service.title}
                    src={ArrowIcon}
                    onClick={() => service.toogle()}
                  />
                </ArrowContainer>
            )}

            <ArrowContainer>
              <span>Buscar seleções</span>
              <img
                alt="Buscar seleções"
                src={ArrowIcon}
                onClick={() => {
                  toogleMySelectionVisibility()
                  setSelectionFilter(SelectionStatus.active);
                }}
              />
            </ArrowContainer>
          </ServicesContainer>

        </BoxContainer>
      </MainContainer>
      <Footer />

      <NewContract />
      {/*<MyContract filter={contractFilter} />*/}
      <NewSelection />
     <MySelection filter={selectionFilter} />

    </>
  );
}

export default Services;
