import React, {useState, useEffect} from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

export const AlertError = (props) => {
  const {isOpen, message} = props;
  const [open, setOpen] = useState(false)

  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  useEffect(()=>{
    setOpen(isOpen);
  }, [isOpen]);
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error">
        please fill out {message.field}
      </Alert>
    </Snackbar>
  )
}
