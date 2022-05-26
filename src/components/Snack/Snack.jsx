import { Context } from "src/index";
import * as React from "react";
import { observer } from "mobx-react-lite";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

const Snack = () => {
  const store = React.useContext(Context);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    store.setOpenSnack(false);
  };

  return (
    <Snackbar
      open={store.openSnack}
      autoHideDuration={5000}
      onClose={handleClose}>
      <Alert severity='warning' onClose={handleClose} sx={{ width: "100%" }}>
        {store.message}
      </Alert>
    </Snackbar>
  );
};

export default observer(Snack);
