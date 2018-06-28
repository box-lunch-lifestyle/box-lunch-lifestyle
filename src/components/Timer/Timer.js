import React, { Component } from 'react';
import sweetAlert from 'sweetalert';
import Button from '@material-ui/core/Button';


class TimerPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentModal: 'food',
      currentRound: '',
    }
  }

  render() {

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


    return (
      <div>
        {messageBar}
        <div>
          {/* Timer will go in this div. */}
          <p>TIMER WILL GO HERE</p>
        </div>
        <Button variant="fab" color="primary">||</Button>
        <Button variant="fab" color="secondary">X</Button>
      </div>
    )
  }
}

export default TimerPage;