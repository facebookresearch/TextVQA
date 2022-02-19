// Copyright (c) Facebook, Inc. and its affiliates.
import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { withStyles } from '@material-ui/core';
import Cancel from '@material-ui/icons/Cancel';

import withMobileDialog from '@material-ui/core/withMobileDialog';

import BoundingBox from './BoundingBox';

const styles = (theme) => ({
    cardContent: {
        paddingBottom: '4px !important'
    },
    card: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center'
    },
    flickrUrls: {
        [theme.breakpoints.down('md')]: {
            fontSize: '0.68em'
        }
    }
});

const SampleDialog = (props) => {
    if (!props.result) {
        return ''
    }

    return (
        <div>
            <Dialog
                open={props.open}
                fullWidth={true}
                maxWidth="lg"
                onClose={props.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >

                <DialogActions>
                    <Typography className={props.classes.flickrUrls} variant="caption" align="left">
                        {props.result.flickr_300k_url.length ?
                            <Link target="_blank" href={props.result.flickr_300k_url}>Flickr Thumbnail</Link> :
                            ''}
                        {props.result.flickr_original_url.length ?
                            <span> | <Link target="_blank" href={props.result.flickr_original_url}>Original</Link>
                            </span> :
                            ''}
                    </Typography>
                    <Button
                        size="small"
                        onClick={props.handleClose}
                        aria-label="Close"
                        color="primary"
                        autoFocus
                    >
                        <Cancel />
                    </Button>
                </DialogActions>
                <DialogContent id="alert-dialog-description">
                    <BoundingBox
                        showBoxes={props.showOCRBoxes}
                        isDialog={true}
                        imageUrl={props.result.flickr_original_url}
                        boxes={props.boxes}
                        rotation={props.result.rotation}
                    />
                </DialogContent>
                <DialogTitle id="alert-dialog-title">
                    <Typography variant="subtitle1" align="center">
                        {props.result.question}
                    </Typography>
                    {
                        props.maxAnswer.length > 0 ?
                            <Typography variant="caption" align="center">
                                {props.maxAnswer}
                            </Typography> : ''
                    }

                </DialogTitle>

            </Dialog>
        </div>
    );
}

export default withMobileDialog()(withStyles(styles)(SampleDialog));