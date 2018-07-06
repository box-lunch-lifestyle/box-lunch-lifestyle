import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Header from '../Header/Header';
import moment from 'moment';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    boxShadow: 'none',
  },
  root: {
    flexGrow: 1,
    // backgroundImage: `url(${"../images/blackboard.jpg"})`,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.primary.contrastText,
    background: theme.palette.primary.main,
  },
  date: {
    fontSize: 25,
  }
});

function CompletedPage(props) {
  const { classes } = props;

  const handleClick = (pageLink) => () => {
    props.history.push(pageLink);
  }

  const date = new Date();
  console.log(date);
  const formattedDate = moment(date).format("MMMM do, YYYY");
  console.log(formattedDate);

  return (
    <div className={classes.root}>
       <Header title="Box Lunch Lifestyle" />
       <audio src="/audio/trumpet_fanfare.mp3" autoPlay />
    <Grid container spacing={24} >
        <Grid item xs={12}>
          <div className='completedDate'>
            <Paper className={classes.paper}>
            <div className={classes.date}>
            {formattedDate}
            </div>
            </Paper>
          </div>
        </Grid>
      </Grid>
      <Grid container spacing={24} alignItems={'center'} justify={'center'} direction={'column'}>
        <Grid item>
          <div className='completedMessage'>
            <h2>Nicely done!</h2>
          </div>
        </Grid>
        <Grid item xs={8}>
          <div className='completedImg'>
            <img src='images/stickman.png' alt='boxingBoy' width='100%' margin='20px' />
          </div>
        </Grid>
        <Grid item xs={8}>
          <h3>Everyday matters. <br/> Keep it up! </h3>
        </Grid>
        <Grid item xs={6}>
          <Button onClick={handleClick('/home')} variant="contained" color="primary" className={classes.button}>Home</Button>
        </Grid>
      </Grid>
    </div>

  )
}

export default withStyles(styles)(CompletedPage);