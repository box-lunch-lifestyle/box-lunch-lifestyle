import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';


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
        margin: '40px',
    },
    header: {
        textAlign: 'center',

    }
});


function LoginForm(props) {

    const { classes } = props;

    return (
        <div className={classes.root}>
            <Grid container alignItems={'center'} justify={'center'} spacing={40}>

                <Paper className={classes.paper}>
                    <Grid item xs={12}>
                        <h2 className={classes.header}>PLEASE LOG IN.</h2>
                    </Grid>
                    <form onSubmit={props.login} className={classes.container}>
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
                                    id="password"
                                    className={classes.textField}
                                    type={props.state.showPassword ? 'text' : 'password'}
                                    value={props.state.password}
                                    onChange={props.handleInputChangeFor('password')}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="Toggle password visibility"
                                                onClick={props.handleClickShowPassword}
                                            >
                                                {props.state.showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>

                        </Grid>
                        <div>
                            <FormControl>
                                <Button variant="raised" size="small" color="primary" type="submit" value="Log In" className={classes.button}>
                                    LOG IN
                                </Button>

                            </FormControl>
                        </div>
                        <Grid item xs={12}>
                            <div>
                            <Button variant="raised" size="small" color="secondary" onClick={props.handleLink('/register')} >
                                    OR SIGN UP NOW!
                                </Button>
                            </div>
                        </Grid>
                    </form>
                </Paper>
            </Grid>
        </div>
    );
}
LoginForm.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(LoginForm);