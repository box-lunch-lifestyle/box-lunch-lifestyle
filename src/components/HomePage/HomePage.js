import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Header from '../Header/Header';

class HomePage extends Component {
  render() {
    return (
      <div>
        <p>Get pumped up (not permanent)</p>
        <img alt="Hero guy (image coming)" />
        <br />
        <Button color="primary" variant="contained" >TIMER</Button>
        <br />
        <Button color="primary" variant="contained" >MILESTONES</Button>
        <br />
        <Button color="primary" variant="contained" >NOTES TO SELF</Button>
      </div>
    )
  }
}

export default HomePage;