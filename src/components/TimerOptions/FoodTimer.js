import React, { Component } from 'react';
import Countdown from '../Countdown/Countdown';
import { connect } from 'react-redux';

const mapStateToProps = reduxState => ({
  timer: reduxState.timer,
  user: reduxState.user,
});

class FoodTimer extends Component {
  render() {
    return (
      <div>FOOD TIMER
        <Countdown timeRemainingInSeconds={9} onEveryMinute={() => { }} onCompletion={this.props.onComplete} />
      </div>
    )
  }
}

export default connect(mapStateToProps)(FoodTimer);