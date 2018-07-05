
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Edit from '@material-ui/icons/Edit';
import moment from 'moment';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import swal from 'sweetalert2';

const styles = theme => ({
    root: {
      ...theme.mixins.gutters(),
      paddingTop: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit * 2,
      margin: '15px',
      borderWidth: '1px',
      boxShadow: 'none',
      borderStyle: 'solid',
    },
    EditIcon: {
        marginRight: theme.spacing.unit,
        position: 'absolute',
        right: '50px',
    },
    TrashIcon: {
        marginRight: theme.spacing.unit,
        position: 'absolute',
        right: '5px',
    },
    headline: {
        color: '#808080',
    },
  });


class JournalItem extends Component {
    constructor(props){
        super(props);
        this.state = {
            open: false,
            updatedComment: {
              date_posted: this.props.comment.date_posted,
              comment: this.props.comment.comment,
            }
        }
    }

    handleClickOpen = () => {
        this.setState({ open: true });
      };
    
    handleClose = () => {
        this.setState({ open: false });
    };

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
        });
        this.handleClose();
    }

    handleDeleteComment = (comment) => {
        console.log(comment);
        this.props.dispatch({
            type: 'FETCH_DELETE_COMMENT',
            payload: comment,
        });
    }

    deleteClick = (comment) => {
    swal({
        title: 'Are you sure?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#c82027',
        cancelButtonColor: '#5f5f5f',
        confirmButtonText: 'Delete'
      }).then((result) => {
        if (result.value) {
        this.handleDeleteComment(comment);
          swal(
            'Deleted!',
            'Your note has been deleted.',
            'success'
          )
        }
    });
    };

    render() {
        const {classes} = this.props;
        const date = moment(this.props.comment.date_posted).format("MMMM Do YYYY");
        return (
                <div>
                    <Paper className={classes.root}>
                        <Typography variant="headline" className={classes.headline}>
                            {date}
                        </Typography>
                        <Typography variant="subheading">
                            {this.props.comment.comment}
                            <IconButton className={classes.EditIcon} aria-label="Edit">
                            <Edit onClick={this.handleClickOpen}  />
                            </IconButton>
                            <IconButton className={classes.TrashIcon} aria-label="Delete">
                            <DeleteIcon onClick={() => this.deleteClick(this.props.comment)}/>
                            </IconButton>
                        </Typography>
                    </Paper>

                {/* This is where the dialog box starts */}
                <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="edit"
                >
                <DialogContent>
                <DialogContentText>
                To change your Note, click Save
                </DialogContentText>
                <TextField
                autoFocus
                margin="dense"
                id="comment"
                onChange={this.handleChange('comment')}
                value={this.state.updatedComment.comment}
                type="text"
                fullWidth
                />
                </DialogContent>
                <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                Cancel
                </Button>
                <Button onClick={() => this.handleEditComment()} color="primary">
                Save
                </Button>
                </DialogActions>
                </Dialog>
        </div>
        )
    }
}

JournalItem.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect()(withStyles(styles)(JournalItem));