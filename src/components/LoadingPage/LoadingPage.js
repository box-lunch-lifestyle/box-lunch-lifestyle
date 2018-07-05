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
  };


  render() {
    const { classes } = this.props;
    return (
      <div className={classes.motto}>
        <Grid container spacing={12} alignItems={'center'} justify={'center'} direction={'column'}>
          <Grid item>

            <CSSTransitionGroup className={classes.motto}
              transitionName="example"
              transitionAppear={true}
              transitionAppearTimeout={1000}
              transitionEnter={false}
              transitionLeave={false}>
              <p>Better Lunch.</p>
            </CSSTransitionGroup>
          </Grid>
          <Grid item>
            <CSSTransitionGroup className={classes.motto}
              transitionName="example2"
              transitionAppear={true}
              transitionAppearTimeout={2000}
              transitionEnter={false}
              transitionLeave={false}>
              <p>Better Life.</p>
            </CSSTransitionGroup>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles)(LoadingPage);