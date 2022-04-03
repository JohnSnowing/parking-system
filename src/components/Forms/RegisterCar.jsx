import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { Form } from "reactstrap";
import ParkingContext from "../../store/parking-context";
import CustomButton from "../Utilities/CustomButton";
import CustomDatetimePicker from "../Utilities/CustomDatetimePicker";
import CustomInput from "../Utilities/CustomInput";
import CustomSelect from "../Utilities/CustomSelect";

const RegisterCar = ({ slotSelected }) => {
  const [startedPark, setStartedPark] = useState(new Date());
  const [parkingSpace, setParkingSpace] = useState([]);

  const formik = useFormik({
    initialValues: {
      carName: "",
      vehicleType: "",
      slot: "",
      space: "",
      parkingSpace: "",
    },
    onSubmit: (values) => {
      if (
        values.carName === "" ||
        values.vehicleType === "" ||
        values.parkingSpace === "" ||
        startedPark === ""
      ) {
        alert("Fill all the fields");
      } else {
        parkingContext.addCar(
          values.carName,
          values.vehicleType,
          values.parkingSpace,
          startedPark,
          slotSelected
        );

        setParkingSpace([]);
        formik.resetForm();
      }
    },
  });

  const parkingContext = useContext(ParkingContext);

  const handleChangeVehicleType = (value) => {
    if (value === "small") {
      setParkingSpace(parkingContext.parkingSpace);
    } else if (value === "medium") {
      setParkingSpace(parkingContext.parkingSpace.slice(1).map((e) => e));
    } else {
      setParkingSpace(
        parkingContext.parkingSpace.filter((value, index) => index === 2)
      );
    }
  };

  return (
    <div>
      <h1>Register Car to Slot {slotSelected}</h1>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit(e);
        }}
      >
        <CustomInput
          label="Car Name"
          placeholder="Car Name"
          type="text"
          name="carName"
          id="carName"
          value={formik.values.carName}
          onChange={formik.handleChange}
        />
        <CustomSelect
          id="vehicleType"
          label="Vehicle Type"
          placeholder="Select Vehicle Type"
          onChange={(value) => {
            formik.setFieldValue("vehicleType", value.value);
            handleChangeVehicleType(value.value);
          }}
          options={parkingContext.vehicleTypes}
          value={formik.values.vehicleType}
        />
        <CustomSelect
          id="parkingSpace"
          label="Parking Space "
          placeholder="Select Parking Space Slot"
          onChange={(value) =>
            formik.setFieldValue("parkingSpace", value.value)
          }
          options={parkingSpace}
          value={formik.values.parkingSpace}
        />
        <CustomDatetimePicker
          label="Park Started"
          name="startedPark"
          id="startedPark"
          onChange={setStartedPark}
          value={startedPark}
        />

        <CustomButton type="submit" text="Submit" />
      </Form>
    </div>
  );
};

export default RegisterCar;
