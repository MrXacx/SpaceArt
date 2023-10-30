import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./pages/signIn/signIn";
import SignUpEnterprise from "./pages/signUpEnterprise/signUpEnterprise";
import SignUpArtist from "./pages/signUpArtist/signUpArtist";
import Config from "./pages/config/config";
import LandingPage from "./pages/landingPage/landingPage";
import Feed from "./pages/feed/feed";
import Profile from "./pages/profile/profile";
import Search from "./pages/search/search";
import Modal from "./pages/modal/modal";
import ModalTest from "./pages/modalTest/modalTest";

import { UserStorage } from "./contexts/UserContext";


function App() {
  return (
    <BrowserRouter>

      <UserStorage>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up-enterprise" element={<SignUpEnterprise />} />
          <Route path="/sign-up-artist" element={<SignUpArtist />} />
          <Route path="/config" element={<Config />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/search" element={<Search />} />
          <Route path="/modal" element={<Modal />} />
          <Route path="/modal-test" element={<ModalTest />} />
        </Routes>
      </UserStorage>

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up-enterprise" element={<SignUpEnterprise />} />
        <Route path="/sign-up-artist" element={<SignUpArtist />} />
        <Route path="/config" element={<Config />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/search" element={<Search />} />
        <Route path="/modal" element={<Modal />} />
        <Route path="/modal-test" element={<ModalTest />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
