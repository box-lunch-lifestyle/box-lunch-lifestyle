import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';


const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',

    },
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing.unit * 5,
        textAlign: 'center',
        color: theme.palette.text.secondary,
        margin: 40,

    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
        marginBottom: theme.spacing.unit,
    },
    button: {
        marginTop: theme.spacing.unit,
    },
    header: {
        textAlign: 'center',

    }
});


function RegisterForm(props) {

    const { classes } = props;

    return (
        <div className={classes.root}>
                <Paper className={classes.paper}>
                        <h3 className={classes.header}>Join The Club!</h3>
                    <form onSubmit={props.registerUser} className={classes.container}>
                            <FormControl>
                                <InputLabel htmlFor="username">
                                    Username:</InputLabel>
                                <Input
                                    id="username"
                                    className={classes.textField}
                                    value={props.state.username}
                                    onChange={props.handleInputChangeFor('username')}
                                />
                            </FormControl>
                            <FormControl>
                                <InputLabel htmlFor="password">
                                    Password:</InputLabel>
                                <Input
                                    className={classes.textField}
                                    type="password"
                                    name="password"
                                    value={props.state.password}
                                    onChange={props.handleInputChangeFor('password')}
                                />
                            </FormControl>
                        <div>
                            <FormControl>
                                <Button variant="raised" size="small" color="primary" type="submit" value="register" className={classes.button}>
                                    Register
                                </Button>
                            </FormControl>
                        </div>
                        
                            <div>
                                <p></p>
                                <Link to="/home">Cancel</Link>
                            </div>     
                    </form>
                </Paper>
        </div>
    );
}


RegisterForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RegisterForm);