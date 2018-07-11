import React, { Component } from 'react';
import Countdown from '../Countdown/Countdown';
import { connect } from 'react-redux';

const mapStateToProps = reduxState => ({
  timer: reduxState.timer,
  user: reduxState.user,
});

class LifeTimer extends Component {
  render() {
    return (
      <div className="lifeTimer">
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

export default connect(mapStateToProps)(LifeTimer);