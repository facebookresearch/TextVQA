import React from 'react';
import Link from '@material-ui/core/Link';

import { withStyles, Typography } from "@material-ui/core";
import * as people from '../people_list.json';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';

const styles = (theme) => ({
    avatar: {
        width: 100,
        height: 100,
        margin: '0 auto'
    },
    gridItem: {
        padding: theme.spacing.unit * 2
    }
});

const People = (props) => {
    const peopleJSX = people.people.map((person) => {
        const key = Math.random();
        return (
            <Grid item key={key} xs={12} sm={6} md={3} lg={2}>
                <Link href={person.website}>
                    <Avatar className={props.classes.avatar} src={person.img_url}/>
                </Link>
                <Typography variant="subtitle1">
                    {person.name}
                </Typography>
                <Typography variant="caption">
                    {person.organization}
                </Typography>
            </Grid>
        )
    });

    return (
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="flex-start"
            spacing={16}
        >
            {peopleJSX}
        </Grid>
    )
};


export default withStyles(styles)(People)