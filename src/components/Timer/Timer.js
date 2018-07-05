import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import sweetAlert from 'sweetalert';
import Button from '@material-ui/core/Button';
import Pause from '@material-ui/icons/PauseCircleOutline';
import Play from '@material-ui/icons/PlayCircleOutline';
import Stop from '@material-ui/icons/Cancel';
import Countdown from '../Countdown/Countdown';
import Grid from '@material-ui/core/Grid';
import swal from 'sweetalert2';
import FoodTimer from '../TimerOptions/FoodTimer';
import LifeTimer from '../TimerOptions/LifeTimer';
import Header from '../Header/Header';


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
      time: 9,
      audio: '',
    }
    this.addNote = this.addNote.bind(this);
  };

  // If user did not come via timerSelect page, redirect to timerSelect page
  componentWillMount = () => {
    if (this.props.timer.currentRound === '') {
      this.props.history.push('/timerSelect');
    }
  }

  // OLD CODE was used to monitor current modal and round
  //   (Modals were tracked because we originally had special 
  //   messages under the header depending on the modal/round)
  componentDidMount = () => {
    this.setState({
      //UNCOMMENT BELOW WHEN WE IMPLEMENT A REDUCER
      // currentModal: this.timer.firstModal,
      // currentRound: this.timer.firstRound,
      currentModal: 'food',
      currentRound: 'food',
    });
  };

  // OLD CODE was used to toggle the modal after the first round finished
  completeRoundOne = () => {
    if (this.state.currentRound === 'food') {
      this.setState({
        currentModal: 'life',
      })
    } else {
      this.setState({
        currentModal: 'food',
      })
    }
  };

  // OLD CODE was used to open comment modal after second round
  completeRoundTwo = () => {
    this.setState({
      currentModal: 'commentOption',
    })
  };

  // OLD CODE was used to remove the current modal
  modalConfirm = () => {
    this.setState({
      currentModal: '',
    })
  };

  // OLD CODE moved to Countdown.js, this function paused the timer.
  pause = () => {
    // tbd after we determine how the timer will function
    console.log('pause');
    this.setState({
      timerIsRunning: false,
    })
  };

  // OLD CODE moved to Countdown.js, this function unpaused the timer
  play = () => {
    // tbd after we determine how the timer will function
    console.log('play');
    this.setState({
      timerIsRunning: true,
    })
  };

  // OLD CODE moved to Countdown.js, this function would offer a user to stop
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

  // Run at 2 minutes left
  twoMinWarning = () => {
    this.setState({
      audio: <audio src="/audio/2min_warning.mp3" autoPlay />
    })
  }

  // Run after timer finishes
  onComplete = () => {
    // Toggles next round
    this.setState({
      audio: <audio src="/audio/times_up.mp3" autoPlay />,
    });

    let nextRound;
    if (this.props.timer.currentRound === 'food') {
      nextRound = 'life';
    } else {
      nextRound = 'food';
    }

    // If just finished first round...
    if (!this.props.timer.isSecondRound) {
      swal({
        title: "Good Job!",
        text: "Ready For Round Two?",
        showConfirmButton: true,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'YES!',
        allowOutsideClick: false
      })
        .then((result) => {
          if (result.value) {
            this.props.dispatch({ type: 'SET_CURRENT_ROUND', payload: nextRound });
          }
        });
      this.props.dispatch({ type: 'SET_FIRST_ROUND_COMPLETED' });

      // If just finished second round...
    } else {
      this.addNote();
    }
  };

  // Opens comment sweetalert
  async addNote() {
    const { value: text } = await swal({
      title: 'Excellent!',
      input: 'textarea',
      inputPlaceholder: "What Should Your Future Self Know About Today?",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Save',
      cancelButtonText: 'Skip',
      allowOutsideClick: false
    })
    if (text) {
      this.props.dispatch({ type: 'FETCH_POST_COMMENT', payload: { comment: text } });
      this.props.dispatch({ type: 'POST_NEW_ENTRY', payload: { lunch_complete: true, activity_complete: true } });
      this.props.history.push('/completed');
    } else {
      this.props.dispatch({ type: 'POST_NEW_ENTRY', payload: { lunch_complete: true, activity_complete: true } });
      this.props.history.push('/completed');
    }
  };

  // Resets timer reducer to default state when finished
  componentWillUnmount = () => {
    this.props.dispatch({ type: 'CLEAR_TIMER_REDUCER' });
  }

  render() {

    const { classes } = this.props;

    let messageBar;

    if (this.props.timer.currentRound === 'food') {
      messageBar = <div>
        <p>ENJOY YOUR FOOD.</p>
      </div>
    } else if (this.props.timer.currentRound === 'life') {
      messageBar = <div>
        <p>ENJOY YOURSELF.</p>
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

    let countdown;
    if (this.props.timer.currentRound === 'food') {
      countdown = <div className="roundOne"><FoodTimer onComplete={this.onComplete} twoMinWarning={this.twoMinWarning} history={this.props.history} /></div>
    } else if (this.props.timer.currentRound === 'life') {
      console.log('DONE');
      countdown = <div className="roundTwo"><LifeTimer onComplete={this.onComplete} twoMinWarning={this.twoMinWarning} history={this.props.history} /></div>
    }

    return (

      <div>
        <Header title="Box Lunch Lifestyle" />
        {this.state.audio}
        <Grid container spacing={24} alignItems={'center'} justify={'center'} direction={'column'} spacing={16}>
          <Grid item>
            {messageBar}
          </Grid>
          <Grid>
            <div>
              {/* Timer will go in this div. */}
              <p>TIMER WILL GO HERE</p>
              {timer}
              {countdown}
            </div>
          </Grid>
        </Grid>
      </div>
    )
  };
};

export default connect(mapStateToProps)(withStyles(styles)(TimerPage));
