import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Post from "./pages/Post";
import Profile from "./pages/Profile";
import MainHeader from "./components/Shared/Header";
import ProtectedRoutes from "./components/Shared/ProtectedRoutes";

// Contexts
import { UserContext } from "./utils/context/UserContext";

// Style
import GlobalStyle from "./utils/style/GlobalStyle";

function App() {
  return (
    <React.Fragment>
      <React.StrictMode>
        <BrowserRouter>
          <GlobalStyle />
          <MainHeader />
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/home" index element={<Home />} />
            <Route element={<ProtectedRoutes />}>
              <Route path="/post" element={<Post />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<Home />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </React.StrictMode>
    </React.Fragment>
  );
}

export default App;
