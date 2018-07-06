import React, { Component } from 'react';
import { connect } from 'react-redux';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import HeroItem from '../HeroItem/HeroItem';
import JourneymanItem from '../JourneymanItem/JourneymanItem';
import ContenderItem from '../ContenderItem/ContenderItem';
import VictorItem from '../VictorItem/VictorItem';
import ChampionItem from '../ChampionItem/ChampionItem';
import UndisputedChampionItem from '../UndisputedChampionItem/UndisputedChampionItem';
import Header from '../Header/Header';

const mapStateToProps = state => ({
  user: state.user,
  entries: state.entries,
});

class MilestonePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount() {
    this.props.dispatch({
      type: USER_ACTIONS.FETCH_USER
    });
    this.props.dispatch({
      type: 'FETCH_ALL_ENTRIES'
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
    let content = null;

    if (this.props.user.userName) {
      content = (
        <div>
                <Header title="Box Lunch Lifestyle" />
          <Grid container alignItems={'center'} justify={'center'} direction={'column'} spacing={16}>
            <Grid item>
              <h1> MILESTONES </h1>
            </Grid>
            <Grid item>
              <h5> You have {this.props.entries.allEntries.length} lunches under your belt </h5>
            </Grid>
            <div>
              <Grid item>
                <HeroItem />
                <JourneymanItem />
                <ContenderItem />
                <VictorItem />
                <ChampionItem />
                <UndisputedChampionItem />
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