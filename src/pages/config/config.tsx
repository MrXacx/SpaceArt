import Header from "../../components/header/header";
import ArrowIcon from "../../assets/arrow.png";
import {
  ArrowContainer,
  BoxContainer,
  ConfigContainer,
  MainContainer,
} from "./configStyles";
import Footer from "../../components/footer/footer";

function Config() {
  return (
    <>
      <Header />
      <MainContainer>
        <BoxContainer>
          <ConfigContainer>
            <h2>Editar Perfil</h2>
            <ArrowContainer>
              <span>Dados Privados</span>
              <img alt="seta" src={ArrowIcon} />
            </ArrowContainer>
            <ArrowContainer>
              <span>Suas denúncias</span>
              <img alt="seta" src={ArrowIcon} />
            </ArrowContainer>
          </ConfigContainer>
          <ConfigContainer>
            <h2>Denúncia</h2>
            <ArrowContainer>
              <span>Suas denúncias</span>
              <img alt="seta" src={ArrowIcon} />
            </ArrowContainer>
          </ConfigContainer>
          <ConfigContainer>
            <h2>Gerenciamento de conta</h2>
            <ArrowContainer>
              <span>Apagar conta</span>
              <img alt="seta" src={ArrowIcon} />
            </ArrowContainer>
          </ConfigContainer>
        </BoxContainer>
      </MainContainer>
      <Footer />
    </>
  );
}

export default Config;
