import React from "react";
import { Button } from "reactstrap";

const CustomButton = ({ handleClick, type, text, className, disabled }) => {
  return (
    <Button onClick={handleClick} type={type} disabled={disabled}>
      {text}
    </Button>
  );
};

export default CustomButton;
