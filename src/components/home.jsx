import ParkingList from "./parkingList";
import FindParking from "./findParking";

const Component = () => {
  return (
    <div className="mb-5">
      <FindParking />
      <hr className="my-5" />
      <ParkingList />
    </div>
  );
};

export default Component;
