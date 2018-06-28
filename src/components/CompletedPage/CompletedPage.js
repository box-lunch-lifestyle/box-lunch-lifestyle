import React, { Component } from 'react';
import Header from '../Header/Header';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
});

function CompletedPage(props) {
  const { classes } = props;

    return (
      <div>
        <div className='header'>
          <Header />
        </div>
       {/* function for date would go here*/}
        <div className='completedMessage'>
          Nicely Done!
        </div>
        <div className='completedImg'>
          {/* <img src='' alt='boxingBoy' /> */}
        </div>
        <div className='encouragementMessage'>
          Everyday Matters. Keep it up!
        </div>
        <div className='completedButton'>
           {/* onClick function would go here with button*/}
        <Button variant="contained" color="secondary" className={classes.button}>Home</Button>
        </div>
      </div>

    )
  }



export default withStyles(styles)(CompletedPage);