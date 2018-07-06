import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import Grid from '@material-ui/core/Grid';
import { CardMedia } from '@material-ui/core';

const styles = theme => ({
    root1: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 1,
        paddingBottom: theme.spacing.unit * 1,
        right: '15px',
        boxShadow: 'none',
    },
    image: {
        float: 'right',
    },
    title: {
        display: 'flex',
        fontSize: '18px',
    },
    date: {
        color: '#808080',
        textAlign: 'left',
        fontSize: '16px',
    },
});

const mapStateToProps = reduxState => ({
    entries: reduxState.entries,
})

class ChampionItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showImg: true,
        };
    }

    render (){
    const { classes } = this.props;

    let imgOutline = '/images/champion-belt.png'
    let imgColor = '/images/champion-belt-color.png'

    let displayImg;
    let displayDate;

    if (this.props.entries.allEntries.length >= 50){
        displayImg = imgColor;
        let achievedDate = this.props.entries.allEntries[49].date_posted;
        displayDate = moment(achievedDate).format("MMM Do, YYYY");
    } else {
        displayImg = imgOutline;
    }



    return (
        <div>
        <Grid className={classes.root1} item xs={12}>
            <Card >
                <CardContent>
                    <Typography className={classes.date} color="textSecondary">
                    {displayDate}
                    </Typography>
                    <Typography className={classes.title} variant="headline" component="h2">
                        Champion (50 Days)
                    </Typography>
                    <CardMedia className={classes.image}>
                        <img src={displayImg} />
                    </CardMedia>
                </CardContent>
            </Card>
        </Grid>
    </div>
    );
}
}


ChampionItem.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(ChampionItem));