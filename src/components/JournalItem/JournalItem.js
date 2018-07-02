
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Edit from '@material-ui/icons/Edit';
import Grid from '@material-ui/core/Grid';

class JournalItem extends Component {

    handleClick = (pageLink) => () => {
        this.props.history.push(pageLink);
    }

    render() {
        return (

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
        )
    }
}

export default JournalItem;