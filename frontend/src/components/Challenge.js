import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const Challenge = (props) => {
    return (
        <Grid container justify="center" alignItems="center">
            <Grid item xs={12}>
                <Typography variant="subtitle1">
                Challenge is coming out soon.
                </Typography>
            </Grid>
        </Grid>
    )
}

export default Challenge;