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



import { Post } from "/Users/021.885203/Desktop/spaceart-react/spaceart-react/src/api-clients/Post";
import { User } from "/Users/021.885203/Desktop/spaceart-react/spaceart-react/src/api-clients/User";



function Feed() {
  new Post().fetchList()
.then(posts => posts.map( post => {
const {author, content, id, media, postTime } = post.toObject();
 const {name, image} = author.fetch(false).toObject();
return( 
    <>
  <HeaderLogged />
  <FeedContainer>
    <PostContainer>
      <ProfileContainer>
        <img src={media} alt="foto de perfil" />
        <div>
          <span>{author}</span>
          <span>{postTime}</span>
        </div>
      </ProfileContainer>
      <TextContentContainer>
        <p>
          {content}
        </p>
      </TextContentContainer>
      <ProfilePostImage alt="imagem" src={PlaceholderImage} />
    </PostContainer>
  </FeedContainer>
</>)

}));
 

}

export default Feed;
