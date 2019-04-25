// Copyright (c) Facebook, Inc. and its affiliates.
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import CloudDownload from '@material-ui/icons/CloudDownload';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core';

const styles = (theme) => ({
    embed: {
        marginTop: '4em',
        width: '100%',
        height: '90vh'
    },
    buttonLink: {
        color: theme['palette']['primary']['primaryText'],
        textDecoration: 'none'
    },
    buttonsSide: {
        textAlign: 'right'
    },

    leftIcon: {
        marginRight: theme.spacing.unit
    }
});

const Paper = (props) => {
    return (
        <Grid container justify="center" alignItems="center">
            <Grid
                item
                xs={12}
                md={10}
                lg={8}
                style={{
                    marginTop: '4em'
                }}
            >
            Code will be available on <Link
                    underline="none"
                    className={[props.classes.buttonLink, props.classes.buttonsSide].join(' ')}
                    href="https://github.com/facebookresearch/pythia"
                >
                https://github.com/facebookresearch/pythia
                </Link>. An announcement will be made in News section and mailing list.
            </Grid>
        </Grid>
    )
}

export default withStyles(styles)(Paper);