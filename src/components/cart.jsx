import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import authHeader from "../services/auth-header";

import {
  setOrders,
  setOrderStatuses,
  setUsers,
  setParkings,
  deleteOrder,
  updateOrder,
} from "./reducerSlice";

const Component = () => {
  const apiBase = useSelector((state) => state.toolkit.apiBase);
  const users = useSelector((state) => state.toolkit.users);
  const parkings = useSelector((state) => state.toolkit.parkings);
  const orders = useSelector((state) => state.toolkit.orders);
  const orderStatuses = useSelector((state) => state.toolkit.orderStatuses);
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get(`${apiBase}/orders`, { headers: authHeader() }).then((resp) => {
      dispatch(setOrders(resp.data));
    });

    axios
      .get(`${apiBase}/orders/info/statuses`, { headers: authHeader() })
      .then((resp) => {
        dispatch(setOrderStatuses(resp.data));
      });

    axios.get(`${apiBase}/users`, { headers: authHeader() }).then((resp) => {
      dispatch(setUsers(resp.data));
    });

    axios.get(`${apiBase}/parkings`, { headers: authHeader() }).then((resp) => {
      dispatch(setParkings(resp.data));
    });
  }, [apiBase, dispatch]);

  const deleteCart = (id) => {
    axios
      .delete(`${apiBase}/orders/${id}`, { headers: authHeader() })
      .then((resp) => {
        dispatch(deleteOrder(id));
      });
  };
  const payCart = () => {
    const ordersInCart = orders.filter((x) => x.status === 1);

    for (const oic of ordersInCart) {
      const id = oic.id;
      const tmp = { ...oic };
      tmp.status = 2;
      axios
        .put(`${apiBase}/orders/${id}`, tmp, { headers: authHeader() })
        .then((resp) => {
          dispatch(updateOrder(tmp));
        });
    }
  };

  return (
    <div className="mb-5">
      <h3>Корзина</h3>

      <Form.Group className="mb-3">
        <Button variant="primary" onClick={payCart}>
          Оплатить заказ
        </Button>
      </Form.Group>

      {orders.length > 0 &&
        users.length > 0 &&
        orderStatuses.length > 0 &&
        parkings.length > 0 && (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Статус</th>
                <th>Паркинг</th>
                <th>Удалить</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 &&
                orders
                  .filter((x) => x.status === 1)
                  .map((x) => {
                    const s = parkings.find((el) => +el.id === x.parking_id);

                    return (
                      <tr key={x.id}>
                        <td>{x.id}</td>
                        <td>
                          {orderStatuses &&
                            orderStatuses.find((e) => +e.val === +x.status)
                              ?.name}
                        </td>
                        <td>
                          {users.find((el) => +el.id === x.user_id).name}
                        </td>
                        <td>{s.address}</td>
                        <td>
                          <Button
                            variant="danger"
                            style={{
                              color: "transparent",
                              textShadow: "0 0 0 white",
                            }}
                            onClick={() => deleteCart(x.id)}
                          >
                            &#10006;
                          </Button>
                        </td>
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

      <Form.Group className="mb-3">
        <Button variant="primary" onClick={payCart}>
          Оплатить заказ
        </Button>
      </Form.Group>
    </div>
  );
};

export default Component;
