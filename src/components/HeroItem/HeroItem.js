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
        display: 'flex',
        width: '300px',
    },

    date: {
        display: 'flex',
        fontSize: '15px',
    },

    title: {
        display: 'flex',
        fontSize: '20px',
    },

    image: {
        display: 'flex',
        float: 'right',
        paddingLeft: '70px',

    }
};

const mapStateToProps = reduxState => ({
    entries: reduxState.entries,
})

class HeroItem extends Component {
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

        if (this.props.entries.allEntries.length >= 1) {
            displayImg = imgColor;

        } else {
            displayImg = imgOutline;
        }

        return (
            <div>
                <Grid item xs={12}>
                    <Card className={classes.card}>
                        <CardContent>
                            <Typography className={classes.date} color="textSecondary">
                                June 30th 2018
          </Typography>
                            <Typography className={classes.title} variant="headline" component="h2">
                                Hero (1 Day) <span><img src={displayImg} className={classes.image}/></span>
          </Typography>

                        </CardContent>
                    </Card>
                </Grid>
            </div>
        );
    }

}

HeroItem.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(HeroItem));