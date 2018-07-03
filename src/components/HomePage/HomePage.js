import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';


const mapStateToProps = state => ({
  user: state.user,
});

class HomePage extends Component {

  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('login');
    }
  }

  handleClick = (pageLink) => () => {
    this.props.history.push(pageLink);
  }

  logout = () => {
    this.props.dispatch(triggerLogout());
    this.props.history.push('login');
  }

  render() {
    let content = null;

    if (this.props.user.userName) {
      content = (
        <div className="attractive">
          <Grid container alignItems={'center'} justify={'center'} direction={'row'} spacing={0} style={{ marginTop: 20 , marginBottom: 70 }}>
            <Grid item xs={4} style={{ marginLeft: 80 }}>
              <h2>Today is your day.</h2>
            </Grid>
            <Grid item >
              <img src='images/head.png' width={'60%'} alt="Hero guy" />
            </Grid>
          </Grid>
          <Grid container alignItems={'center'} justify={'center'} direction={'column'} spacing={24}>
            <Grid item>
              <Button color="primary" variant="contained" onClick={this.handleClick('/timerSelect')} >TIMER</Button>
            </Grid>
            <Grid item>
              <Button className="attractive" color="primary" variant="contained" onClick={this.handleClick('/milestone')} >MILESTONES</Button>
            </Grid>
            <Grid item>
              <Button color="primary" variant="contained" onClick={this.handleClick('/journal')} >NOTES TO SELF</Button>
            </Grid>
            <Grid item>
              <Button color="secondary" variant="contained" onClick={this.logout}>LOG OUT</Button>
            </Grid>
          </Grid>
        </div>
      );
    }

    return (
      <div>
        {content}
      </div>
    )
  }
}

export default connect(mapStateToProps)(HomePage);