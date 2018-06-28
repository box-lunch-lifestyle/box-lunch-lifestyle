import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Header from '../Header/Header';

class HomePage extends Component {

  handleClick = (pageLink) => () => {
    this.props.history.push(pageLink);
  }

  render() {
    return (
      <div>
        <p>Get pumped up (not permanent)</p>
        <img alt="Hero guy (image coming)" />
        <br />
        <Button color="primary" variant="contained" onClick={this.handleClick('/timer')} >TIMER</Button>
        <br />
        <Button color="primary" variant="contained" onClick={this.handleClick('/milestone')} >MILESTONES</Button>
        <br />
        <Button color="primary" variant="contained" onClick={this.handleClick('/journal')} >NOTES TO SELF</Button>
      </div>
    )
  }
}

export default HomePage;