import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { CSSTransitionGroup } from 'react-transition-group'



const styles = theme => ({
  motto: {
    fontFamily: 'typeka',
    fontSize: 30,
  }
});

class LoadingPage extends Component {
  constructor(props) {
    super(props);

    this.state = ({
      lunchAppear: false,
      lifeAppear: false,
    })
  };

  componentDidMount = () => {
    this.loadingAnimations(0);
  }

  loadingAnimations = (timeElapsed) => {
    if (timeElapsed === 10) {
      this.props.history.push('/home');
    } else if (timeElapsed === 6) {
      this.setState({
        lifeAppear: true,
      })
    } else if (timeElapsed === 3) {
      this.setState({
        lunchAppear: true,
      })
    }
    this.setTimeoutId = setTimeout(this.loadingAnimations.bind(this, timeElapsed + 1), 500);
  }

  render() {
    const { classes } = this.props;

    let lunchTransition, lifeTransition;
    if (this.state.lunchAppear) {
      lunchTransition = <CSSTransitionGroup className={classes.motto}
        transitionName="lunch"
        transitionAppear={true}
        transitionAppearTimeout={2000}
        transitionEnter={false}
        transitionLeave={false}>
        <p>Better lunch.</p>
      </CSSTransitionGroup>
    }
    if (this.state.lifeAppear) {
      lifeTransition = <CSSTransitionGroup className={classes.motto}
        transitionName="life"
        transitionAppear={true}
        transitionAppearTimeout={2000}
        transitionEnter={false}
        transitionLeave={false}>
        <p>Better life.</p>
      </CSSTransitionGroup>
    }

    return (
      <div className={classes.motto}>
        <div className='headerAnimation'>
          <img src='images/logo.jpg' width='100%' margin='20px' />
        </div>
        <Grid container spacing={8} alignItems={'center'} justify={'center'} direction={'column'}>
          <Grid item>
            {lunchTransition}
          </Grid>
          <Grid item>
            {lifeTransition}
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles)(LoadingPage);