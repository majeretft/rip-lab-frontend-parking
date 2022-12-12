import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Badge from "react-bootstrap/Badge";

import logo from "../logo.svg";

const Component = () => {
  const orders = useSelector((state) => state.toolkit.orders);

  return (
    <Navbar bg="primary" expand="lg" className="mb-3">
      <Container>
        <Navbar.Brand
          as={Link}
          to="/"
          className="d-flex flex-row align-items-center text-white"
        >
          <img
            src={logo}
            style={{ height: `44px` }}
            className="me-3"
            alt="logo"
          />
          Парковки университета
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" className="text-white">
              Домашняя страница
            </Nav.Link>
            <Nav.Link as={Link} to="/about" className="text-white">
              О Паркинге
            </Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/cart" className="text-white">
              {orders.length > 0 && (
                <Badge bg="secondary" className="me-1">
                  {orders.filter((x) => x.status === 1).length}
                </Badge>
              )}
              Корзина
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Component;
