import React from 'react';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import alertStyle from './styles';

function Alert({ severity, message, open, setOpen }) {
  const style = alertStyle();
  const handleClose = () => setOpen(false);

  return (
    <Snackbar
      open={open}
      autoHideDuration={8000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <MuiAlert
        onClose={handleClose}
        severity={severity}
        className={style.root}
      >
        {message}
      </MuiAlert>
    </Snackbar>
  );
}

export default Alert;
