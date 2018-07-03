import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Grid from '@material-ui/core/Grid';


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
            <Grid container alignItems={'center'} justify={'center'} spacing={40}>
                <Paper className={classes.paper}>
                    <Grid item>
                        <h2 className={classes.header}>It's time to take back your life.</h2>
                    </Grid>
                    <form onSubmit={props.registerUser} className={classes.container}>
                        <Grid item xs={12}>
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
                        </Grid>
                        <Grid item xs={12}>
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
                        </Grid>
                        <div>
                            <Grid item xs={12}>
                                <FormControl>
                                    <Button variant="raised" size="small" color="primary" type="submit" value="register" className={classes.button}>
                                        SIGN UP
                                </Button>
                                </FormControl>
                                <Link to="/login">CANCEL</Link>
                            </Grid>
                        </div>
                    </form>
                </Paper>
            </Grid>
        </div>
    );
}


RegisterForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RegisterForm);