import { Context } from "src/index";
import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import PubSub from "pubsub-js";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

const Snack = () => {
  const store = React.useContext(Context);
  const [message, setMessage] = React.useState("");
  const [openSnack, setOpenSnack] = React.useState(false);

  const mySubscriber = () => {
    setMessage(store.message);
    setOpenSnack(true);
  };

  PubSub.subscribe("message for Snack", mySubscriber);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnack(false);
  };

  return (
    <Snackbar open={openSnack} autoHideDuration={5000} onClose={handleClose}>
      <Alert severity='warning' onClose={handleClose} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Snack;
