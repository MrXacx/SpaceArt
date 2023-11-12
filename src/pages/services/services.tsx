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
import { useContext } from "react";

function Config() {

  // Criar alternativa para conter mais de um modal na mesma página
  const { hideModal, setHideModal } = useContext(ModalContext);

  const agreementServices = [
    { title: 'Criar contrato', modal: '' },
    { title: 'Contratos ativos', modal: '' },
    { title: 'Contratos pendentes', modal: '' },
    { title: 'Histórico', modal: '' },
  ]

  const selectionServices = [
    { title: 'Criar seleção', modal: '' },
    { title: 'Seleções ativas', modal: '' },
    { title: 'Histórico', modal: '' },
    { title: 'Buscar seleções', modal: '' },
  ]

  return (
    <>
      <HeaderLogged />

      <Modal hideModal={hideModal}>
        <SelectArtist />
        <NewContract />
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
                    onClick={() => setHideModal(!hideModal)}
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

export default Config;