import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Table from "react-bootstrap/Table";
import axios from "axios";

import authHeader from "../services/auth-header";

import {
  setOrders,
  setOrderStatuses,
  setMovies,
  setSeats,
} from "./reducerSlice";

const Profile = () => {
  const user = useSelector((state) => state.toolkit.user);

  const apiBase = useSelector((state) => state.toolkit.apiBase);
  const movies = useSelector((state) => state.toolkit.movies);
  const seats = useSelector((state) => state.toolkit.seats);
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

    axios.get(`${apiBase}/movies`, { headers: authHeader() }).then((resp) => {
      dispatch(setMovies(resp.data));
    });

    axios.get(`${apiBase}/seats`, { headers: authHeader() }).then((resp) => {
      dispatch(setSeats(resp.data));
    });
  }, [apiBase, dispatch]);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{user.username}</strong> Имя пользователя
        </h3>
      </header>
      <p>
        <strong>Токен:</strong> {user.accessToken.substring(0, 20)} ...{" "}
        {user.accessToken.substr(user.accessToken.length - 20)}
      </p>
      <p>
        <strong>Id:</strong> {user.id}
      </p>
      <p>
        <strong>Электронная почта:</strong> {user.email}
      </p>
      <strong>Права доступа:</strong>
      <ul>
        {user.roles &&
          user.roles.map((role, index) => <li key={index}>{role}</li>)}
      </ul>

      {orders.length > 0 &&
        movies.length > 0 &&
        orderStatuses.length > 0 &&
        seats.length > 0 && (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Статус</th>
                <th>Фильм</th>
                <th>Место</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 &&
                orders
                  .map((x) => {
                    const s = seats.find((el) => +el.id === x.seat_id);

                    return (
                      <tr key={x.id}>
                        <td>{x.id}</td>
                        <td>
                          {orderStatuses &&
                            orderStatuses.find((e) => +e.val === +x.status)
                              ?.name}
                        </td>
                        <td>
                          {movies.find((el) => +el.id === x.movie_id).name}
                        </td>
                        <td>{`Зал ${s.hall} ряд ${s.row} место ${s.number}`}</td>
                      </tr>
                    );
                  })}
              {!orders.length && (
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
    </div>
  );
};

export default Profile;
