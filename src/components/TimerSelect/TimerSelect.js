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

  render() {
    const { classes } = this.props;
    return (
      <div>
        <img src='images/logo.jpg' width="400" />
        <img src='images/clock.jpg' width="400" />
        <Grid container spacing={24} justify={'center'}>
            <h3>What's first today?</h3>
          <Button variant="contained" color="secondary" className={classes.button}>
            FOOD
      </Button>
          <Button variant="contained" color="secondary" className={classes.button}>
            YOU
      </Button>
        </Grid>
      </div>
    )
  }
}

TimerSelect.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(TimerSelect);