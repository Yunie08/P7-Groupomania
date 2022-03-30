import React from "react";
import styled from "styled-components";

// React-bootsrap components
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Sonnet from "react-bootstrap/TabPane";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";

// Components
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";

// Assets
import logo from "../assets/icon-above-font-crop.png";

// Styled Component
const AuthStyles = styled.div`
  main {
    min-height: calc(100vh - 80px);
  }

  .card {
    max-width: 900px;
  }

  .nav-item {
    width: 50%;
  }

  .nav-link {
    width: 100%;
  }
`;

function Auth() {
  return (
    <AuthStyles>
      <main className="my-2 d-flex justify-content-center align-items-center">
        <Card className="rounded-3 shadow px-md-4 py-2">
          <Card.Body>
            <Row className="py-md-5">
              <Col md={5} className="d-flex align-items-center">
                <Image
                  src={logo}
                  alt="Groupomania"
                  className="img-fluid mb-5 mb-md-0"
                />
              </Col>
              <Col md={7}>
                <div>
                  <Tabs
                    defaultActiveKey="login"
                    id="uncontrolled-tab-example"
                    className="w-100 m-0"
                  >
                    <Tab eventKey="login" title="Connexion">
                      <Sonnet />
                      <div className="border border-top-0 p-4">
                        <LoginForm />
                      </div>
                    </Tab>
                    <Tab eventKey="signup" title="Inscription">
                      <Sonnet />
                      <div className="border border-top-0 p-4">
                        <SignupForm />
                      </div>
                    </Tab>
                  </Tabs>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </main>
    </AuthStyles>
  );
}

export default Auth;
