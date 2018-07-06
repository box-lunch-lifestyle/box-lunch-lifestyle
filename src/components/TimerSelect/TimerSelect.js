import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import swal from 'sweetalert2';
import Play from '@material-ui/icons/PlayArrow';
import { connect } from 'react-redux';
import '@fortawesome/fontawesome-free/css/all.css';
import Header from '../Header/Header';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit * 2,
    // alignItems: 'center',
    boxShadow: 'none',
    justify: 'space-around',
  },
});

class TimerSelect extends Component {
  constructor(props) {
    super(props)
  }

  foodTimerClick = () => {
    swal({
      title: "READY?",
      text: "You got this!",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonColor: '#c82027',
      cancelButtonColor: '#5f5f5f',
      confirmButtonText: '<i class="fa fa-play"></i>',
    })
      .then((result) => {
        if (result.value) {
          this.props.dispatch({ type: 'SET_CURRENT_ROUND', payload: 'food' });
          this.props.history.push('/timer');
        } else if (result.dismiss === swal.DismissReason.cancel) {
          swal({
            title: "Come back when you're ready.",
            confirmButtonColor: '#c82027',
          })            .then(() => {
              this.props.history.push('/home');
            })
        }
      });
  };

  youTimerClick = () => {
    swal({
      title: "READY?",
      text: "You got this!",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonColor: '#c82027',
      cancelButtonColor: '#5f5f5f',
      confirmButtonText: '<i class="fa fa-play"></i>',
    })
      .then((result) => {
        if (result.value) {
          this.props.dispatch({ type: 'SET_CURRENT_ROUND', payload: 'life' });
          this.props.history.push('/timer');
        } else if
        (result.dismiss === swal.DismissReason.cancel) {
          swal({
            title: "Come back when you're ready.",
            confirmButtonColor: '#c82027',
          })
            .then(() => {
              this.props.history.push('/home');
            })
        }
      });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
            <Header title="Box Lunch Lifestyle" />
        <Grid container alignItems={'center'} justify={'center'} direction={'column'} spacing={8}>
          <Grid item>
            <img src='images/clock.jpg' width='100%' margin='20px' />
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