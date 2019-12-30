import React, { useState } from "react";
import { Alert } from "reactstrap";

const AlertExample = props => {
  const [visible, setVisible] = useState(true);

  const onDismiss = () => setVisible(false);

  const today = new Date();
  const expDate = new Date(props.expTarea);
  const hoursDiff = today.getHours() - expDate.getHours();
  if (
    today.getFullYear() === expDate.getFullYear() &&
    today.getDate() === expDate.getDate() &&
    hoursDiff <= 1 &&
    hoursDiff >= -1
  ) {
    return (
      <Alert color="warning" isOpen={visible} toggle={onDismiss}>
        Tu tarea <b>{props.nombreTarea}</b> está a punto de expirar.
      </Alert>
    );
  } else {
    return null;
  }
};

export default AlertExample;
