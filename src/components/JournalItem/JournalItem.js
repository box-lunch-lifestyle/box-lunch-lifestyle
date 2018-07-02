
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Edit from '@material-ui/icons/Edit';
import Grid from '@material-ui/core/Grid';
import moment from 'moment';
import { connect } from 'react-redux';


class JournalItem extends Component {
    constructor(props){
        super(props);
        this.state = {
            updatedComment: {
              date_posted: this.props.comment.date_posted,
              comment: '',
            }
        }
    }

    handleChange = propertyName => event => {
        this.setState({
          updatedComment: {
            ...this.state.updatedComment,
            [propertyName]: event.target.value,
          }
        });
    }

    handleEditComment = event => {
        this.props.dispatch({
          type: 'FETCH_PUT_COMMENT',
          payload: this.state.updatedComment,
          id: this.props.comment.id,
        })
      }

    render() {
        const date = moment(this.props.comment.date_posted).format("MMMM Do YYYY");
        return (

            <Grid container alignItems={'stretch'} justify={'center'} direction={'column'} spacing={16}>
                <Grid item>
                    <Paper>
                        <Typography variant="headline" component="h3">
                            <div className="entryDate">{date}</div>
                        </Typography>
                        <Typography component="p">
                            <TextField
                                id="textarea"
                                label={this.props.comment.comment}
                                onChange={this.handleChange('comment')}
                                margin="normal"
                            />
                            <Button ><Edit onClick={() => this.handleEditComment()} className="editButton" /></Button>
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        )
    }
}

export default connect()(JournalItem);