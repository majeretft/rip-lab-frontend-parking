import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Table from "react-bootstrap/Table";

import { setUsers } from "../reducerSlice";

const Component = () => {
  const apiBase = useSelector((state) => state.toolkit.apiBase);
  const users = useSelector((state) => state.toolkit.users);
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get(`${apiBase}/users`).then((resp) => {
      dispatch(setUsers(resp.data));
    });
  }, [apiBase, dispatch]);

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
              <th>Email</th>
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
                    <td>{x.email}</td>
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
    </div>
  );
};

export default Component;
