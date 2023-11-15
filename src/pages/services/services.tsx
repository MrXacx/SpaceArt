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
import SelectArtist from "../../components/selectArtist/selectArtist";
import NewContract from "../../components/newContract/newContract";
import MyContract from "../../components/myContract/myContract";
import NewSelection from "../../components/newSelection/newSelection";
import MySelection from "../../components/mySelection/mySelection";
import { useContext, useState } from "react";

function Services() {

  // Criar alternativa para conter mais de um modal na mesma página
  const { toogleNewContractVisibility, toogleNewSelectionVisibility, toogleMyContractVisibility, toogleMySelectionVisibility } = useContext(ModalContext);

  const agreementServices = [
    { title: 'Criar contrato', toogle: toogleNewContractVisibility },
    { title: 'Contratos ativos', toogle: toogleMyContractVisibility },
    { title: 'Contratos pendentes', toogle: toogleMyContractVisibility },
    { title: 'Histórico', toogle: toogleMyContractVisibility },
  ]

  const selectionServices = [
    { title: 'Criar seleção', toogle: toogleNewSelectionVisibility },
    { title: 'Seleções ativas', toogle: toogleMySelectionVisibility },
    { title: 'Histórico', toogle: toogleMySelectionVisibility },
    { title: 'Buscar seleções', toogle: toogleMySelectionVisibility },
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
          </ServicesContainer>

        </BoxContainer>
      </MainContainer>
      <Footer />

      <NewContract />
      <MyContract />
      <NewSelection />
      <MySelection />

    </>
  );
}

export default Services;
