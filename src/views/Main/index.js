import React from 'react';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import Sidebar from '../../components/Sidebar';
import Topbar from '../../components/Topbar';
import { mainStyle } from './styles';

function Main({ component }) {
  const style = mainStyle();

  return (
    <Container maxWidth='md' className={style.root}>
      <Grid className={style.topbar}>
        <Topbar />
      </Grid>
      <Grid container>
        <Grid item sm={4} md={3} className={style.sidebar}>
          <Sidebar />
        </Grid>
        <Grid item xs={12} sm={8} md={9} className={style.main}>
          {component}
        </Grid>
      </Grid>
    </Container>
  );
}

export default Main;
