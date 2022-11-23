import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import { setMovies } from "./reducerSlice";

const Component = () => {
  const apiBase = useSelector((state) => state.toolkit.apiBase);
  const movies = useSelector((state) => state.toolkit.movies);
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get(`${apiBase}/movies`).then((resp) => {
      dispatch(setMovies(resp.data));
    });
  }, [apiBase, dispatch]);

  return (
    <>
      <h1>Сегодня в кино</h1>
      <Row>
        {movies &&
          movies.map((x) => (
            <Col key={x.id} md="4" xl="3">
              <Card style={{ width: "100%" }}>
                <Card.Img variant="top" src={`${x.image}`} />
                <Card.Body>
                  <Card.Title>{x.name}</Card.Title>
                  <Card.Text>{x.description}</Card.Text>
                  <ButtonGroup>
                    <Button
                      variant="outline-primary"
                      as={Link}
                      to={`info/${x.id}`}
                    >
                      О фильме
                    </Button>
                    <Button variant="primary" as={Link} to={`order/${x.id}`}>
                      Купить билет
                    </Button>
                  </ButtonGroup>
                </Card.Body>
              </Card>
            </Col>
          ))}
        {!movies && (
          <>
            <h3>В данный момент сеансов нет</h3>
            <p>Если вы администратор - добавьте сеансы</p>
          </>
        )}
      </Row>
    </>
  );
};

export default Component;
