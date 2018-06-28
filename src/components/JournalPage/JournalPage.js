import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Edit from '@material-ui/icons/Edit';

class JournalPage extends Component {
  render() {
    return (
      <div><h3>NOTES TO SELF</h3>
        {/* toggle view. if blank: */}
        <p>Complete a round to make an entry.</p>
        <br/>
        <Button variant="contained" color="secondary">ADD</Button>
        {/* ADD BUTTON brings up text modal */}
        <br />
        <TextField
          id="textarea"
          label="What should your future self know about today?"
          fullWidth
          margin="normal"
        />
        <br />
        <Button variant="contained" color="secondary">HOME</Button>

        {/* toggle view. if there are notes: */}

        <Paper>
        <Typography variant="headline" component="h3">
          <div className="entryDate">june 27th</div>
        </Typography>
        <Typography component="p">
        <TextField
          id="textarea"
          label="i wrote 3 haikus. edit icon will be on the right"
          fullWidth
          margin="normal"
        />
        <Button><Edit className="editButton"/></Button>
        </Typography>
        </Paper>
        <Button variant="contained" color="secondary">ADD</Button>
        <br/>
        <Button variant="contained" color="secondary">HOME</Button>
      </div>
    )
  }
}

export default JournalPage;