import React, { useState } from "react";
import { v4 as uuid } from "uuid";

const ParkingContext = React.createContext({
  carParkedList: [],
  entrance: [],
  parkingSpace: [],
  slot: [],
  vehicleTypes: [],
  addCar: (carName, vehicleType, parkingSpace, startedPark, slotSelected) => {},
  viewParkedCars: () => {},
  updateCarParkingList: (id, status, endPark, totalPayable, totalHours) => {},
  returnedParking: (id, startedPark) => {},
  addNewGate: (gateName, parkingSlot) => {},
});

export const ParkingContextProvider = (props) => {
  const [carList, setCarList] = useState([]);
  const [entrance, setEntrance] = useState([
    {
      label: "Gate 1",
      value: 1,
      slot: 1,
    },
    {
      label: "Gate 2",
      value: 2,
      slot: 1,
    },
    {
      label: "Gate 3",
      value: 3,
      slot: 1,
    },
  ]);

  const addCarHandler = (
    carName,
    vehicleType,
    parkingSpace,
    startedPark,
    slotSelected
  ) => {
    let succedingAmount = "";
    if (parkingSpace === "small") {
      succedingAmount = 20;
    } else if (parkingSpace === "medium") {
      succedingAmount = 60;
    } else if (parkingSpace === "large") {
      succedingAmount = 100;
    }

    setCarList([
      ...carList,
      {
        id: uuid(),
        carName,
        vehicleType,
        parkingSpace,
        slotSelected,
        startedPark: startedPark,
        endPark: "",
        succedingAmount: succedingAmount,
        totalPayable: "",
        status: "parking",
        totalHours: "",
      },
    ]);
  };

  const viewParkedCarsHandler = () => {
    console.log("dsf", carList);
  };

  const updateCarParkingList = (
    id,
    status,
    endPark,
    totalPayable,
    totalHours
  ) => {
    setCarList(
      carList.map((car) =>
        car.id === id
          ? {
              ...car,
              status: status,
              totalPayable: totalPayable,
              endPark: endPark,
              totalHours: totalHours,
            }
          : car
      )
    );
  };

  const returnedParking = (id, startedPark) => {
    setCarList(
      carList.map((car) =>
        car.id === id
          ? {
              ...car,
              status: "Returned Parking",
              startedPark: startedPark,
              totalPayable: "",
              endPark: "",
              totalHours: "",
            }
          : car
      )
    );
  };

  const addNewGate = (gateName, parkingSlot) => {
    setEntrance([
      ...entrance,
      { label: gateName, value: uuid(), slot: parkingSlot },
    ]);
  };

  const contextValue = {
    carParkedList: carList,
    entrance: entrance,
    parkingSpace: [
      {
        label: "Small Parking Area",
        vehicleType: ["small"],
        value: "small",
      },
      {
        label: "Medium Parking Area",
        vehicleType: ["small", "medium"],
        value: "medium",
      },
      {
        label: "Large Parking Area",
        vehicleType: ["small", "medium", "large"],
        value: "large",
      },
    ],
    slot: [
      {
        label: "Slot 1",
        value: 1,
      },
      {
        label: "Slot 2",
        value: 2,
      },
      {
        label: "Slot 3",
        value: 3,
      },
    ],
    vehicleTypes: [
      {
        label: "Small Vehicle",
        value: "small",
      },
      {
        label: "Medium Vehicle",
        value: "medium",
      },
      {
        label: "Large Vehicle",
        value: "large",
      },
    ],
    addCar: addCarHandler,
    viewParkedCars: viewParkedCarsHandler,
    updateCarParkingList: updateCarParkingList,
    returnedParking: returnedParking,
    addNewGate: addNewGate,
  };
  return (
    <ParkingContext.Provider value={contextValue}>
      {props.children}
    </ParkingContext.Provider>
  );
};

export default ParkingContext;
