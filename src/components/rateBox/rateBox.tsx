import { useNavigate } from "react-router-dom";
import {
  AuthorDetails,
  RateCard,
  RateInnerContainer,
  RateMessageContainer,
  RateValueContainer,
} from "./rateBoxStyles";
import StarIcon from "../../assets/black_star.svg";

interface RateBoxProps {
  author: {
    id: string;
    index: number;
    image: string;
    name: string;
  };
  rate: number;
  description: string;
}

function RateBox(props: RateBoxProps) {
  const navigate = useNavigate();

  return (
    <RateCard>
      <RateInnerContainer>
        <AuthorDetails>
          <img
            src={props?.author.image}
            alt={`Perfil de ${props?.author.name}`}
            onClick={() => navigate(`user/${props?.author.index}`)}
          />

          <span>{props?.author.name}</span>
        </AuthorDetails>
        <RateValueContainer>
          <img src={StarIcon} alt="avaliação" />
          <span>{props.rate.toFixed(2)}</span>
        </RateValueContainer>
        <RateMessageContainer>{props.description}</RateMessageContainer>
      </RateInnerContainer>
    </RateCard>
  );
}

export default RateBox;
