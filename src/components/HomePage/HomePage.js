import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';
import Header from '../Header/Header';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  button:{
    boxShadow: 'none',
    width: 175,
    height: 40,
  },
});

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
    const { classes } = this.props;
    let content = null;

    if (this.props.user.userName) {
      content = (
        <div className={classes.root}>
           <Header title="Box Lunch Lifestyle" />
          <Grid container alignItems={'center'} justify={'center'} direction={'row'} style={{ marginTop: 10 , marginBottom: 50 , marginLeft: 25}}>
            <Grid item xs={4} >
              <h2>Today is your day.</h2>
            </Grid>
            <Grid item xs={4} >
              <img src='images/head.png' alt="Hero guy" />
            </Grid>
          </Grid>
          <Grid container alignItems={'center'} justify={'center'} direction={'column'} spacing={24}>
            <Grid item xs={6} style={{ marginBottom: 25 }}>
            <Button color="primary" variant="contained" onClick={this.handleClick('/timerSelect')} className={classes.button}>TIMER</Button>
          </Grid>
          <Grid item xs={6} style={{ marginBottom: 25 }}>
            <Button color="primary" variant="contained" onClick={this.handleClick('/milestone')} className={classes.button}>MILESTONES</Button>
          </Grid>
          <Grid item xs={6} style={{ marginBottom: 25 }} >
            <Button color="primary" variant="contained" onClick={this.handleClick('/journal')} className={classes.button}>NOTES TO SELF</Button>
          </Grid>
          <Grid item xs={6} style={{ marginBottom: 25 }}>
          <Button color="secondary" variant="contained" onClick={this.logout} className={classes.button}>LOG OUT</Button>
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

HomePage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(HomePage));