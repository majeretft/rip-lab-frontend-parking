import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

import logo from "../logo.svg";

const Component = () => {
  return (
    <Navbar bg="light" expand="lg" className="mb-3">
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex flex-row align-items-center">
          <img src={logo} style={{ height: `44px` }} className="me-3" alt="logo" />
          Кинотеатр Бауманец
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Домашняя страница</Nav.Link>
            <Nav.Link as={Link} to="/about">О Кинотеатре</Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/cart">Корзина</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Component;
