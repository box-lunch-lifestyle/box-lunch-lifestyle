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
      <div className="foodTimer">
        <Countdown 
          timeRemainingInSeconds={900} 
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