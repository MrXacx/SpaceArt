import {
  CardProfileContent,
  CardProfileDetail,
  UserCardDetailContainer,
} from "./cardProfileStyles";

import LocalIcon from "../../assets/local.svg";
import WageIcon from "../../assets/wage.svg";
import { useNavigate } from "react-router-dom";

interface CardProfileProps {
  id: string;
  index: number;
  image: string;
  name: string;
  type: string;
  city: string;
  state: string;
  art?: string;
  wage?: number;
}

function CardProfile(props: CardProfileProps) {
  const navigate = useNavigate();

  return (
    <CardProfileContent>
      <img
        alt="profile"
        src={props.image}
        onClick={() => navigate(`/user/${props.index}`)}
      />
      <CardProfileDetail>
        <div>
          <span>{props.name}</span>
          <span>{props.art ?? props.type}</span>
        </div>
        <UserCardDetailContainer>
          <img alt="local icon" src={LocalIcon} />
          <span>
            {props.city}, {props.state}
          </span>
        </UserCardDetailContainer>
        {props.wage ? (
          <UserCardDetailContainer>
            <img alt="wage icon" src={WageIcon} />
            <span>R${props.wage.toFixed(2).replace(".", ",")}</span>
          </UserCardDetailContainer>
        ) : null}
      </CardProfileDetail>
    </CardProfileContent>
  );
}

export default CardProfile;
