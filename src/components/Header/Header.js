import React from 'react';
import Grid from '@material-ui/core/Grid';

const Header = ({ title }) => (
  <div className="instructions">
    <div>
    <Grid container spacing={24} justify={'center'}>
    <Grid item>
      <img src='images/logo.jpg' width='90%' />
      </Grid>
      </Grid>
    </div>
  </div>
);

export default Header;
