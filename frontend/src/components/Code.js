// Copyright (c) Facebook, Inc. and its affiliates.
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
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
            Code is available at <Link
                    underline="none"
                    className={[props.classes.buttonLink, props.classes.buttonsSide].join(' ')}
                    href="https://github.com/facebookresearch/pythia"
                >
                https://github.com/facebookresearch/pythia
                </Link>.
                <br/>
                <br/>
                Pythia is a modular framework for multimodal (vision + language) research and can be used
                as a starter point for working on TextVQA.
            </Grid>
        </Grid>
    )
}

export default withStyles(styles)(Paper);