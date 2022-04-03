import React, { useContext, useState } from "react";
import DataTable from "react-data-table-component";
import CarParkedDetail from "../../components/Forms/CarParkedDetail";
import ParkingContext from "../../store/parking-context";

const columns = [
  {
    name: "Car Name",
    selector: (row) => row.carName,
  },
  {
    name: "Vehicle Type",
    selector: (row) => row.vehicleType,
  },
  {
    name: "Parking Space Parked",
    selector: (row) => row.parkingSpace,
  },
  {
    name: "Succeeding Amount over 3 hours",
    selector: (row) => row.succedingAmount,
  },
  {
    name: "Date Parked",
    selector: (row) => row.startedPark.toString(),
  },
  {
    name: "End Parked",
    selector: (row) => row.endPark.toString(),
  },
  {
    name: "Status",
    selector: (row) => row.status,
  },
];

const CarParkedList = () => {
  const parkingContext = useContext(ParkingContext);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedRow, setSelectedRow] = useState();

  const handleRowClicked = (row) => {
    if (row) {
      setShowDetails(true);
      setSelectedRow(row);
      console.log("row", row);
    }
  };

  return (
    <div>
      <DataTable
        data={parkingContext.carParkedList}
        columns={columns}
        pagination
        onRowClicked={handleRowClicked}
      />

      {showDetails && (
        <CarParkedDetail {...selectedRow} setShowDetails={setShowDetails} />
      )}
    </div>
  );
};

export default CarParkedList;
