// Copyright (c) Facebook, Inc. and its affiliates.
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Divider from '@material-ui/core/Divider';
import CloudDownload from '@material-ui/icons/CloudDownload';
import { withStyles } from '@material-ui/core';
import * as dataDescription from '../data_description.json';

const styles = (theme) => ({
    title: {
        marginTop: '3em'
    },
    ulItems: {
        paddingLeft: '1.2em'
    },
    liLink: {
        borderBottom: '1px dotted #eee',
        borderBottomColor: theme.palette.primary.light,
        paddingBottom: '0.1em',
        '&:hover': {
            textDecoration: 'none',
            borderBottomColor: theme.palette.primary.main,
        }
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
    },
    downloadURLIcon: {
        verticalAlign: 'middle',
        marginTop: '-0.1em'
    }
});

const Download = (props) => {
    const trainDownloadURL = "https://dl.fbaipublicfiles.com/textvqa/data/TextVQA_0.5_train.json";
    const valDownloadURL = "https://dl.fbaipublicfiles.com/textvqa/data/TextVQA_0.5_val.json";
    const testDownloadURL = "https://dl.fbaipublicfiles.com/textvqa/data/TextVQA_0.5_test.json";
    const trainAndValImagesUrl = "https://dl.fbaipublicfiles.com/textvqa/images/train_val_images.zip"
    const testImagesUrl = "https://dl.fbaipublicfiles.com/textvqa/images/test_images.zip"
    const openImagesUrl = "https://storage.googleapis.com/openimages/web/download.html";
    const evalAIURL = "https://evalai.cloudcv.org/web/challenges/challenge-page/244/";
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
                            Training set <Link
                                href={trainDownloadURL}>
                                    <CloudDownload className={props.classes.downloadURLIcon} />
                                </Link>
                        </Typography>
                        <ul className={props.classes.ulItems}>
                            <li>
                                <Typography variant="subtitle1" align="left">
                                    <Link className={props.classes.liLink} href={trainDownloadURL}>
                                    34,602 questions
                                    </Link> (103MB)
                                </Typography>
                            </li>
                            <li>
                                <Typography variant="subtitle1" align="left">
                                    <Link className={props.classes.liLink} href={trainAndValImagesUrl}>
                                    21,953 images
                                    </Link> (6.6GB)
                                </Typography>
                            </li>
                        </ul>
                    </Grid>
                    <Grid className={props.classes.setItems} item xs={12} sm={6} md={4}>
                        <Typography variant="h5" align="left">
                            Validation set <Link
                                href={valDownloadURL}>
                                    <CloudDownload className={props.classes.downloadURLIcon} />
                                </Link>
                        </Typography>
                        <ul className={props.classes.ulItems}>
                            <li>
                                <Typography variant="subtitle1" align="left">
                                    <Link className={props.classes.liLink} href={valDownloadURL}>
                                    5,000 questions
                                    </Link> (16MB)
                                </Typography>
                            </li>
                            <li>
                                <Typography variant="subtitle1" align="left">
                                    3,166 images
                                </Typography>
                            </li>
                        </ul>
                    </Grid>
                    <Grid className={props.classes.setItems} item xs={12} sm={6} md={4}>
                        <Typography variant="h5" align="left">
                            Test set <Link
                                href={testDownloadURL}>
                                    <CloudDownload className={props.classes.downloadURLIcon} />
                                </Link>
                        </Typography>
                        <ul className={props.classes.ulItems}>
                            <li>
                                <Typography variant="subtitle1" align="left">
                                    <Link className={props.classes.liLink} href={testDownloadURL}>
                                    5,734 questions
                                    </Link> (13MB)
                                </Typography>
                            </li>
                            <li>
                                <Typography variant="subtitle1" align="left">
                                    <Link className={props.classes.liLink} href={testImagesUrl}>
                                    3,289 images
                                    </Link> (926MB)
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
                        <Typography variant="h6" align="left">Challenge</Typography>
                        <br/>
                        <Typography variant="subtitle1" align="left">
                            TextVQA Challenge 2019 is live! See more details
                            on <Link href="challenge">challenge page</Link> to participate.
                        </Typography>
                    </Grid>

                    <Grid item xs={12} md={12}>
                        <Typography variant="h6" align="left">Readme</Typography>
                        <ul className={props.classes.ulItems}>
                            <li>
                                <Typography variant="subtitle1" align="left">
                                    Images for training and validation set are from OpenImages train set
                                    while images for test set are from OpenImages test set.
                                </Typography>
                            </li>
                            <li>
                                <Typography variant="subtitle1" align="left">
                                    Validation set's images are contained in the zip for training set's images.
                                    The OpenImages dataset can be downloaded from <Link href={openImagesUrl}>here</Link>.
                                </Typography>
                            </li>
                            <li>
                                <Typography variant="subtitle1" align="left">
                                    <b>Note:</b> Some of the images in OpenImages are rotated, please make sure
                                    to check the <b>Rotation</b> field
                                    in the Image IDs files for <Link href="https://storage.googleapis.com/openimages/2018_04/train/train-images-boxable-with-rotation.csv">train
                                    </Link> and <Link href="https://storage.googleapis.com/openimages/2018_04/test/test-images-with-rotation.csv">test</Link>.
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
                                    We also provide OCR tokens
                                    extracted from <Link href="https://code.fb.com/ai-research/rosetta-understanding-text-in-images-and-videos-with-machine-learning/">Rosetta</Link> system
                                    with the dataset.
                                </Typography>
                            </li>
                            <li>
                                <Typography variant="subtitle1" align="left">
                                    <b>OCR tokens</b> provided in the dataset are the
                                    ones used in the TextVQA <Link href="paper">paper</Link>,
                                    and are nowhere near perfect.
                                    Researchers are welcome to use their own OCR systems.
                                </Typography>
                            </li>
                            <li>
                                <Typography variant="subtitle1" align="left">
                                Reach us out at <Link href="mailto:textvqa@fb.com">textvqa@fb.com</Link> for any questions, suggestions and feedback.
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