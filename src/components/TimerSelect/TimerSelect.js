import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import swal from 'sweetalert2';
import { connect } from 'react-redux';

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
    swal({
      title: "READY?",
      text: "You Got This!",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#BB221C',
      confirmButtonText: 'YES!',
    })
    .then((result) => {
      if (result.value) {
        this.props.dispatch({type: 'SET_CURRENT_ROUND', payload: 'food'});
        this.props.history.push('/timer');
      } else if (result.dismiss === swal.DismissReason.cancel)
      {
        swal("Come Back When You're Ready");
      }
    });
  };

  youTimerClick = () => {
    swal({
      title: "READY?",
      text: "You Got This!",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#BB221C',
      confirmButtonText: 'YES!',
    })
    .then((result) => {
      if (result.value) {
        this.props.dispatch({type: 'SET_CURRENT_ROUND', payload: 'life'});
        this.props.history.push('/timer');
      } else if 
      (result.dismiss === swal.DismissReason.cancel)
      {
        swal("Come Back When You're Ready");
      }
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Grid container alignItems={'center'} justify={'center'} direction={'column'} spacing={8}>
          <Grid item>
            <img src='images/clock.jpg' width='100%' margin='20px'/>
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


export default connect()(withStyles(styles)(TimerSelect));