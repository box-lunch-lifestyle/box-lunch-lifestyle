import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Edit from '@material-ui/icons/Edit';
import Grid from '@material-ui/core/Grid';
import JournalItem from '../JournalItem/JournalItem';
import swal from 'sweetalert2'

const mapStateToProps = state => ({
});

class JournalPage extends Component {
  constructor(props) {
    super(props)
    this.addNote = this.addNote.bind(this);
    };

  handleClick = (pageLink) => () => {
    this.props.history.push(pageLink);
  }

  async addNote () {
    const {value: text} = await swal({
      input: 'textarea',
      inputPlaceholder: 'What should your future self know about today?',
      showCancelButton: true
    })
    if (text) {
      // swal(text)
      const action = { type: 'FETCH_POST_COMMENT', payload: {comment: text }}
      this.props.dispatch(action);
      console.log(text);
    }
  }

  render() {
    return (
      <div>
        <Grid container alignItems={'center'} justify={'center'} direction={'column'} spacing={16}>
          <Grid item>
            <h1>NOTES TO SELF</h1>
          </Grid>
          {/* <Grid item> */}
            {/* toggle view. if blank: */}
            {/* <p>Complete a round to make an entry.</p> */}
          {/* </Grid>
          <Grid item>
            <Button variant="contained" color="primary">ADD</Button> */}
            {/* ADD BUTTON brings up text modal */}
          {/* </Grid> */}
        </Grid>
        <Grid container alignItems={'stretch'} justify={'center'} direction={'column'} spacing={16}>
          <Grid item>
            <TextField
              id="textarea"
              label="What should your future self know about today?"
              fullWidth
              margin="normal"
            />
          </Grid>
        </Grid>
        <Grid container alignItems={'center'} justify={'center'} direction={'column'} spacing={16}>
          {/* <Grid item>
            <Button variant="contained" color="primary" onClick={this.handleClick('/home')}>HOME</Button>
          </Grid> */}
        </Grid>
        {/* toggle view. if there are notes: */}
        <JournalItem />
        <Grid container alignItems={'center'} justify={'center'} direction={'column'} spacing={16}>
          <Grid item>
            <Button variant="contained" color="primary" onClick={this.addNote}>ADD</Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" onClick={this.handleClick('/home')}>HOME</Button>
          </Grid>
        </Grid>
      </div >
    )
  }
}

export default connect(mapStateToProps)(JournalPage);