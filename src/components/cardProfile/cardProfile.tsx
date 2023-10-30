import {
  CardProfileContent,
  CardProfileDetail,
  UserCardDetailContainer,
} from "./cardProfileStyles";
<<<<<<< HEAD

import LocalIcon from "../../assets/local.svg";
import WageIcon from "../../assets/wage.svg";
import { useNavigate } from "react-router-dom"

function CardProfile(
  id: string,
  index: number,
  image: string,
  name: string,
  type: string,
    city: string,
    state: string,
  art?: string,
  wage?: number,
) {

  return (
    <CardProfileContent>
      <img alt="profile" src={image} />
      <CardProfileDetail>
        <div>
          <span>{name}</span>
          <span>{art ?? type}</span> 
        </div>
        <UserCardDetailContainer>
          <img alt="local icon" src={LocalIcon} />
          <span>{city}, {state}</span>
        </UserCardDetailContainer>
        { (wage) ?
            (
              <UserCardDetailContainer>
                <img alt="wage icon" src={WageIcon} />
                <span>R${wage.toFixed(2).replace('.', ',')}</span>
              </UserCardDetailContainer>
            )
            : null
        }

=======
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
>>>>>>> 33f828e (feed typescript)
      </CardProfileDetail>
    </CardProfileContent>
  );
}

export default CardProfile;
