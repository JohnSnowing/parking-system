import { useFormik } from "formik";
import React, { useContext } from "react";
import { Form } from "reactstrap";
import CustomInput from "../../components/Utilities/CustomInput";
import CustomSelect from "../../components/Utilities/CustomSelect";
import ParkingContext from "../../store/parking-context";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../components/Utilities/CustomButton";

const NewGate = () => {
  const parkingContext = useContext(ParkingContext);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      gateName: "",
      parkingSlot: "",
    },
    onSubmit: (values) => {
      if (values.gateName === "" || values.parkingSlot === "") {
        alert("Fill all the required Fields");
      } else {
        parkingContext.addNewGate(values.gateName, values.parkingSlot);
        navigate("/");
      }
    },
  });

  return (
    <div className="ms-5 me-5 mt-5">
      NewGate
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit(e);
        }}
      >
        <CustomInput
          label="Gate Name"
          placeholder="Gate name"
          type="text"
          name="gateName"
          id="gateName"
          value={formik.values.gateName}
          onChange={formik.handleChange}
        />
        <CustomSelect
          id="selectSlot"
          label="Parking Slot"
          placeholder="Select Parking Space Slot 1"
          onChange={(value) => formik.setFieldValue("parkingSlot", value.value)}
          options={parkingContext.slot}
          value={formik.values.parkingSlot}
        />

        <CustomButton type="submit" text="Submit" />
      </Form>
    </div>
  );
};

export default NewGate;
