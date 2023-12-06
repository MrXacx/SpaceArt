import {
  ArtistSelected,
  ProfileDetail,
  ProfileInnerContainer,
} from "./myBusinessBoxStyles";

function MyBusinessBox() {
  return (
    <ArtistSelected>
      <ProfileInnerContainer>
        <ProfileDetail>
          <span>Music</span>
          <h3>Maria Betânia</h3>
        </ProfileDetail>
        <input type="checkbox" />
      </ProfileInnerContainer>
    </ArtistSelected>
  );
}

export default MyBusinessBox;
