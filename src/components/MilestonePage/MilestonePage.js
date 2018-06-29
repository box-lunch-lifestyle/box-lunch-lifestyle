import React, { Component } from 'react';
import { connect } from 'react-redux';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import FlyWeightItem from '../FlyWeightItem/FlyWeightItem';
import BantamWeightItem from '../BantamWeightItem/BantamWeightItem';
import WelterWeightItem from '../WelterWeightItem/WelterWeightItem';
import MiddleweightItem from '../MiddleWeightItem/MiddleWeightItem';
import HeavyWeightItem from '../HeavyWeightItem/HeavyWeightItem';

const mapStateToProps = state => ({
  user: state.user,
});

class MilestonePage extends Component {

  componentDidMount() {
    this.props.dispatch({
      type: USER_ACTIONS.FETCH_USER
    });
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
    // FYI right now milestone card is set to grid system but parent component is not. therefore everything looks funny.
    let content = null;

    if (this.props.user.userName) {
      content = (
        <div>
          <Grid container alignItems={'center'} justify={'center'} direction={'column'} spacing={16}>
            <Grid item>
              <h3> Milestones </h3>
            </Grid>
            <Grid item>
              <h5> You have [X] lunches under your belt </h5>
            </Grid>
            <div>
              <Grid item>
                <FlyWeightItem />
                <BantamWeightItem />
                <WelterWeightItem />
                <MiddleweightItem />
                <HeavyWeightItem />
              </Grid>
            </div>
            <Button variant="contained" color="primary" onClick={this.handleHomeClick}> Home </Button>
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

export default connect(mapStateToProps)(MilestonePage);