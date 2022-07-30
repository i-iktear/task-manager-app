import React, { useEffect, useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { useParams } from "react-router-dom";

// import Loader from "../components/Loader";
// import Toaster from "../components/Toaster";

const AddMembers = ({ match }) => {
  let navigate = useNavigate();
  let { id } = useParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (id) {
      const membersListFromStorage = localStorage.getItem("membersList")
        ? JSON.parse(localStorage.getItem("membersList"))
        : null;
      const member = membersListFromStorage.find((member) => member.id === id);
      setName(member.name);
      setEmail(member.email);
    }
  }, [id]);

  const submitHandler = (e) => {
    e.preventDefault();

    const membersListFromStorage = localStorage.getItem("membersList")
      ? JSON.parse(localStorage.getItem("membersList"))
      : null;

    if (id) {
      const newMembersList = membersListFromStorage.map((member) => {
        if (member.id === id) {
          member.name = name;
          member.email = email;
        }
        return member;
      });
      localStorage.setItem("membersList", JSON.stringify(newMembersList));
      navigate("/members");
    } else {
      localStorage.setItem(
        "membersList",
        JSON.stringify([
          ...membersListFromStorage,
          {
            id: uuid(),
            name,
            email,
          },
        ])
      );
      navigate("/members");
    }
  };

  return (
    <Container>
      {/* {error && <Toaster variant="danger">{error}</Toaster>}
      {loading ? <Loader /> : null} */}
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <center>
            <h1>{id ? "Edit Member" : "Add Member"}</h1>
          </center>
          {/* {error && <Message variant="danger">{error}</Message>}
          {loading && <Loader />} */}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="email">
              <Form.Label>
                {" "}
                <b>Name *</b>{" "}
              </Form.Label>
              <Form.Control
                placeholder="Enter your email"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
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
            <br />
            <Button type="submit" size="sm" variant="primary">
              {id ? "Update Member" : "Add Member"}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AddMembers;
