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
        <Countdown 
          timeRemainingInSeconds={121} 
          onEveryMinute={() => { }} 
          onCompletion={this.props.onComplete} 
          twoMinWarning={this.props.twoMinWarning}
          history={this.props.history} 
        />
      </div>
    )
  }
}

export default connect(mapStateToProps)(FoodTimer);