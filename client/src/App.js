import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Contexts
import { AuthProvider } from "./utils/context/AuthContext";

// Components
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Post from "./pages/Post";
import Profile from "./pages/Profile";
import ProfileUpdate from "./pages/ProfileUpdate";
import MainHeader from "./components/Shared/Header";
import ProtectedRoutes from "./components/Shared/ProtectedRoutes";

// Style
import GlobalStyle from "./utils/style/GlobalStyle";

function App() {
  return (
    <React.Fragment>
      <React.StrictMode>
        <AuthProvider>
          <Router>
            <GlobalStyle />
            <Routes>
              <Route path="/auth" element={<Auth />} />
              <Route element={<ProtectedRoutes />}>
                <Route element={<MainHeader />}>
                  <Route path="/post" element={<Post />} />
                  <Route path="/profile/:userId" element={<Profile />}>
                    <Route path="update" element={<ProfileUpdate />} />
                  </Route>
                  <Route path="*" element={<Home />} />
                </Route>
              </Route>
            </Routes>
          </Router>
        </AuthProvider>
      </React.StrictMode>
    </React.Fragment>
  );
}

export default App;
