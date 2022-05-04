import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return (
    <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
  );
});

const Snack = props => {
  const { message, severity, open, setOpen } = props;
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={5000}
      onClose={handleClose}>
      <Alert
        severity={severity}
        onClose={handleClose}
        sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Snack;
