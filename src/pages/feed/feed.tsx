import {
  FeedContainer,
  PostContainer,
  ProfileContainer,
  ProfilePostImage,
  TextContentContainer,
} from "./feedStyles";

import HeaderLogged from "../../components/headerLogged/headerLogged";
import { useEffect, useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import dayjs from "dayjs";
import portuguesPlugin from "dayjs/locale/pt-br";
import relativeTime from "dayjs/plugin/relativeTime";
import { useNavigate } from "react-router-dom";

function Feed() {
  dayjs.locale(portuguesPlugin);
  dayjs.extend(relativeTime);
  const { fetchRandomPosts } = useContext(UserContext);
  const navigate = useNavigate();
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    fetchRandomPosts().then(setPosts);
  }, [fetchRandomPosts, setPosts]);

  return (
    <>
      <HeaderLogged />
      <FeedContainer>
        {posts.map((data: any) => (
          <PostContainer>
            <ProfileContainer>
              <img
                src={data.author.image}
                alt={`Perfil de ${data.author.name}`}
                onClick={() => navigate(`/user/${data.author.index}`)}
              />
              <div>
                <span>{data.author.name}</span>
                <span>{dayjs(data.postTime).fromNow()}</span>
              </div>
            </ProfileContainer>
            <TextContentContainer>{data.message}</TextContentContainer>
            <ProfilePostImage>
              <img src={data.media} alt="imagem" />
            </ProfilePostImage>
          </PostContainer>
        ))}
      </FeedContainer>
    </>
  );
}

export default Feed;
