import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

class HomePage extends Component {
  render() {
    return (
      <div>
        <img alt="Hero guy" />
        <br />
        <Button color="primary" variant="contained" >TIMER</Button>
        <br />
        <Button color="primary" variant="contained" >MILESTONES</Button>
        <br />
        <Button color="primary" variant="contained" >JOURNAL</Button>
      </div>
    )
  }
}

export default HomePage;