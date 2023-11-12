import {
  ArrowContainer,
  BoxContainer,
  ServicesContainer,
  MainContainer,
} from "./servicesStyles";
import ArrowIcon from "../../assets/arrow.png";
import Footer from "../../components/footer/footer";
import HeaderLogged from "../../components/headerLogged/headerLogged";

function Config() {

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
                    onClick={() => alert(service.modal)}
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
                    onClick={() => alert(service.modal)}
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
