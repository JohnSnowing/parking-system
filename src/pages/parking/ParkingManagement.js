import React, { useContext, useState } from "react";
import { Container } from "react-bootstrap";
import RegisterCar from "../../components/Forms/RegisterCar";
import CustomButton from "../../components/Utilities/CustomButton";
import CustomSelect from "../../components/Utilities/CustomSelect";
import ParkingContext from "../../store/parking-context";
import { useNavigate } from "react-router-dom";
const ParkingManagement = () => {
  const [gateSelected, setGateSelected] = useState(false);
  const [slotSelected, setSlotSelected] = useState("");
  const navigate = useNavigate();

  const parkingContext = useContext(ParkingContext);

  const addNewGate = () => {
    navigate("/new-gate");
  };

  const handleSelectGate = (value) => {
    setSlotSelected(value.value);
    if (value.value) {
      setGateSelected(true);
    }
  };

  return (
    <Container>
      <CustomSelect
        label="Select Gate"
        options={parkingContext.entrance}
        onChange={handleSelectGate}
      />
      <CustomButton
        type="button"
        handleClick={addNewGate}
        text="Add new Gate"
      />

      {gateSelected && <RegisterCar slotSelected={slotSelected} />}
    </Container>
  );
};

export default ParkingManagement;
