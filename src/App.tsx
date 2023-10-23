import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./pages/signIn/signIn";
import SignUpEnterprise from "./pages/signUpEnterprise/signUpEnterprise";
import SignUpArtist from "./pages/signUpArtist/signUpArtist";
import Config from "./pages/config/config";
import LandingPage from "./pages/landingPage/landingPage";
import Feed from "./pages/feed/feed";
import Profile from "./pages/profile/profile";
import Search from "./pages/search/search";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up-enterprise" element={<SignUpEnterprise />} />
        <Route path="/sign-up-artist" element={<SignUpArtist />} />
        <Route path="/config" element={<Config />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;