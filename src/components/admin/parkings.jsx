import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";

import { addParking, setParkings, updateParkings } from "../reducerSlice";
import authHeader from "../../services/auth-header";

const Component = () => {
  const defNewObj = {
    parkingPlaces: "",
    freePlaces: "",
    address: "",
  };

  const [newObj, setNewObj] = useState(defNewObj);
  const apiBase = useSelector((state) => state.toolkit.apiBase);
  const parkings = useSelector((state) => state.toolkit.parkings);
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get(`${apiBase}/parkings`).then((resp) => {
      dispatch(setParkings(resp.data));
    });
  }, [apiBase, dispatch]);

  const addNew = (e) => {
    e.preventDefault();

    axios.post(`${apiBase}/parkings`, newObj).then((resp) => {
      dispatch(addParking(resp.data));
      setNewObj(defNewObj);
    });
  };

  const handleChange = (e) => {
    const newObjTmp = { ...newObj };

    newObjTmp[e.target.name] = e.target.value;

    setNewObj(newObjTmp);
  };

  const [show, setShow] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [parkingPlaces, setParkingPlaces] = useState("");
  const [freePlaces, setFreePlaces] = useState("");
  const [address, setAddress] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    const parking = parkings.find((x) => x.id === id);

    if (!parking) return;

    setSelectedId(parking.id);
    setParkingPlaces(parking.parkingPlaces);
    setFreePlaces(parking.freePlaces);
    setAddress(parking.address);

    setShow(true);
  };
  const handleSave = () => {
    const parking = parkings.find((x) => x.id === selectedId);

    if (!parking) return;

    const o = { ...parking };
    o.id = selectedId;
    o.parkingPlaces = parkingPlaces;
    o.freePlaces = freePlaces;
    o.address = address;

    axios
      .put(`${apiBase}/parkings/${o.id}`, o, { headers: authHeader() })
      .then((resp) => {
        dispatch(updateParkings(o));
        handleClose();
      });
  };

  return (
    <div className="mb-5 p-2 border border-top-0 rounded-bottom">
      <h3>Список парковок</h3>

      {parkings && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Мест всего</th>
              <th>Мест свободно</th>
              <th>Адрес</th>
              <th>Изменить</th>
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
                      <Button
                        variant="outline-secondary"
                        onClick={() => handleShow(x.id)}
                      >
                        &#9998;
                      </Button>
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
                <td>-</td>
              </tr>
            )}
          </tbody>
        </Table>
      )}

      <h3>Добавить новую парковочную зону</h3>

      <Form onSubmit={addNew}>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Полное количество парковочных мест</Form.Label>
              <Form.Control
                type="number"
                name="parkingPlaces"
                placeholder="Парковочных мест"
                value={newObj.parkingPlaces}
                onChange={handleChange}
              />
              <Form.Text className="text-muted">
                Полное количество парковочных мест (всего мест)
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Количество свободных мест</Form.Label>
              <Form.Control
                type="number"
                name="freePlaces"
                placeholder="Свободных мест"
                value={newObj.freePlaces}
                onChange={handleChange}
              />
              <Form.Text className="text-muted">
                Количество свободных мест (в данный момент)
              </Form.Text>
            </Form.Group>
          </Col>

          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Адрес парковочного комплекса</Form.Label>
              <Form.Control
                type="text"
                name="address"
                placeholder="Адрес нового парковочного комплекса"
                value={newObj.address}
                onChange={handleChange}
              />
              <Form.Text className="text-muted">
                Адрес парковочного комплекса
              </Form.Text>
            </Form.Group>
          </Col>
        </Row>

        <Button variant="primary" type="submit">
          Добавить
        </Button>
      </Form>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Редактирование записи</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Количество мест</Form.Label>
            <Form.Control
              type="number"
              name="parkingPlaces"
              placeholder="Количество мест"
              value={parkingPlaces}
              onChange={(e) => setParkingPlaces(e.target.value)}
              onBlur={(e) => setParkingPlaces(e.target.value)}
            />
            <Form.Text className="text-muted">
              Количество мест
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Количество свободных мест</Form.Label>
            <Form.Control
              type="number"
              name="freePlaces"
              placeholder="Количество свободных мест"
              value={freePlaces}
              onChange={(e) => setFreePlaces(e.target.value)}
              onBlur={(e) => setFreePlaces(e.target.value)}
            />
            <Form.Text className="text-muted">
              Количество свободных мест
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Адрес</Form.Label>
            <Form.Control
              type="text"
              name="address"
              placeholder="Адрес паркинга"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              onBlur={(e) => setAddress(e.target.value)}
            />
            <Form.Text className="text-muted">
              Адрес паркинга
            </Form.Text>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Отмена
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Сохранить
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Component;
