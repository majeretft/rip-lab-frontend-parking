import Movies from "./admin/movies";
import Orders from "./admin/orders";
import Seats from "./admin/seats";

const Component = () => {
  return (
    <>
      <h1>ADMIN</h1>
      <Movies />
      <Orders />
      <Seats />
    </>
  );
};

export default Component;
