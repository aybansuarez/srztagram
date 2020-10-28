import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';

import spinnerStyle from './styles';

function Spinner() {
  const style = spinnerStyle();

  return (
    <Grid container className={style.root}>
      <CircularProgress />
    </Grid>
  );
}

export default Spinner;
