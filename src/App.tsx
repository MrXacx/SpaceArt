import Home from "./pages/home/home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./pages/signIn/signIn";
import SignUpEnterprise from "./pages/signUpEnterprise/signUpEnterprise";
import SignUpArtist from "./pages/signUpArtist/signUpArtist";
import Config from "./pages/config/config";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up-enterprise" element={<SignUpEnterprise />} />
          <Route path="/sign-up-artist" element={<SignUpArtist />} />
          <Route path="/config" element={<Config />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
