import React, { Component } from 'react';
import { connect } from 'react-redux';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import axios from 'axios';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import HeroItem from '../HeroItem/HeroItem';
import JourneymanItem from '../JourneymanItem/JourneymanItem';
import ContenderItem from '../ContenderItem/ContenderItem';
import VictorItem from '../VictorItem/VictorItem';
import ChampionItem from '../ChampionItem/ChampionItem';
import UndisputedChampionItem from '../UndisputedChampionItem/UndisputedChampionItem';

const mapStateToProps = state => ({
  user: state.user,
});

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.primary.contrastText,
    background: theme.palette.primary.main,
  },
  root: {
    flexGrow: 1,
    backgroundImage: `url(${"/images/background_blackboard.jpg"})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  }

});

class MilestonePage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch({
      type: USER_ACTIONS.FETCH_USER
    });
    this.props.dispatch({
      type: 'FETCH_ALL_ENTRIES'
    })
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('login');
    }
  }

  handleHomeClick = () => {
    this.props.history.push('home');
  }

  render() {
    const { classes } = this.props;
    let content = null;

    if (this.props.user.userName) {
      content = (
        <div>
          <Grid className={classes.root} container spacing={24}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <h1> MILESTONES </h1>
              </Paper>
            </Grid>
            <Grid container spacing={24}>
              <Grid item xs={12}>
                <h5> You have [X] lunches under your belt </h5>
              </Grid>
              <Grid item xs={12}>
                <HeroItem />
                <JourneymanItem />
                <ContenderItem />
                <VictorItem />
                <ChampionItem />
                <UndisputedChampionItem />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="primary" onClick={this.handleHomeClick}> Home </Button>
              </Grid>
            </Grid>
          </Grid>

        </div>
      );
    }

    return (
      <div>
        {content}
      </div>
    );
  }
}

MilestonePage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(MilestonePage));