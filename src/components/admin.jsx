import { useState } from "react";
import Nav from "react-bootstrap/Nav";

import Users from "./admin/users";
import Orders from "./admin/orders";
import Parkings from "./admin/parkings";

const Component = () => {
  const [selectedTab, setSelectedTab] = useState("Users");

  const handleChange = (eventKey) => {
    setSelectedTab(eventKey);
  };

  return (
    <>
      <h2>Интерфейс администратора</h2>
      <Nav variant="tabs" defaultActiveKey="/home" onSelect={handleChange}>
        <Nav.Item>
          <Nav.Link eventKey="Users" active={selectedTab === "Users"}>
            Посетители
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="Parkings" active={selectedTab === "Parkings"}>
            Парковки
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="Orders" active={selectedTab === "Orders"}>
            Заказы
          </Nav.Link>
        </Nav.Item>
      </Nav>
      {selectedTab === "Users" && <Users />}
      {selectedTab === "Parkings" && <Parkings />}
      {selectedTab === "Orders" && <Orders />}
    </>
  );
};

export default Component;
