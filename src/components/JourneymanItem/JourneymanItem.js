import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import Grid from '@material-ui/core/Grid';

const styles = {
    card: {
        width: 300,
        float: 'center',
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

const mapStateToProps = reduxState => ({
    entries: reduxState.entries,
})

class JourneymanItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showImg: true,
        };
    }

    render() {
        const { classes } = this.props;

        let imgOutline = '/images/champion-belt.png'
        let imgColor = '/images/champion-belt-color.png'

        let displayImg;
        let displayDate;

        if (this.props.entries.allEntries.length >= 5) {
            displayImg = imgColor;
            let achievedDate = this.props.entries.allEntries[4].date_posted;
            displayDate = moment(achievedDate).format("MMM Do, YYYY");
        } else {
            displayImg = imgOutline;
        }

        return (
            <div>
                <Grid item xs={12}>
                    <Card className={classes.card}>
                        <CardContent>
                            <Typography className={classes.title} color="textSecondary">
                            {displayDate}
          </Typography>
                            <Typography variant="headline" component="h2">
                                Journeyman (5 Days) <span><img src={displayImg}/></span>
          </Typography>

                        </CardContent>
                    </Card>
                </Grid>
            </div>
        );
    }
}

JourneymanItem.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(JourneymanItem));