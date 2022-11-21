import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Component = () => {
  const defNewObj = {
    hall: "",
    number: "",
    row: "",
    price: "",
  };

  const [seats, setSeats] = useState([]);
  const [newSeat, setNewSeat] = useState(defNewObj);
  const apiBase = useSelector((state) => state.toolkit.apiBase);

  useEffect(() => {
    axios.get(`${apiBase}/seats`).then((resp) => {
      setSeats(resp.data);
    });
  }, []);

  const addSeat = (e) => {
    e.preventDefault();

    axios.post(`${apiBase}/seats`, newSeat).then((resp) => {
      const tmp = seats.slice(0, seats.length);
      tmp.push(resp.data);
      setSeats(tmp);
      setNewSeat(defNewObj);
    });
  };

  const handleChange = (e) => {
    const newMovieTmp = { ...newSeat };

    newMovieTmp[e.target.name] = e.target.value;

    setNewSeat(newMovieTmp);
  };

  return (
    <div className="mb-5 p-2 border border-top-0 rounded-bottom">
      <h3>Список фильмов</h3>

      {seats && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Зал</th>
              <th>Ряд</th>
              <th>Номер</th>
              <th>Цена</th>
            </tr>
          </thead>
          <tbody>
            {seats.length > 0 &&
              seats.map((x) => {
                return (
                  <tr key={x.id}>
                    <td>{x.id}</td>
                    <td>{x.hall}</td>
                    <td>{x.row}</td>
                    <td>{x.number}</td>
                    <td>{x.price}</td>
                  </tr>
                );
              })}
            {!seats.length && (
              <tr>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
              </tr>
            )}
          </tbody>
        </Table>
      )}

      <h3>Добавить новое место в зал</h3>

      <Form onSubmit={addSeat}>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Название</Form.Label>
              <Form.Control
                type="number"
                name="hall"
                placeholder="Номер зала"
                value={newSeat.hall}
                onChange={handleChange}
              />
              <Form.Text className="text-muted">
                Номер зала для нового места
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Ряд</Form.Label>
              <Form.Control
                type="number"
                name="row"
                placeholder="Ряд"
                value={newSeat.row}
                onChange={handleChange}
              />
              <Form.Text className="text-muted">Номер ряда в зале</Form.Text>
            </Form.Group>
          </Col>

          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Номер места</Form.Label>
              <Form.Control
                type="number"
                name="number"
                placeholder="Номер места"
                value={newSeat.number}
                onChange={handleChange}
              />
              <Form.Text className="text-muted">
                Номер нового места в ряду
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Страна</Form.Label>
              <Form.Control
                type="number"
                name="price"
                placeholder="Стоимость места"
                value={newSeat.price}
                onChange={handleChange}
              />
              <Form.Text className="text-muted">
                Стоимость нового места в зале
              </Form.Text>
            </Form.Group>
          </Col>
        </Row>

        <Button variant="primary" type="submit">
          Добавить
        </Button>
      </Form>
    </div>
  );
};

export default Component;
