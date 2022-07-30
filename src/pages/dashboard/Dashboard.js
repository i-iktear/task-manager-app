import React from "react";
import Button from "react-bootstrap/Button";
import { LinkContainer } from "react-router-bootstrap";

const Dashboard = () => {
  return (
    <div className="d-grid gap-2">
      <LinkContainer to="/tasks">
        <Button variant="primary">Tasks</Button>
      </LinkContainer>

      <LinkContainer to="/members">
        <Button variant="secondary">Members</Button>
      </LinkContainer>
    </div>
  );
};

export default Dashboard;
