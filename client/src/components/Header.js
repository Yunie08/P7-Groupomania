import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import NavDropdown from "react-bootstrap/NavDropdown";
import Image from "react-bootstrap/Image";
import HeaderLogo from "../assets/icon-left-font-monochrome-white.svg";
import styled from "styled-components";
import colors from "../utils/style/colors";
import { Link } from "react-router-dom";

const Styles = styled.div`
  .navbar {
    background-color: #072049ff !important;
  }

  img {
    max-width: 250px;
  }

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
  return (
    <Styles>
      <header>
        <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
          <Container>
            <Navbar.Brand as={Link} to="/home">
              <Image alt="Groupomania" src={HeaderLogo} />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="ms-auto">
                <Nav.Link as={Link} eventKey={1} to="/home">
                  Accueil
                </Nav.Link>
                <Nav.Link as={Link} eventKey={2} to="/profile">
                  Profil
                </Nav.Link>
                <Nav.Link as={Link} eventKey={3} to="/auth">
                  Déconnexion
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    </Styles>
  );
}

export default MainHeader;
