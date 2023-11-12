import {
  ArrowContainer,
  BoxContainer,
  ServicesContainer,
  MainContainer,
  Modal,
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
  const { hideModal, setHideModal } = useContext(ModalContext);

  const [hideNewAgreement, setHideNewAgreement] = useState(true);
  const [hideCurrentAgreements, setHideCurrentAgreements] = useState(true);
  const [hidePendingAgreements, setHidePendingAgreements] = useState(true);
  const [hideAgreementHistory, setHideAgreementHistory] = useState(true);
  const [hideNewSelection, setHideNewSelection] = useState(true);
  const [hideCurrentSelections, setHideCurrentSelections] = useState(true);
  const [hideSelectionHistory, setHideSelectionHistory] = useState(true);
  const [hideFetchSelections, setHideFetchSelections] = useState(true);

  const agreementServices = [
    { title: 'Criar contrato', control: hideNewAgreement, handler: setHideNewAgreement },
    { title: 'Contratos ativos', control: hideCurrentAgreements, handler: setHideCurrentAgreements },
    { title: 'Contratos pendentes', control: hidePendingAgreements, handler: setHidePendingAgreements },
    { title: 'Histórico', control: hideAgreementHistory, handler: setHideAgreementHistory },
  ]

  const selectionServices = [
    { title: 'Criar seleção', control: hideNewSelection, handler: setHideNewSelection },
    { title: 'Seleções ativas', control: hideCurrentSelections, handler: setHideCurrentSelections },
    { title: 'Histórico', control: hideSelectionHistory, handler: setHideSelectionHistory },
    { title: 'Buscar seleções', control: hideFetchSelections, handler: setHideFetchSelections },
  ]

  return (
    <>
      <HeaderLogged />

      <Modal hideModal={hideNewAgreement && hideModal}>
        <SelectArtist />
        <NewContract />
      </Modal >

      <Modal hideModal={hideCurrentAgreements && hideModal}>
        <MyContract />
      </Modal >

      <Modal hideModal={hideNewSelection && hideModal}>
        <NewSelection />
      </Modal >

      <Modal hideModal={hideCurrentSelections && hideModal}>
        <MySelection />
      </Modal >



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
                    onClick={() => {
                      setHideModal(true)
                      service.handler(!service.control)
                    }}
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
                    onClick={() => setHideModal(!hideModal)}
                  />
                </ArrowContainer>
            )}
          </ServicesContainer>

        </BoxContainer>
      </MainContainer>
      <Footer />
    </>
  );
}

export default Services;
