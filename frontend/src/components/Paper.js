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
        color: theme['palette']['primary']['contrastText'],
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
                <Link
                    underline="none"
                    className={[props.classes.buttonLink, props.classes.buttonsSide].join(' ')}
                    href="https://arxiv.org/abs/1904.08920"
                >
                    <Button variant="contained" color="primary">
                        <CloudDownload className={props.classes.leftIcon} />
                        Download Paper
                    </Button>
                </Link>
                <embed
                    className={props.classes.embed}
                    src="https://arxiv.org/pdf/1904.08920"
                    type="application/pdf"
                />
            </Grid>
        </Grid>
    )
}

export default withStyles(styles)(Paper);