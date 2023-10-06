import Home from "./pages/home/home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./pages/signIn/signin";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
