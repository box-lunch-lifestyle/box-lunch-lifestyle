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
    }
    this.addNote = this.addNote.bind(this);
  };

  componentDidMount = () => {
    this.setState({
      //UNCOMMENT BELOW WHEN WE IMPLEMENT A REDUCER
      // currentModal: this.timer.firstModal,
      // currentRound: this.timer.firstRound,
      currentModal: 'food',
      currentRound: 'food',
    });
  };

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

  onComplete = () => {
    let nextRound;
    if (this.props.timer.currentRound === 'food'){
      nextRound = 'life';
    } else {
      nextRound ='food';
    }

    if(!this.props.timer.isSecondRound){
      swal({
        title: "Good Job!",
        text: "Ready For Round Two?",
        showConfirmButton: true,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'YES!',
      })
      .then((result) => {
        if (result.value) {
          this.props.dispatch({type: 'SET_CURRENT_ROUND', payload: nextRound});
        } 
      });
      this.props.dispatch({ type: 'SET_FIRST_ROUND_COMPLETED'});
    } else {
        this.addNote();
    } 
  };

  async addNote () {
    const {value: text} = await swal({
      input: 'textarea',
      inputPlaceholder: "What Should Your Future Self Know About Today?",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Save',
      cancelButtonText: 'Skip',
    })
    if (text) {
      this.props.dispatch({type: 'FETCH_POST_COMMENT', payload: {comment: text}});
      this.props.dispatch({type: 'POST_NEW_ENTRY', payload: {lunch_complete: true, activity_complete: true} });
    } else 
    {
      this.props.dispatch({type: 'POST_NEW_ENTRY', payload: {lunch_complete: true, activity_complete: true} });
    }
  };

  componentWillUnmount = () => {

  }

  render() {

    const { classes } = this.props;

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

    let countdown;
    if (this.props.timer.currentRound === 'food') {
      countdown = <div className="roundOne"><FoodTimer onComplete={this.onComplete} history={this.props.history} /></div>
    } else if (this.props.timer.currentRound === 'life') {
      console.log('DONE');
      countdown = <div className="roundTwo"><LifeTimer onComplete={this.onComplete} history={this.props.history} /></div>
    }

    return (

      <div>
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