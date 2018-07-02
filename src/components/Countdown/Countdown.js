import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Pause from '@material-ui/icons/PauseCircleOutline';
import Play from '@material-ui/icons/PlayCircleOutline';
import Stop from '@material-ui/icons/Cancel';
import Grid from '@material-ui/core/Grid';
import swal from 'sweetalert2';
import { withStyles } from '@material-ui/core/styles';

// Styles for the buttons and icons that appear in page
const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  icon: {
    width: '100%',
    height: '100%',
  }
});

class Countdown extends Component {
  constructor(props) {
    super(props)

    // We need to track the values for the numbers and if the timer is currently paused
    this.state = {
      minutes: 0,
      seconds: 0,
      countdownStatus: 'stopped',
      isRunning: true,
    };
  }
  // timeRemainingInSeconds = 900;

  // Calculates the total seconds remaining as minutes and seconds(less than 60)
  // and saves it to the local state.
  updateMinutesAndSeconds(timeRemainingInSeconds) {
    let minutes = Math.floor(timeRemainingInSeconds / 60);
    let seconds = timeRemainingInSeconds % 60;
    this.setState({
      minutes,
      seconds
    });
  }

  // Function that runs the timer
  timerCountdown(timeRemainingInSeconds) {
    // Checks if the timer is paused
    if (this.state.isRunning) {
      // If 2 min remain, runs function.
      if (timeRemainingInSeconds === 120) {
        this.props.onEveryMinute();
      }
      // If time has run out, runs the function and returns (ending the timerCountdown)
      if (timeRemainingInSeconds === 0) {
        this.props.onCompletion();
        return;
      }
      this.setState({
        timeRemainingInSeconds
      });
      // Saves current time to local storage
      localStorage.setItem('timeRemainingInSeconds', timeRemainingInSeconds);
      // If the time is not negative, updates the time, reduces remaining time by 1,
      // Waits 1 second, and runs this function again with the new remaining time.
      if (timeRemainingInSeconds >= 0) {
        this.updateMinutesAndSeconds(timeRemainingInSeconds);
        timeRemainingInSeconds = timeRemainingInSeconds - 1;
        this.setTimeoutId = setTimeout(this.timerCountdown.bind(this, timeRemainingInSeconds), 1000);
      }
    // If timer is paused, wait 1 second and run this function again.
    } else {
      this.setTimeoutId = setTimeout(this.timerCountdown.bind(this, timeRemainingInSeconds), 1000);
    }
  }

  // This function will eventually allow us to store the time serverside temporatily so a user can
  // refresh the page without losing their time. (may not be needed).
  compareServerTimeandComponentTimeandUpdateServer(serverSideTimeRemainingInSeconds) {
    let componentTimeRemainingInSeconds = localStorage.getItem('timeRemainingInSeconds');
    if (componentTimeRemainingInSeconds && componentTimeRemainingInSeconds < serverSideTimeRemainingInSeconds) {
      let differenceInMinutes = Math.floor((serverSideTimeRemainingInSeconds - componentTimeRemainingInSeconds) / 60)
      if (differenceInMinutes > 0) {
        this.props.onEveryMinute(differenceInMinutes)
      }
      return componentTimeRemainingInSeconds;
    }
    return serverSideTimeRemainingInSeconds;
  }

  // If the component receives a new timeRemainingInSeconds, replace the old one with the new one (may be unnecesary now) 
  componentWillReceiveProps(nextProps) {
    if (this.props.timeRemainingInSeconds !== nextProps.timeRemainingInSeconds) {
      let timeRemainingInSeconds = this.compareServerTimeandComponentTimeandUpdateServer(nextProps.timeRemainingInSeconds);
      this.timerCountdown(timeRemainingInSeconds);
    }
    console.log(this.state)
    console.log(nextProps)
  }

  // When component mounts, run timer.
  componentDidMount() {
    this.timerCountdown(this.props.timeRemainingInSeconds)
  }

  componentWillUnmount() {
    clearTimeout(this.setTimeoutId);

  }

  // Pauses the timer
  pause = () => {
    // tbd after we determine how the timer will function
    console.log('pause');
    this.setState({
      isRunning: false,
    })
  };

  // Unpauses the timer
  play = () => {
    // tbd after we determine how the timer will function
    console.log('play');
    this.setState({
      isRunning: true,
    })
  };

  // Offers a SweetAlert for stopping the timer. On confirmation, send user home.
  stop = () => {
    swal({
      title: 'Are you sure?',
      text: "You'll have to start from the beginning!",
      type: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#BB221C',
      confirmButtonText: 'I need to stop!'
    }).then((result) => {
      if (result.value) {
        // do we want a sweet alert here? Yes we do;)
        this.props.history.push('/home');
      }
    })

  };

  render() {

    const { classes } = this.props;

    let pausePlayButton;
    let timer;
    if (this.state.isRunning) {
      timer = <p>The timer is running</p>
      pausePlayButton = <Button 
        variant="fab" 
        color="primary" 
        onClick={this.pause} 
        className={classes.button} 
        >
          <Pause className={classes.icon} />
        </Button>
    } else {
      timer = <p>The timer is paused</p>
      pausePlayButton = <Button variant="fab" color="primary" onClick={this.play} className={classes.button} ><Play className={classes.icon} /></Button>
    }

    return (
      <div>
        <div>
          {this.state.minutes > 9 ?
            this.state.minutes : '0' + this.state.minutes}:
        {this.state.seconds > 9 ?
            this.state.seconds : '0' + this.state.seconds}
        </div>

        <Grid item>
          {pausePlayButton}
          <Button variant="fab" color="secondary" onClick={this.stop} className={classes.button} ><Stop className={classes.icon} /></Button>
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles)(Countdown);