import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core';

const styles = (theme) => ({
    ulList: {
        margin: '0'
    }
});

const ExploreHelp = (props) => {
    return (
        <div>
            <Dialog
                open={props.open}
                onClose={props.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Using Explore page</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <ul className={props.classes.ulList}>
                            <li>Use <b>'Search for questions'</b> field to search for particular text in questions</li>
                            <li>
                                Use <b>'Choose set'</b> dropdown to select the set/s (train and/or val)
                                over which you want to limit your search.
                            </li>
                            <li>
                                Use <b>'Choose classes'</b> dropdown to select one or multiple classes
                                over which you want to limit your search.
                            </li>
                            <li>
                                Select checkboxes in <b>'Options'</b> to change settings of your search: (i) Exclude OCR boxes
                                (ii) Show questions (iii) Show answers.
                            </li>
                            <li>
                                Use <b>'Search for OCR tokens'</b> field to limit your search to particular OCR tokens.
                                This field will provide auto-complete suggestion for OCR tokens.
                            </li>
                            <li>
                                Use <b>'Search for Answers'</b> field to get
                                functionality similar to <b>'Search for OCR tokens'</b>
                                but for answers.
                            </li>
                        </ul>
                    </DialogContentText>
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

export default withStyles(styles)(ExploreHelp);