import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./pages/signIn/signIn";
import SignUpEnterprise from "./pages/signUpEnterprise/signUpEnterprise";
import SignUpArtist from "./pages/signUpArtist/signUpArtist";
import Config from "./pages/config/config";
import LandingPage from "./pages/landingPage/landingPage";
import Feed from "./pages/feed/feed";
import Profile from "./pages/profile/profile";
import Search from "./pages/search/search";
<<<<<<< HEAD
=======
import Modal from "./pages/modal/modal";
>>>>>>> main
import { UserStorage } from "./contexts/UserContext";
import Services from "./pages/services/services";

function App() {
  return (
    <BrowserRouter>
      <UserStorage>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/signUp/enterprise" element={<SignUpEnterprise />} />
          <Route path="/signUp/artist" element={<SignUpArtist />} />
          <Route path="/config" element={<Config />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/user/:index" element={<Profile />} />
          <Route path="/search" element={<Search />} />
<<<<<<< HEAD
=======
          <Route path="/modal" element={<Modal />} />
>>>>>>> main
          <Route path="/services" element={<Services />} />
        </Routes>
      </UserStorage>
    </BrowserRouter>
  );
}

export default App;
