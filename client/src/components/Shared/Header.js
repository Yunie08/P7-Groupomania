import React, { useContext } from "react";

// Context
import { AuthContext } from "../../utils/context/AuthContext";

// Components
import { Link, Outlet } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import HeaderLogo from "../../assets/icon-left-font-monochrome-white.svg";

// Style
import styled from "styled-components";
import colors from "../../utils/style/colors";

const NavbarStyled = styled(Navbar)`
  background-color: #072049ff !important;
`;
const Logo = styled(Image)`
  max-width: 250px;
`;
const NavStyled = styled(Nav)`
  .nav-link {
    color: white !important;
    margin-left: 15px;
    border-bottom: 2px solid transparent;
    &.active {
      border-color: #fff;
    }
    &:hover {
      color: ${colors.secondary} !important;
      border-color: ${colors.secondaryDark};
    }
  }
`;

function MainHeader() {
  const { currentUser, logout } = useContext(AuthContext);

  return (
    <>
      <NavbarStyled
        collapseOnSelect
        expand="md"
        bg="dark"
        variant="dark"
        className="sticky-top"
      >
        <Container>
          <Navbar.Brand as={Link} to="/home">
            <Logo alt="Groupomania" src={HeaderLogo} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <NavStyled className="ms-auto">
              <Nav.Link as={Link} eventKey={1} to="/home">
                Accueil
              </Nav.Link>
              <Nav.Link
                as={Link}
                eventKey={2}
                to={`/profile/${currentUser.userId}`}
              >
                Profil
              </Nav.Link>
              <Nav.Link
                as={Link}
                eventKey={3}
                onClick={() => logout()}
                to="/auth"
              >
                Déconnexion
              </Nav.Link>
            </NavStyled>
          </Navbar.Collapse>
        </Container>
      </NavbarStyled>
      <Outlet />
    </>
  );
}

export default MainHeader;
