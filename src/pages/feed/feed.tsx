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
 
  // C:\Users\021.885203\Desktop\spaceart-react
  // const users = await User.fetchList();

  // const feed = users.map((Post) =>  ({
  //   author: Post.author,
  //   content: Post.content,
  //   id: Post.id,
  //   avatar: Post.avatar,
  //   media: Post.media,
  //   postTime: Post.postTime,
  //    }));
  // const author = users.map((Post) =>({
  //   author: Post.author,
  // }));
  // return (
   
  //   <>
  //     <HeaderLogged />
  //     <FeedContainer>
  //       <PostContainer>
  //         <ProfileContainer>
  //           <img src={ProfilePicture} alt="foto de perfil" />
  //           <div>
  //             <span>{author}</span>
  //             <span>7m</span>
  //           </div>
  //         </ProfileContainer>
  //         <TextContentContainer>
  //           <p>
  //             I spent 24 hours on 1 Coding Problem. Rotate Array was the first
  //             problem I tried on LeetCode. I spent the entire day trying to
  //             solve it but couldn't. I was extremely frustrated and went to the
  //             discussion section to read the most upvoted solution. Another 2
  //             hours passed and I could not even figure out why the solution
  //             works. At that point, my frustration had transformed into
  //             disappointment. I somehow managed to put myself to sleep that
  //             night. Next morning, I went to a friend and asked him to solve the
  //             exact same problem. And that’s when I learnt something really
  //             interesting about human behavior.
  //           </p>
  //         </TextContentContainer>
  //         <ProfilePostImage alt="imagem" src={PlaceholderImage} />
  //       </PostContainer>
  //     </FeedContainer>
  //   </>
  // );
}

export default Feed;
