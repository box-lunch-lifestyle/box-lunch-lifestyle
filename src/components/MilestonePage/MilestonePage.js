import React, {Component} from 'react';
import {connect} from 'react-redux';
import {USER_ACTIONS} from '../../redux/actions/userActions';
import Button from '@material-ui/core/Button';
import MilestoneItem from '../MilestoneItem/MilestoneItem';

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
        <h2> Box Lunch Lifestyle Logo Goes Here </h2> 
        <h3> Milestones </h3> 
        <h5> You have [X] lunches under your belt </h5>
        <div>
        <MilestoneItem />
        </div>
        <div>
        <p>Milestone Options</p>
        <ul>
          <li>Flyweight (5 lunches)</li>
          <li>Bantamweight (15 lunches)</li>
          <li>Welterweight (25 lunches)</li>
          <li>Middleweight (50 lunches)</li>
          <li>Heavyweight (250 lunches)</li>
        </ul>
        </div>

        <Button variant="contained" color="primary" onClick={this.handleHomeClick}> Home </Button> 
        </div>
      );
    }

    return (
      <div> 
      { content } 
      </div>
    );
  }
}

export default connect(mapStateToProps)(MilestonePage);