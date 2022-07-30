import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <>
      <footer>
        <Container>
          <Row>
            <Col className="py-3 text-center">
              <p>&copy; 2022 Task Management App</p>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
};

export default Footer;
