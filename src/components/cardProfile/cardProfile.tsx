import {
  CardProfileContent,
  CardProfileDetail,
  UserCardDetailContainer,
} from "./cardProfileStyles";

import LocalIcon from "../../assets/local.svg";
import WageIcon from "../../assets/wage.svg";

function CardProfile(cardDate:{
  id: string,
  index: number,
  image: string,
  name: string,
  art: string,
  city: string,
  state: string,
  wage: number,
}) {
  return (
    <CardProfileContent>
      <img alt="profile" src={cardDate.image} />
      <CardProfileDetail>
        <div>
          <span>{cardDate.name}</span>
          <span>{cardDate.art}</span>
        </div>
        <UserCardDetailContainer>
          <img alt="local icon" src={LocalIcon} />
          <span>{cardDate.city}, {cardDate.state}</span>
        </UserCardDetailContainer>
        <UserCardDetailContainer>
          <img alt="wage icon" src={WageIcon} />
          <span>R${cardDate.wage.toFixed(2).replace('.',',')}</span>
        </UserCardDetailContainer>
      </CardProfileDetail>
    </CardProfileContent>
  );
}

export default CardProfile;
