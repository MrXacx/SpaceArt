import Header from "../../components/header/header";
import { FeedContainer, PostContainer, ProfileContainer } from "./feedStyles";
import ProfilePicture from "../../assets/profile_user.png";

function Feed() {
  return (
    <>
      <Header />
      <FeedContainer>
        <PostContainer>
          <ProfileContainer>
            <img src={ProfilePicture} alt="foto de perfil" />
            <span>O brabo</span>
            <span>7m</span>
          </ProfileContainer>
        </PostContainer>
      </FeedContainer>
    </>
  );
}

export default Feed;
