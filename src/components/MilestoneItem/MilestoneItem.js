import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import Grid from '@material-ui/core/Grid';
import Countdown from '../Countdown/Countdown';


const styles = {
    card: {
        width: 300,
        float: 'left',
        margin: '10px',
        padding: '5px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',


    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
        width: 200,
        display: 'flex',
    },

    contentHeader: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
};

function MilestoneItem(props) {
    const { classes } = props;
    return (
        <div>
            <Grid item xs={12}>
            <Card className={classes.card}>
                <CardContent>
                <Typography className={classes.title} color="textSecondary">
                June 30th 2018
          </Typography>
          <Typography variant="headline" component="h2">
           Flyweight (5 Days)
          </Typography>
                </CardContent>
            </Card>
            </Grid>
            <Countdown timeRemainingInSeconds={900} onEveryMinute={()=>{}} onCompletion={() => {}} />
        </div>
    );
}

MilestoneItem.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MilestoneItem);