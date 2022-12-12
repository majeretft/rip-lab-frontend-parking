import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const C = () => {
  return (
    <div className="footer bg-primary bg-gradient py-3">
      <Container>
        <div className="d-flex flex-row justify-content-between align-items-center">
          <p className="my-0 text-white">Лабораторная работа по РИП</p>
          <Button variant="dark" as={Link} to="/admin">Интерфейс администратора</Button>
        </div>
      </Container>
    </div>
  );
};

export default C;
