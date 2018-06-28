import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    alignItems: 'center',
  },
});

class TimerSelect extends Component {
  constructor(props) {
    super(props)
  }

  foodTimerClick = () => {
    this.props.history.push('/timer');
  };

  youTimerClick = () => {
    this.props.history.push('/timer');
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Grid container spacing={24} alignItems={'center'} justify={'center'} direction={'column'} spacing={8}>
          <Grid item>
            <img src='images/clock.jpg' width='90%' />
          </Grid>
          <Grid item >
            <h2>What's first today?</h2>
          </Grid>
          <Grid item>
            <Button onClick={this.foodTimerClick} variant="contained" color="primary" className={classes.button}>
              FOOD
      </Button>
            <Button onClick={this.youTimerClick} variant="contained" color="primary" className={classes.button}>
              YOU
      </Button>
          </Grid>
        </Grid>
      </div>
    )
  }
}

TimerSelect.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(TimerSelect);