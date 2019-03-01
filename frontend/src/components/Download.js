import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core';
import * as dataDescription from '../data_description.json';

const styles = (theme) => ({
    title: {
        marginTop: '3em'
    },
    ulItems: {
        paddingLeft: '1.2em'
    },
    preParent: {
        backgroundColor: '#eee',
        border: '1px solid #ddd',
        borderRadius: '2px',
        '& pre': {
            whiteSpace: 'pre-wrap',
        },
        '& span': {
            padding: '1em',
        },
        '& code': {
            fontSize: '12px',
            color: '#000'
        }
    }
});

const Download = (props) => {
    const trainDownloadURL = "https://dl.fbaipublicfiles.com/textvqa/data/TextVQA_0.5_train.json";
    const valDownloadURL = "https://dl.fbaipublicfiles.com/textvqa/data/TextVQA_0.5_val.json";
    const testDownloadURL = "https://dl.fbaipublicfiles.com/textvqa/data/TextVQA_0.5_test.json";
    const openImagesUrl = "https://storage.googleapis.com/openimages/web/download.html";
    const evalAIURL = "";
    const licenseURL = "https://creativecommons.org/licenses/by/4.0/";
    return (
        <Grid
            container
            justify="center"
            alignItems="center"
        >
            <Grid
                item
                xs={10}
                md={8}
                lg={7}
            >
                <Grid
                    container
                    justify="flex-start"
                    alignItems="center"
                    spacing={16}
                >
                    <Grid item className={props.classes.title} xs={12}>
                        <Typography variant="h3" align="left">
                            TextVQA dataset
                    </Typography>
                    </Grid>
                    <br />
                    <Grid item className={props.classes.versionNumber} xs={12}>
                        <Typography variant="h4" align="left">
                            v0.5
                    </Typography>
                    </Grid>

                    <Grid className={props.classes.setItems} item xs={12} sm={6} md={4}>
                        <Typography variant="h5" align="left">
                            <Link href={trainDownloadURL}>
                                Training set
                        </Link>
                        </Typography>
                        <ul className={props.classes.ulItems}>
                            <li>
                                <Typography variant="subtitle1" align="left">
                                    34602 questions
                            </Typography>
                            </li>
                            <li>
                                <Typography variant="subtitle1" align="left">
                                    10.47 average extracted OCR tokens
                            </Typography>
                            </li>
                        </ul>
                    </Grid>
                    <Grid className={props.classes.setItems} item xs={12} sm={6} md={4}>
                        <Typography variant="h5" align="left">
                            <Link href={valDownloadURL}>
                                Validation set
                        </Link>
                        </Typography>
                        <ul className={props.classes.ulItems}>
                            <li>
                                <Typography variant="subtitle1" align="left">
                                    5000 questions
                            </Typography>
                            </li>
                            <li>
                                <Typography variant="subtitle1" align="left">
                                    10.72 average extracted OCR tokens
                            </Typography>
                            </li>
                        </ul>
                    </Grid>
                    <Grid className={props.classes.setItems} item xs={12} sm={6} md={4}>
                        <Typography variant="h5" align="left">
                            <Link href={testDownloadURL}>
                                Testing set
                        </Link>
                        </Typography>
                        <ul className={props.classes.ulItems}>
                            <li>
                                <Typography variant="subtitle1" align="left">
                                    5734 questions
                                </Typography>
                            </li>
                            <li>
                                <Typography variant="subtitle1" align="left">
                                    7.74 average extracted OCR tokens
                                </Typography>
                            </li>
                        </ul>
                    </Grid>
                    <Grid item xs={12}>
                        <br />
                        <Divider />
                        <br />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Typography variant="h6" align="left">Readme</Typography>
                        <ul className={props.classes.ulItems}>
                            <li>
                                <Typography variant="subtitle1" align="left">
                                    Images for training and validation set are from OpenImages
                                    which can be downloaded from <Link href={openImagesUrl}>here</Link>.
                                </Typography>
                            </li>
                            <li>
                                <Typography variant="subtitle1" align="left">
                                    Data is available under <Link href={licenseURL}>CC BY 4.0</Link> license.
                                </Typography>
                            </li>
                            <li>
                                <Typography variant="subtitle1" align="left">
                                TextVQA evaluation server for testing and validation set is hosted
                                on <Link href={evalAIURL}>EvalAI</Link>.
                                </Typography>
                            </li>
                            <li>
                                <Typography variant="subtitle1" align="left">
                                Numbers in the papers should be reported on v0.5 testing set (test-std).
                                </Typography>
                            </li>
                            <li>
                                <Typography variant="subtitle1" align="left">
                                OCR tokens provided in the dataset are the ones used in TextVQA's paper.
                                We cannot guarantee that these tokens will be correct.
                                </Typography>
                            </li>
                        </ul>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Typography variant="h6" align="left">Description</Typography>
                        <br/>
                        <Typography component="span" align="left" className={props.classes.preParent}>
                            <Typography component="pre">
                                <Typography component="span" variant="body1">
                                    <code>
                                        {JSON.stringify(dataDescription['default'], null, 2)}
                                    </code>
                                </Typography>
                            </Typography>
                        </Typography>

                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Typography variant="h6" align="left">License</Typography>
                        <br/>
                        <Typography variant="subtitle1" align="left">
                            <Link href={licenseURL}>CC BY 4.0</Link>
                        </Typography>
                    </Grid>
                </Grid>
                <br/>
                <Divider/>
                <br/>
            </Grid>
        </Grid>

    )
}

export default withStyles(styles)(Download);