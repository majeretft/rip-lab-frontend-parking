import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import {
  addOrder,
  setOrders,
  setOrderStatuses,
  setUsers,
  setParkings,
} from "../reducerSlice";

const Component = () => {
  const [status, setStatus] = useState("");
  const [userId, setUserId] = useState("");
  const [parkingId, setParkingId] = useState("");

  const apiBase = useSelector((state) => state.toolkit.apiBase);
  const users = useSelector((state) => state.toolkit.users);
  const parkings = useSelector((state) => state.toolkit.parkings);
  const orders = useSelector((state) => state.toolkit.orders);
  const orderStatuses = useSelector((state) => state.toolkit.orderStatuses);
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get(`${apiBase}/orders`).then((resp) => {
      dispatch(setOrders(resp.data));
    });

    axios.get(`${apiBase}/orders/info/statuses`).then((resp) => {
      dispatch(setOrderStatuses(resp.data));
    });

    axios.get(`${apiBase}/users`).then((resp) => {
      dispatch(setUsers(resp.data));
    });

    axios.get(`${apiBase}/parkings`).then((resp) => {
      dispatch(setParkings(resp.data));
    });
  }, [apiBase, dispatch]);

  const addNew = (e) => {
    e.preventDefault();

    axios
      .post(`${apiBase}/orders`, {
        status: +status,
        user_id: +userId,
        parking_id: +parkingId,
      })
      .then((resp) => {
        dispatch(addOrder(resp.data));
      });
  };

  return (
    <div className="mb-5 p-2 border border-top-0 rounded-bottom">
      <h3>Список заказов</h3>

      {orders && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Статус</th>
              <th>ID Посетителя</th>
              <th>ID Паркинга</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 &&
              orders.map((x) => {
                return (
                  <tr key={x.id}>
                    <td>{x.id}</td>
                    <td>{orderStatuses && orderStatuses.find(e => +e.val === +x.status)?.name}</td>
                    <td>{x.user_id}</td>
                    <td>{x.parking_id}</td>
                  </tr>
                );
              })}
            {!orders.length && (
              <tr>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
              </tr>
            )}
          </tbody>
        </Table>
      )}

      <h3>Добавить новый заказ</h3>

      <Form onSubmit={addNew}>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Статус</Form.Label>
              <Form.Select
                name="status"
                placeholder="Статус заказа"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                onBlur={(e) => setStatus(e.target.value)}
              >
                <option disabled value="">Выберите статус</option>
                {orderStatuses &&
                  orderStatuses.map((x) => (
                    <option key={x.val} value={x.val}>
                      {x.name}
                    </option>
                  ))}
              </Form.Select>
              <Form.Text className="text-muted">Статус нового заказа</Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Посетитель (ID)</Form.Label>
              <Form.Select
                name="user_id"
                placeholder="Посетитель (ID)"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                onBlur={(e) => setUserId(e.target.value)}
              >
                <option disabled value="">Выберите Посетителя (ID)</option>
                {users &&
                  users.map((x) => (
                    <option key={x.id} value={x.id}>
                      {x.name}
                    </option>
                  ))}
              </Form.Select>
              <Form.Text className="text-muted">Заказчик для нового заказа</Form.Text>
            </Form.Group>
          </Col>

          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Парковка (ID)</Form.Label>
              <Form.Select
                name="parking_id"
                placeholder="Парковка (ID)"
                value={parkingId}
                onChange={(e) => setParkingId(e.target.value)}
                onBlur={(e) => setParkingId(e.target.value)}
              >
                <option disabled value="">Выберите паркинг (ID)</option>
                {parkings &&
                  parkings.map((x) => (
                    <option key={x.id} value={x.id}>
                      {x.address}
                    </option>
                  ))}
              </Form.Select>
              <Form.Text className="text-muted">Паркинг для нового заказа</Form.Text>
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
