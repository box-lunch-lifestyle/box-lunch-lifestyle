import React, { Component } from 'react';
import Moment from 'react-moment';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
});

function CompletedPage(props) {
  const { classes } = props;

  const handleClick = (pageLink) => () => {
    props.history.push(pageLink);
  }


  return (
    <div>
      <Grid container spacing={24} alignItems={'center'} justify={'center'} direction={'column'} spacing={16}>
        <Grid item>
          <Moment format="YYYY/MM/DD">
          </Moment>
        </Grid>
        <Grid item>
          <div className='completedMessage'>
            <h1>Nicely Done!</h1>
          </div>
        </Grid>
        <Grid item>
          <div className='completedImg'>
            <img src='images/cjguycharacter.jpg' alt='boxingBoy' width='90%' />
          </div>
        </Grid>
        <Grid>
          <div className='encouragementMessage'>
            <h2>Everyday Matters. Keep it up!</h2>
          </div>
        </Grid>
        <Grid>
          <div className='completedButton'>
            <Button onClick={handleClick('/home')} variant="contained" color="secondary" className={classes.button}>Home</Button>
          </div>
        </Grid>
      </Grid>
    </div>

  )
}




export default withStyles(styles)(CompletedPage);