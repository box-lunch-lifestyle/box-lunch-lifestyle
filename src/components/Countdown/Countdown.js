import React, { Component } from 'react';


class Countdown extends Component {
  constructor(props) {
    super(props)

    this.state= {
      minutes: 0,
      seconds: 0,
      countdownStatus: 'stopped',
    };
  }
  timeRemainingInSeconds = 900;

  updateMinutesAndSeconds(timeRemainingInSeconds){
    let minutes = Math.floor(timeRemainingInSeconds/60);
    let seconds = timeRemainingInSeconds % 60;
    this.setState({
      minutes,
      seconds
    });
  }

  timerCountdown (timeRemainingInSeconds, shouldSkipCallback){
    this.setState({
      timeRemainingInSeconds
    });
    if (!shouldSkipCallback && timeRemainingInSeconds % 60 === 0) {
      this.props.onEveryMinute(1);
    }
    if (timeRemainingInSeconds === 0) {
      this.props.onCompletion();
    }
    localStorage.setItem('timeRemainingInSeconds', timeRemainingInSeconds);
    if(timeRemainingInSeconds > 0) {
      this.updateMinutesAndSeconds(timeRemainingInSeconds);
      timeRemainingInSeconds = timeRemainingInSeconds - 1;
      this.setTimeoutId = setTimeout(this.timerCountdown.bind(this, timeRemainingInSeconds, false), 1000);
    }
  }



  compareServerTimeandComponentTimeandUpdateServer(serverSideTimeRemainingInSeconds){
    let componentTimeRemainingInSeconds = localStorage.getItem('timeRemainingInSeconds');
    if(componentTimeRemainingInSeconds && componentTimeRemainingInSeconds < serverSideTimeRemainingInSeconds) {
      let differenceInMinutes = Math.floor((serverSideTimeRemainingInSeconds - componentTimeRemainingInSeconds)/60)
      if(differenceInMinutes>0) {
        this.props.onEveryMinute(differenceInMinutes)
      }
      return componentTimeRemainingInSeconds;
    }
    return serverSideTimeRemainingInSeconds;
  }

  componentDidUpdate(nextProps) {
    if(this.props.timeRemainingInSeconds !== nextProps.timeRemainingInSeconds){
      let timeRemainingInSeconds = this.compareServerTimeandComponentTimeandUpdateServer(nextProps.timeRemainingInSeconds);
      this.timerCountdown(timeRemainingInSeconds, true);
    }
  }

  componentDidMount() {
    this.timerCountdown(this.props.timeRemainingInSeconds, false)
  }

  componentWillUnmount(){
    clearTimeout(this.setTimeoutId);
  }




  
  render() {
    return (
      <div>
        {this.state.minutes>9?
        this.state.minutes: '0' + this.state.minutes}:
        {this.state.seconds>9?
        this.state.seconds: '0' + this.state.seconds}
      </div>
    )
  }
}

export default Countdown;