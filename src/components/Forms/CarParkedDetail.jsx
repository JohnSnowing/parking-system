import React, { useContext, useState } from "react";
import ParkingContext from "../../store/parking-context";
import CustomButton from "../Utilities/CustomButton";
import CustomDatetimePicker from "../Utilities/CustomDatetimePicker";

const CarParkedDetail = ({
  carName,
  endPark,
  id,
  parkingSpace,
  slotSelected,
  status,
  startedPark,
  totalPayable,
  totalHours,
  vehicleType,
  succedingAmount,
  setShowDetails,
}) => {
  const parkingContext = useContext(ParkingContext);
  const [endParking, setEndParking] = useState(new Date());
  const [showStartedPark, setShowStartedParked] = useState(false);
  const [totalAmount, setTotalAmount] = useState();
  const [startedParking, setStartedParking] = useState(new Date());

  const handleUnparked = () => {
    const startDate = new Date(startedPark).getTime();

    const endDate = new Date(endParking).getTime();

    const diff = endDate - startDate;

    const hours = Math.round(diff / 1000 / 60 / 60);

    if (status === "parking") {
      if (hours <= 3) {
        setTotalAmount(40);
        parkingContext.updateCarParkingList(
          id,
          "UnParked",
          endParking,
          40,
          hours
        );
      } else if (hours > 24) {
        const threeHours = 40;
        const calculateLeftHours = hours - 3;

        const numberOfDays = Math.round(calculateLeftHours / 24);
        const getTheRemainingHours = calculateLeftHours - numberOfDays * 24;

        const priceOfDays = numberOfDays * 5000;
        const getTheRemainingHoursPrice =
          succedingAmount * getTheRemainingHours;

        setTotalAmount(priceOfDays + getTheRemainingHoursPrice + threeHours);
        parkingContext.updateCarParkingList(
          id,
          "UnParked",
          endParking,
          priceOfDays + getTheRemainingHoursPrice + threeHours,
          hours
        );
      } else {
        const threehours = 40;
        const calculateLeftHours = hours - 3;

        const priceTotalHours = calculateLeftHours * succedingAmount;

        setTotalAmount(priceTotalHours + threehours);
        parkingContext.updateCarParkingList(
          id,
          "UnParked",
          endParking,
          priceTotalHours + threehours,
          hours
        );
      }
    } else {
      if (hours > 24) {
        const numberOfDays = Math.round(hours / 24);
        const getTheRemainingHours = hours - numberOfDays * 24;

        const priceOfDays = numberOfDays * 5000;
        const getTheRemainingHoursPrice =
          succedingAmount * getTheRemainingHours;

        setTotalAmount(priceOfDays + getTheRemainingHoursPrice);
        parkingContext.updateCarParkingList(
          id,
          "UnParked",
          endParking,
          priceOfDays + getTheRemainingHoursPrice,
          hours
        );
      } else {
        const priceTotalHours = hours * succedingAmount;

        setTotalAmount(priceTotalHours);
        parkingContext.updateCarParkingList(
          id,
          "UnParked",
          endParking,
          priceTotalHours,
          hours
        );
      }
    }

    setShowDetails((prevState) => !prevState);
  };

  const handleCarReturn = () => {
    setShowStartedParked(true);
  };

  const handlerReturnedParking = (value) => {
    if (status === "UnParked") {
      const endDate = new Date(endPark).getTime();

      const startedDate = new Date(value).getTime();

      const diff = startedDate - endDate;

      const hours = diff / 1000 / 60 / 60;

      console.log("kanang hours", hours);

      if (hours > 1) {
        alert("You cannot returned you are more than an hour Register Again");
      } else {
        parkingContext.returnedParking(id, value);
        setShowDetails((prevState) => !prevState);
      }
    }
  };

  return (
    <div style={{ marginLeft: "50px" }}>
      <div>
        <h1>Parking Details</h1>
        <p>For 3 hours 40 pesos and succeding is {succedingAmount}</p>
        <p>Car Parked: {carName}</p>
        <p>Vehicle Type: {vehicleType}</p>
        <p>Parking Space Selected: {parkingSpace}</p>
        <p>Started Parked: {startedPark.toString()}</p>
        {endPark === "" ? (
          <CustomDatetimePicker
            label="End Park"
            name="startedPark"
            id="startedPark"
            onChange={setEndParking}
            value={endParking}
          />
        ) : (
          <p>End Park: {endPark.toString()}</p>
        )}
        <p>TotalHours: {totalHours}</p>
        <p>Amount Payable: {totalPayable}</p>

        {endPark === "" && (
          <CustomButton
            text="Unparked"
            handleClick={handleUnparked}
            type="button"
          />
        )}

        {endPark && (
          <CustomButton
            text="Returned"
            handleClick={handleCarReturn}
            type="button"
          />
        )}

        {showStartedPark && (
          <CustomDatetimePicker
            label="Park Started"
            name="startedPark"
            id="startedPark"
            onChange={handlerReturnedParking}
            value={startedParking}
          />
        )}
      </div>
    </div>
  );
};

export default CarParkedDetail;
