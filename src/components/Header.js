import React from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import logo from "../assets/icons/header-logo.svg";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { logout } from "../redux/actions/authenticationAction";

const Header = () => {
  // let navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const logoutHandler = () => {
    dispatch(logout());
    // navigate("/");
  };
  return (
    <>
      <header>
        <Navbar bg="dark" variant="dark">
          <Container>
            <LinkContainer to="/">
              <Navbar.Brand>
                <img
                  alt=""
                  src={logo}
                  width="30"
                  height="30"
                  className="d-inline-block align-top"
                />
                Task Managemnt App
              </Navbar.Brand>
            </LinkContainer>
            <Nav className="ml-auto">
              <LinkContainer to="/dashboard">
                <Nav.Link>Dashboard</Nav.Link>
              </LinkContainer>

              <LinkContainer to="/tasks">
                <Nav.Link>Tasks</Nav.Link>
              </LinkContainer>

              <LinkContainer to="/members">
                <Nav.Link>Members</Nav.Link>
              </LinkContainer>

              {userInfo ? (
                <NavDropdown title={userInfo?.name}>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/">
                  <Nav.Link>
                    <i className="fas fa-user "></i> Login
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Container>
        </Navbar>
      </header>
    </>
  );
};

export default Header;
