import {
  CardProfileContent,
  CardProfileDetail,
  UserCardDetailContainer,
} from "./cardProfileStyles";
import MarcoImage from "../../assets/marco_image.png";
import LocalIcon from "../../assets/local.svg";
import WageIcon from "../../assets/wage.svg";

function CardProfile() {
  return (
    <CardProfileContent>
      <img alt="profile" src={MarcoImage} />
      <CardProfileDetail>
        <div>
          <span>Marco Antônio</span>
          <span>Música</span>
        </div>
        <UserCardDetailContainer>
          <img alt="local icon" src={LocalIcon} />
          <span>Salvador, BA</span>
        </UserCardDetailContainer>
        <UserCardDetailContainer>
          <img alt="wage icon" src={WageIcon} />
          <span>R$256,00</span>
        </UserCardDetailContainer>
      </CardProfileDetail>
    </CardProfileContent>
  );
}

export default CardProfile;
