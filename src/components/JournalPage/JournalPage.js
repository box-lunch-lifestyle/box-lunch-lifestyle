import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import JournalItem from '../JournalItem/JournalItem';
import swal from 'sweetalert2'
import { USER_ACTIONS } from '../../redux/actions/userActions';
import Header from '../Header/Header';
import Paper from '@material-ui/core/Paper';

const mapStateToProps = state => ({
  user: state.user,
  comments: state.comments,
});

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundImage: `url(${"../images/blackboard.jpg"})`,
  },
  button: {
    margin: theme.spacing.unit *2,
    // alignItems: 'center',
    boxShadow: 'none',
    justify: 'space-around',
  },
  titleBar: {
    padding: .5,
    textAlign: 'center',
    color: theme.palette.primary.contrastText,
    background: theme.palette.primary.main,
    marginLeft: 5,
    marginRight: 5,
  },
  buttonDiv: {
    marginTop: 10,
  }
});

class JournalPage extends Component {
  constructor(props) {
    super(props)
    this.addNote = this.addNote.bind(this);
  };

  handleClick = (pageLink) => () => {
    this.props.history.push(pageLink);
  }


  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    this.props.dispatch({ type: 'FETCH_ALL_COMMENTS' });
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('login');
    }
  }


  async addNote() {
    const { value: text } = await swal({
      input: 'textarea',
      inputPlaceholder: 'What should your future self know about today?',
      showCancelButton: true,
      confirmButtonColor: '#c82027',
      cancelButtonColor: '#5f5f5f',
    })
    if (text) {
      // swal(text)
      const action = { type: 'FETCH_POST_COMMENT', payload: { comment: text } }
      this.props.dispatch(action);
      console.log(text);
    }
  }


  render() {
    const { classes } = this.props;
    let content = null;

    if (this.props.user.userName) {
      content = (
        <div>
          <Header title="Box Lunch Lifestyle" />
          <div className={classes.root}>
          <Grid container spacing={16}>
            <Grid item xs={12}>
            <div>
              <Paper className={classes.titleBar}>
              <h2>NOTES TO SELF</h2>
              </Paper>
              </div>
            </Grid>
          </Grid>
          <Grid container alignItems={'center'} justify={'space-around'} direction={'row'} spacing={16} className={classes.buttonDiv}>
            <Grid item>
              <Button variant="contained" color="primary" onClick={this.addNote} className={classes.button}>ADD</Button>
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" onClick={this.handleClick('/home')} className={classes.button}>HOME</Button>
            </Grid>
          </Grid>
          <Grid container alignItems={'stretch'} justify={'center'} direction={'column'} spacing={16}>
            <Grid item>
              {this.props.comments.allComments.map(comment => <JournalItem key={comment.id}
                comment={comment} />
              )}
            </Grid>
          </Grid>
          </div>
        </div >
      );
    }

    return (
      <div>
        {content}
      </div >
    )
  }
}

JournalPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(JournalPage));