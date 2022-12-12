import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import Form from "react-bootstrap/Form";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

const Component = () => {
  const apiBase = useSelector((state) => state.toolkit.apiBase);

  const [name, setName] = useState("");
  const [parkings, setParkings] = useState([]);

  const find = () => {
    axios.get(`${apiBase}/parkings/?address=${encodeURIComponent(name)}`).then((resp) => {
      setParkings(resp.data);
    });
  };

  return (
    <>
      <h1>Поиск парковочной площадки</h1>
      <Form.Group className="mb-3">
        <Form.Label>Часть адреса для поиска</Form.Label>
        <Form.Control
          type="text"
          placeholder="Часть адреса для поиска"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Form.Text className="text-muted">Часть адреса для поиска</Form.Text>
      </Form.Group>
      <Form.Group className="mb-3">
        <Button variant="primary" type="submit" onClick={find}>
          Найти
        </Button>
      </Form.Group>

      <h4>Результаты поиска</h4>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Мест всего</th>
            <th>Мест свободно</th>
            <th>Расположение</th>
          </tr>
        </thead>
        <tbody>
          {parkings.length > 0 &&
            parkings.map((x) => {
              return (
                <tr key={x.id}>
                  <td>{x.id}</td>
                  <td>{x.parkingPlaces}</td>
                  <td>{x.freePlaces}</td>
                  <td>{x.address}</td>
                  <td>
                    <ButtonGroup>
                      <Button
                        variant="outline-primary"
                        as={Link}
                        to={`info/${x.id}`}
                      >
                        О расположении
                      </Button>
                      <Button variant="primary" as={Link} to={`order/${x.id}`}>
                        Получить место
                      </Button>
                    </ButtonGroup>
                  </td>
                </tr>
              );
            })}
          {!parkings.length && (
            <tr>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  );
};

export default Component;
