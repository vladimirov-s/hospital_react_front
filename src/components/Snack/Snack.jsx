import { useState, useContext, forwardRef, useEffect } from "react";
import { Context } from "src/index";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

const Snack = () => {
  const store = useContext(Context);
  const [message, setMessage] = useState("");
  const [openSnack, setOpenSnack] = useState(false);

  const mySubscriber = () => {
    setMessage(store.message);
    setOpenSnack(true);
  };

  useEffect(() => {
    store.subscribe("message for Snack", mySubscriber);
  }, []);

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
