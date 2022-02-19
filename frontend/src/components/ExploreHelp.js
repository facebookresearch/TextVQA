// Copyright (c) Facebook, Inc. and its affiliates.
import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Link from '@material-ui/core/Link';
import { withStyles } from '@material-ui/core';
import withMobileDialog from '@material-ui/core/withMobileDialog';

const styles = (theme) => ({
    ulList: {
        margin: '0',
        '& li': {
            padding: '0.25em'
        }
    }
});

const ExploreHelp = (props) => {
    const { fullScreen } = props;
    const openImagesUrl = "https://storage.googleapis.com/openimages/web/download.html";

    return (
        <div>
            <Dialog
                fullScreen={fullScreen}
                open={props.open}
                onClose={props.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Using Explore page</DialogTitle>
                <DialogContent id="alert-dialog-description">
                    <ul className={props.classes.ulList}>
                        <li>Bounding boxes show the OCR tokens extracted using the Rosetta OCR system.</li>
                        <li>You can click on an example to see a more detailed view for it.</li>
                        <li>OCR boxes on some images might be misaligned as they are rotated in OpenImages.</li>
                        <li>Some images might not be available on Flickr (404) but should be available
                            through <Link href={openImagesUrl}>OpenImages</Link>.</li>
                        <li>The text-fields and dropdowns can be mixed to get results that satisfy each of them.
                            You can use this functionality to do an "AND" over multiple fields.
                        </li>
                        <li>Use the <b>'Search in the questions'</b> field to search for a phrase in the questions.
                        Press <b>'Enter'</b> to get new search results.</li>
                        <li>
                            Use the <b>'Choose set'</b> dropdown to select the set/s (train and/or val)
                            over which you want to limit your search.
                        </li>
                        <li>
                            Use the <b>'Choose classes'</b> dropdown to select one or multiple classes
                            over which you want to limit your search.
                        </li>
                        <li>
                            Select the checkboxes in <b>'Options'</b> to change settings of your search: (i) Exclude OCR boxes
                            (ii) Show questions (iii) Show answers.
                        </li>
                        <li>
                            Use the <b>'Search for OCR tokens'</b> field to limit your search to particular OCR tokens.
                            This field will also provide auto-complete suggestions.
                        </li>
                        <li>
                            Similar to the <b>'Search for OCR tokens'</b> field,
                            use the <b>'Search for Answers'</b> field to limit your search
                            to particular answers. This field will also provide auto-complete suggestions.
                        </li>
                    </ul>
                    <br/><br/>
                    Reach us out at <Link href="mailto:textvqa@fb.com">textvqa@fb.com</Link> for any questions, suggestions and feedback.

                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleClose} color="primary" autoFocus>
                        Got it!
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default withMobileDialog()(withStyles(styles)(ExploreHelp));