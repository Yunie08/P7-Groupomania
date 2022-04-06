import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Contexts
import { AuthProvider } from "./utils/context/AuthContext";

// Components
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Post from "./pages/Post";
import Profile from "./pages/Profile";
import MainHeader from "./components/Shared/Header";
import ProtectedRoutes from "./components/Shared/ProtectedRoutes";

// Style
import GlobalStyle from "./utils/style/GlobalStyle";

function App() {
  return (
    <React.Fragment>
      <React.StrictMode>
        <BrowserRouter>
          <AuthProvider>
            <GlobalStyle />
            <Routes>
              <Route path="/auth" element={<Auth />} />
              <Route element={<ProtectedRoutes />}>
                <Route element={<MainHeader />}>
                  <Route path="/post" element={<Post />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="*" element={<Home />} />
                </Route>
              </Route>
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </React.StrictMode>
    </React.Fragment>
  );
}

export default App;
