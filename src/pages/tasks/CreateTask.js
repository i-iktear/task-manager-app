import React, { useEffect, useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { useParams } from "react-router-dom";

// import Loader from "../components/Loader";
// import Toaster from "../components/Toaster";

const CreateTask = ({ match }) => {
  let navigate = useNavigate();
  let { id } = useParams();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assigne, setAssigne] = useState("");
  const [membersList, setMembersList] = useState([]);

  useEffect(() => {
    if (id) {
      const membersListFromStorage = localStorage.getItem("tasksList")
        ? JSON.parse(localStorage.getItem("tasksList"))
        : null;
      const member = membersListFromStorage.find((member) => member.id === id);
      setTitle(member?.title);
      setDescription(member?.description);
      setAssigne(member?.assignTo);
    }
    const membersListFromStorage = localStorage.getItem("membersList")
      ? JSON.parse(localStorage.getItem("membersList"))
      : null;
    setMembersList(membersListFromStorage);
  }, [id]);

  const submitHandler = (e) => {
    e.preventDefault();

    const tasksListFromStorage = localStorage.getItem("tasksList")
      ? JSON.parse(localStorage.getItem("tasksList"))
      : null;

    if (id) {
      const newTaskList = tasksListFromStorage.map((task) => {
        if (task.id === id) {
          task.title = title;
          task.description = description;
          task.assignTo = assigne;
          task.date = new Date();
        }
        return task;
      });
      localStorage.setItem("tasksList", JSON.stringify(newTaskList));
      navigate("/tasks");
    } else {
      localStorage.setItem(
        "tasksList",
        JSON.stringify([
          ...tasksListFromStorage,
          {
            id: uuid(),
            title,
            description,
            assignTo: assigne,
            date: new Date(),
          },
        ])
      );
      navigate("/tasks");
    }
  };

  return (
    <Container>
      {/* {error && <Toaster variant="danger">{error}</Toaster>}
      {loading ? <Loader /> : null} */}
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <center>
            <h1> {id ? "Update Task" : "Create Task"} </h1>
          </center>
          {/* {error && <Message variant="danger">{error}</Message>}
          {loading && <Loader />} */}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="title">
              <Form.Label>
                {" "}
                <b>Title *</b>{" "}
              </Form.Label>
              <Form.Control
                placeholder="Enter Title"
                value={title}
                required
                onChange={(e) => setTitle(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>
                <b>Descripion</b>{" "}
              </Form.Label>
              <Form.Control
                placeholder="Enter Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId="category">
              <Form.Label>Assign To</Form.Label>
              <Form.Control
                as="select"
                value={assigne}
                onChange={(e) => setAssigne(e.target.value)}
              >
                {/* <option value="">Choose...</option>
                <option value="Web App">Web App</option>
                <option value="Android App">Android App</option>
                <option value="Ios App">Ios App</option> */}
                {membersList &&
                  membersList.map((member) => (
                    <option key={member.id} value={member.name}>
                      {member.name}
                    </option>
                  ))}
              </Form.Control>
            </Form.Group>
            <br />
            <div className="d-grid gap-2">
              <Button type="submit" size="sm" variant="primary">
                {id ? "Update Task" : "Create Task"}
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateTask;
