import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { setParkings } from "./reducerSlice";
import authHeader from "../services/auth-header";

const Component = () => {
  let { id } = useParams();

  const apiBase = useSelector((state) => state.toolkit.apiBase);
  const parkings = useSelector((state) => state.toolkit.parkings);
  const parking = parkings.find((x) => +x.id === +id) || {};
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get(`${apiBase}/parkings`, { headers: authHeader() }).then((resp) => {
      dispatch(setParkings(resp.data));
    });
  }, [apiBase, dispatch]);

  return (
    <>
      <h1>Парковочная зона</h1>
      <hr />
      <Row>
        <Col md="6" lg="9">
          <p className="display-6">{parking.address}</p>

          <dl className="row">
            <dt className="col-sm-3">Количество мест</dt>
            <dd className="col-sm-9">{parking.parkingPlaces}</dd>

            <dt className="col-sm-3">Количество свободных мест</dt>
            <dd className="col-sm-9">{parking.freePlaces}</dd>
          </dl>
        </Col>
      </Row>
    </>
  );
};

export default Component;
