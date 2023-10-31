import {
  CardProfileContent,
  CardProfileDetail,
  UserCardDetailContainer,
} from "./cardProfileStyles";

import LocalIcon from "../../assets/local.svg";
import WageIcon from "../../assets/wage.svg";

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
        {(wage) ?
          (
            <UserCardDetailContainer>
              <img alt="wage icon" src={WageIcon} />
              <span>R${wage.toFixed(2).replace('.', ',')}</span>
            </UserCardDetailContainer>
          )
          : null
        }
      </CardProfileDetail>
    </CardProfileContent>)
}

export default CardProfile;
