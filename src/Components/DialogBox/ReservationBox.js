import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ReservationBox(props) {

  return (
    <div>
      <Dialog
        open={props.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={()=>props.handleClose()}
        aria-describedby="conformation box"
      >
        <DialogTitle>{props.dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText id="conformation box">{props.dialogContent}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>props.handleClose()}>Ok</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}