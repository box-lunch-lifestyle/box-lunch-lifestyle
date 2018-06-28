import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import sweetAlert from 'sweetalert';
import Button from '@material-ui/core/Button';
import Pause from '@material-ui/icons/PauseCircleOutline';
import Play from '@material-ui/icons/PlayCircleOutline';
import Stop from '@material-ui/icons/Cancel';

const mapStateToProps = reduxState => ({
  timer: reduxState.timer,
});

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  icon: {
    width: '100%',
    height: '100%',
  }
})

class TimerPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentModal: 'food',
      currentRound: '',
      timerIsRunning: true,
    }
  };

  componentDidMount = () => {
    this.setState ({
      //UNCOMMENT BELOW WHEN WE IMPLEMENT A REDUCER
      // currentModal: this.timer.firstModal,
      // currentRound: this.timer.firstRound,
    })
  };

  completeRoundOne = () => {
    if (this.state.currentRound === 'food') {
      this.setState ({
        currentModal: 'life',
        currentRound: 'life',
      })
    } else {
      this.setState ({
        currentModal: 'food',
        currentRound: 'food',
      })
    }
  };

  completeRoundTwo = () => {
    this.setState({
      currentModal: 'commentOption',
    })
  };

  modalConfirm = () => {
    this.setState({
      currentModal: '',
    })
  };

  pause = () => {
    // tbd after we determine how the timer will function
    console.log('pause');
    this.setState({
      timerIsRunning: false,
    })
  };

  play = () => {
    // tbd after we determine how the timer will function
    console.log('play');
    this.setState({
      timerIsRunning: true,
    })
  };

  stop = () => {
    // do we want a sweet alert here?
    this.props.history.push('/home');
  };

  render() {

    const {classes} = this.props;

    let messageBar;

    if (this.state.currentModal === 'food') {
      messageBar = <div>
        <p>ENJOY YOUR FOOD.</p>
      </div>
    } else if (this.state.currentModal === 'life') {
      messageBar = <div>
        <p>ENJOY YOUR TIME.</p>
      </div>
    } else if (this.state.currentModal === 'commentOption') {
      messageBar = <div>
        <p>EXCELLENT!</p>
      </div>
    } else if (this.state.currentRound === 'food') {
      messageBar = <div>
        <p>CHEW. NOTICE. REFUEL.</p>
      </div>
    } else {
      messageBar = <div>
        <p>DO THIS FOR YOU</p>
      </div>
    }

    let timer;
    let pausePlayButton;
    if (this.state.timerIsRunning) {
      timer = <p>The timer is running</p>
      pausePlayButton = <Button variant="fab" color="primary" onClick={this.pause} className={classes.button} ><Pause className={classes.icon} /></Button>
    } else {
      timer = <p>The timer is paused</p>
      pausePlayButton = <Button variant="fab" color="primary" onClick={this.play} className={classes.button} ><Play className={classes.icon} /></Button>
    }

    return (

      <div>
        {messageBar}
        <div>
          {/* Timer will go in this div. */}
          <p>TIMER WILL GO HERE</p>
          {timer}
        </div>
        {pausePlayButton}
        <Button variant="fab" color="secondary" onClick={this.stop} className={classes.button} ><Stop className={classes.icon} /></Button>
      </div>
    )
  };
};

export default connect(mapStateToProps)(withStyles(styles)(TimerPage));