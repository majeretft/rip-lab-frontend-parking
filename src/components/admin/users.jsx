import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { addUser, setUsers } from "../reducerSlice";

const Component = () => {
  const derObj = {
    name: "",
    car: "",
  };

  const [newObj, setNewObj] = useState(derObj);
  const apiBase = useSelector((state) => state.toolkit.apiBase);
  const users = useSelector((state) => state.toolkit.users);
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get(`${apiBase}/users`).then((resp) => {
      dispatch(setUsers(resp.data));
    });
  }, [apiBase, dispatch]);

  const addNew = (e) => {
    e.preventDefault();

    axios.post(`${apiBase}/users`, newObj).then((resp) => {
      dispatch(addUser(resp.data));
      setNewObj(derObj);
    });
  };

  const handleChange = (e) => {
    const newMovieTmp = { ...newObj };

    newMovieTmp[e.target.name] = e.target.value;

    setNewObj(newMovieTmp);
  };

  return (
    <div className="mb-5 p-2 border border-top-0 rounded-bottom">
      <h3>Список посетителей</h3>

      {users && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Имя</th>
              <th>Автомобиль</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 &&
              users.map((x) => {
                return (
                  <tr key={x.id}>
                    <td>{x.id}</td>
                    <td>{x.name}</td>
                    <td>{x.car}</td>
                  </tr>
                );
              })}
            {!users.length && (
              <tr>
                <td>-</td>
                <td>-</td>
                <td>-</td>
              </tr>
            )}
          </tbody>
        </Table>
      )}

      <h3>Добавить посетителя</h3>

      <Form onSubmit={addNew}>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Имя</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Имя нового посетителя"
                value={newObj.name}
                onChange={handleChange}
              />
              <Form.Text className="text-muted">
                Имя нового посетителя
              </Form.Text>
            </Form.Group>
          </Col>
          
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Автомобиль</Form.Label>
              <Form.Control
                type="text"
                name="car"
                placeholder="Автомобиль нового посетителя"
                value={newObj.car}
                onChange={handleChange}
              />
              <Form.Text className="text-muted">Автомобиль нового посетителя</Form.Text>
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
