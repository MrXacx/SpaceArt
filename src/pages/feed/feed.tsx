import {
  FeedContainer,
  PostContainer,
  ProfileContainer,
  ProfilePostImage,
  TextContentContainer,
} from "./feedStyles";

import HeaderLogged from "../../components/headerLogged/headerLogged";
import { useEffect, useContext, useState, useCallback } from "react";
import { UserContext } from "../../contexts/UserContext";
import dayjs from "dayjs"
import portuguesPlugin from "dayjs/locale/pt-br";
import { useNavigate } from "react-router-dom";

function Feed() {

  const { isLogged, fetchRandomPosts } = useContext(UserContext);
  const navigate = useNavigate();
  const [posts, setPosts] = useState<JSX.Element[]>();
  const fetchPosts = useCallback(() =>

    fetchRandomPosts()
      .then((list: any[]) => list.map((data: any) =>
      (<PostContainer>
        <ProfileContainer>
          <img
            src={data?.user.image}
            alt={`Perfil de ${data?.user.name}`}
            onClick={() => navigate(`user/${data?.user.index}`)}
          />
          <div>
            <span>{data?.user.name}</span>
            <span>{dayjs(data?.postTime).locale(portuguesPlugin).fromNow(true)}</span>
          </div>
        </ProfileContainer>
        <TextContentContainer>
          {data?.message}
        </TextContentContainer>
        <ProfilePostImage src={data?.media} alt="imagem" />
      </PostContainer>)
      )), [fetchRandomPosts, navigate]);
  

  if (!isLogged) {
    //navigate('/');
  }
  useEffect(() => {
    fetchPosts()
      .then(setPosts);
  }, [fetchPosts, setPosts]);


  return (
    <>
      <HeaderLogged />
      <FeedContainer>
        {posts}
      </FeedContainer>
    </>)

};

export default Feed;
