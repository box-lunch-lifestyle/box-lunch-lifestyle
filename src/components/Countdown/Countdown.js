import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Pause from '@material-ui/icons/PauseCircleOutline';
import Play from '@material-ui/icons/PlayCircleOutline';
import Stop from '@material-ui/icons/Cancel';
import Grid from '@material-ui/core/Grid';
import swal from 'sweetalert2';
import { withStyles } from '@material-ui/core/styles';

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

    this.state = {
      minutes: 0,
      seconds: 0,
      countdownStatus: 'stopped',
      isRunning: true,
    };
  }
  // timeRemainingInSeconds = 900;

  updateMinutesAndSeconds(timeRemainingInSeconds) {
    let minutes = Math.floor(timeRemainingInSeconds / 60);
    let seconds = timeRemainingInSeconds % 60;
    this.setState({
      minutes,
      seconds
    });
  }

  timerCountdown(timeRemainingInSeconds) {
    this.setState({
      timeRemainingInSeconds
    });
    if (this.state.isRunning) {
      if (timeRemainingInSeconds === 120) {
        this.props.onEveryMinute();
      }
      if (timeRemainingInSeconds === 0) {
        this.props.onCompletion();
      }
      localStorage.setItem('timeRemainingInSeconds', timeRemainingInSeconds);
      if (timeRemainingInSeconds >= 0) {
        this.updateMinutesAndSeconds(timeRemainingInSeconds);
        timeRemainingInSeconds = timeRemainingInSeconds - 1;
        this.setTimeoutId = setTimeout(this.timerCountdown.bind(this, timeRemainingInSeconds), 1000);
      }
    } else {
      this.setTimeoutId = setTimeout(this.timerCountdown.bind(this, timeRemainingInSeconds), 1000);
    }
  }



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

  componentWillReceiveProps(nextProps) {
    if (this.props.timeRemainingInSeconds !== nextProps.timeRemainingInSeconds) {
      let timeRemainingInSeconds = this.compareServerTimeandComponentTimeandUpdateServer(nextProps.timeRemainingInSeconds);
      this.timerCountdown(timeRemainingInSeconds);
    }
    console.log(this.state)
    console.log(nextProps)
  }

  componentDidMount() {
    this.timerCountdown(this.props.timeRemainingInSeconds)
  }

  componentWillUnmount() {
    clearTimeout(this.setTimeoutId);
  }








  pause = () => {
    // tbd after we determine how the timer will function
    console.log('pause');
    this.setState({
      isRunning: false,
    })
  };

  play = () => {
    // tbd after we determine how the timer will function
    console.log('play');
    this.setState({
      isRunning: true,
    })
  };



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