import React, { useEffect, useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../redux/actions/authenticationAction";
import Loader from "../components/Loader";
import Toaster from "../components/Toaster";

const LoginScreen = ({ location, history }) => {
  let navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(loginAction(email, password));
  };

  useEffect(() => {
    if (userInfo) {
      navigate("/dashboard");
    }
  }, [userInfo, navigate]);

  return (
    <Container>
      {error && <Toaster variant="danger">{error}</Toaster>}
      {loading ? <Loader /> : null}
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <center>
            <h1>Log In</h1>
          </center>
          {/* {error && <Message variant="danger">{error}</Message>}
          {loading && <Loader />} */}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="email">
              <Form.Label>
                {" "}
                <b>Email Address</b>{" "}
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>
                {" "}
                <b>Password</b>{" "}
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <br />
            <div className="d-grid gap-2">
              <Button type="submit" size="sm" block variant="primary">
                Log in
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginScreen;
