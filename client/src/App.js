import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Post from "./pages/Post";
import Profile from "./pages/Profile";
import MainHeader from "./components/Header";
import React from "react";

import ProtectedRoutes from "./components/ProtectedRoutes";

// Style
import GlobalStyle from "./utils/style/GlobalStyle";

function App() {
  return (
    <React.Fragment>
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
    </React.Fragment>
  );
}

export default App;
