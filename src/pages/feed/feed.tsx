import {
  FeedContainer,
  PostContainer,
  ProfileContainer,
  ProfilePostImage,
  TextContentContainer,
} from "./feedStyles";
import ProfilePicture from "../../assets/profile_user.png";
import PlaceholderImage from "../../assets/placeholder_image.png";
import HeaderLogged from "../../components/headerLogged/headerLogged";

function Feed() {
  return (
    <>
      <HeaderLogged />
      <FeedContainer>
        <PostContainer>
          <ProfileContainer>
            <img src={ProfilePicture} alt="foto de perfil" />
            <div>
              <span>John Aaron</span>
              <span>7m</span>
            </div>
          </ProfileContainer>
          <TextContentContainer>
            <p>
              I spent 24 hours on 1 Coding Problem. Rotate Array was the first
              problem I tried on LeetCode. I spent the entire day trying to
              solve it but couldn't. I was extremely frustrated and went to the
              discussion section to read the most upvoted solution. Another 2
              hours passed and I could not even figure out why the solution
              works. At that point, my frustration had transformed into
              disappointment. I somehow managed to put myself to sleep that
              night. Next morning, I went to a friend and asked him to solve the
              exact same problem. And that’s when I learnt something really
              interesting about human behavior.
            </p>
          </TextContentContainer>
          <ProfilePostImage alt="imagem" src={PlaceholderImage} />
        </PostContainer>
      </FeedContainer>
    </>
  );
}

export default Feed;
