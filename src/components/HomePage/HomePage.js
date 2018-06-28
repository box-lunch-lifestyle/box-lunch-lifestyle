import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

class HomePage extends Component {

  handleClick = (pageLink) => () => {
    this.props.history.push(pageLink);
  }

  render() {
    return (
      <div>
        <Grid container spacing={24}  alignItems={'center'} justify={'center'} direction={'column'} spacing={16}>
          <Grid item>
            <h2>Get pumped up.</h2>
          </Grid>
          <Grid item>
            <img src='images/heroGuy.jpg' width='90%' alt="Hero guy" />
          </Grid>
          <Grid item>
            <Button color="primary" variant="contained" onClick={this.handleClick('/timerSelect')} >TIMER</Button>
          </Grid>
          <Grid item>
            <Button color="primary" variant="contained" onClick={this.handleClick('/milestone')} >MILESTONES</Button>
          </Grid>
          <Grid item>
            <Button color="primary" variant="contained" onClick={this.handleClick('/journal')} >NOTES TO SELF</Button>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default HomePage;