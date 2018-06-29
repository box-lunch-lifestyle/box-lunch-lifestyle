import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Edit from '@material-ui/icons/Edit';
import Grid from '@material-ui/core/Grid';

class JournalPage extends Component {

  handleClick = (pageLink) => () => {
    this.props.history.push(pageLink);
  }

  render() {
    return (
      <div>
        <Grid container alignItems={'center'} justify={'center'} direction={'column'} spacing={16}>
          <Grid item>
            <h3>NOTES TO SELF</h3>
          </Grid>
          <Grid item>
            {/* toggle view. if blank: */}
            <p>Complete a round to make an entry.</p>
          </Grid>
          {/* <br /> */}
          <Grid item>
            <Button variant="contained" color="primary">ADD</Button>
            {/* ADD BUTTON brings up text modal */}
          </Grid>
        </Grid>
        {/* <br /> */}
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
        {/* <br /> */}
        <Grid container alignItems={'center'} justify={'center'} direction={'column'} spacing={16}>
          <Grid item>
            <Button variant="contained" color="primary" onClick={this.handleClick('/home')}>HOME</Button>
          </Grid>
        </Grid>
        {/* toggle view. if there are notes: */}
        <Grid container alignItems={'stretch'} justify={'center'} direction={'column'} spacing={16}>
          <Grid item>
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
                <Button><Edit className="editButton" /></Button>
              </Typography>
            </Paper>
          </Grid>
        </Grid>
        <Grid container alignItems={'center'} justify={'center'} direction={'column'} spacing={16}>
          <Grid item>
            <Button variant="contained" color="primary">ADD</Button>
          </Grid>
          {/* <br /> */}
          <Grid item>
            <Button variant="contained" color="primary" onClick={this.handleClick('/home')}>HOME</Button>
          </Grid>
        </Grid>
      </div >
    )
  }
}

export default JournalPage;