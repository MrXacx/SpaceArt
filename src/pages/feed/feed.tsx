import {
  FeedContainer,
  PostContainer,
  ProfileContainer,
  ProfilePostImage,
  TextContentContainer,
} from "./feedStyles";

import HeaderLogged from "../../components/headerLogged/headerLogged";
import { useEffect, useContext, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Post } from "../../api/Post";
import { User } from "../../api/User";
import { UserContext } from "../../contexts/UserContext";
import dayjs from "dayjs"

function Feed() {

  const { isLogged } = useContext(UserContext);

  const navigate = useNavigate();
  const [posts, setPosts] = useState<JSX.Element[]>();
  const fetchPosts = useCallback(() => {

    new Post()
      .fetchList()
      .then(posts =>
        Promise.all(posts.map(post => {

          let { author, content, media, postTime } = post.toObject();
          postTime = dayjs().from(postTime, true);

          if (author) {
            return author
              .fetch(false)
              .then((user: User) => {

                const { name, image } = user.toObject();
                return {
                  content: content as string,
                  postTime: postTime as string,
                  media: media as string,
                  user: {
                    name: name as string,
                    image: image as string
                  }
                }

              });
          } else {
            return undefined;
          }

        })
        ))
      .then(list => list.filter(p => p !== undefined))
      .then(list => list.map(data =>
        (<PostContainer>
          <ProfileContainer>
            <img
              src={data?.user.image}
              alt={`Perfil de ${data?.user.name}`}
            onClick={() => navigate('/profile')}
            />
            <div>
              <span>{data?.user.name}</span>
              <span>{data?.postTime}</span>
            </div>
          </ProfileContainer>
          <TextContentContainer>
            {data?.content}
          </TextContentContainer>
          <ProfilePostImage src={data?.media} alt="imagem" />
        </PostContainer>)
      ))
      .then(setPosts);

  }, [setPosts, navigate]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);


  return (
    <>
      <HeaderLogged />
      <FeedContainer>
        {posts}
      </FeedContainer>
    </>)

};

export default Feed;
