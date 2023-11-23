import {
  ArrowContainer,
  BoxContainer,
  ConfigContainer,
  MainContainer,
} from "./configStyles";
import ArrowIcon from "../../assets/arrow.png";
import Footer from "../../components/footer/footer";
import HeaderLogged from "../../components/headerLogged/headerLogged";

function Config() {
  return (
    <>
      <HeaderLogged />
      <MainContainer>
        <BoxContainer>
          <ConfigContainer>
            <h2>Aparência</h2>

            <ArrowContainer>
              <span>Editar perifl</span>
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
              <span>Alterar dados privados</span>
              <img alt="seta" src={ArrowIcon} />
            </ArrowContainer>
            <ArrowContainer>
              <span>Desconectar</span>
              <img alt="seta" src={ArrowIcon} />
            </ArrowContainer>
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
