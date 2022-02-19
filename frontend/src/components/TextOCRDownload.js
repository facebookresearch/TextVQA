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

const TextOCRDownload = (props) => {
    const trainDownloadURL = "https://dl.fbaipublicfiles.com/textvqa/data/textocr/TextOCR_0.1_train.json";
    const valDownloadURL = "https://dl.fbaipublicfiles.com/textvqa/data/textocr/TextOCR_0.1_val.json";
    const testDownloadURL = "https://dl.fbaipublicfiles.com/textvqa/data/textocr/TextOCR_0.1_test.json";
    const trainAndValImagesUrl = "https://dl.fbaipublicfiles.com/textvqa/images/train_val_images.zip"
    const testImagesUrl = "https://dl.fbaipublicfiles.com/textvqa/images/test_images.zip"
    const openImagesUrl = "https://storage.googleapis.com/openimages/web/download.html";
    // const evalAIURL = "https://evalai.cloudcv.org/web/challenges/challenge-page/573/";
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
                            TextOCR dataset
                        </Typography>
                    </Grid>
                    <br />
                    <Grid item className={props.classes.versionNumber} xs={12}>
                        <Typography variant="h4" align="left">
                            v0.1
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
                                        714,770 word annotations
                                    </Link> (272MB)
                                </Typography>
                            </li>
                            <li>
                                <Typography variant="subtitle1" align="left">
                                    <Link className={props.classes.liLink} href={trainAndValImagesUrl}>
                                        21,778 images
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
                                        107,802 word annotations
                                    </Link> (39MB)
                                </Typography>
                            </li>
                            <li>
                                <Typography variant="subtitle1" align="left">
                                    3,124 images
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
                                        Metadata
                                    </Link> (1MB)
                                </Typography>
                            </li>
                            <li>
                                <Typography variant="subtitle1" align="left">
                                    <Link className={props.classes.liLink} href={testImagesUrl}>
                                        3,232 images
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
                        <br />
                        <Typography variant="subtitle1" align="left">
                            We will be soon hosting a challenge on TextOCR test set.
                            Reach us out at <Link href="mailto:textvqa@fb.com">textvqa@fb.com</Link> for
                            any questions.
                        </Typography>
                    </Grid>

                    <Grid item xs={12} md={12}>
                        <Typography variant="h6" align="left">Readme</Typography>
                            <Typography variant="subheading" align="left"><b>General Information</b></Typography>
                            <ul className={props.classes.ulItems}>
                                <li>
                                    <Typography variant="subtitle1" align="left">
                                        Data is available under <Link href={licenseURL}>CC BY 4.0</Link> license.
                                    </Typography>
                                </li>
                                {/* <li>
                                    <Typography variant="subtitle1" align="left">
                                    TextCaps evaluation server for testing and validation set is hosted
                                    on <Link href={evalAIURL}>EvalAI</Link>.
                                    </Typography>
                                </li> */}
                                <li>
                                    <Typography variant="subtitle1" align="left">
                                        Numbers in the papers should be reported on v0.1 test set. We will soon host a challenge on that.
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant="subtitle1" align="left">
                                        Reach us out at <Link href="mailto:textvqa@fb.com">textvqa@fb.com</Link> for any questions, suggestions and feedback.
                                    </Typography>
                                </li>
                            </ul>
                            <Typography variant="subheading" align="left"><b>Images</b></Typography>
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
                            </ul>
                            <Typography variant="subheading" align="left"><b>Dataset Format</b></Typography>
                            <ul className={props.classes.ulItems}>
                            <li>
                                <Typography variant="subtitle1" align="left">

                                    The json format mostly follows COCO-Text v2, except the "mask" field in
                                    "anns" is named as "points" for the polygon annotation.
                                </Typography>
                            </li>
                            <li>
                                <Typography variant="subtitle1" align="left">
                                    The "points" field is a list of 2D coordinates like [x1, y1, x2, y2, ...]. Note that (x1,y1) is always the top-left corner of the text (in its own
                                    orientation), and order of the points is clockwise (for example, for horizontal
                                    text, (x1, y1) and (x2, y2) will form the top line).
                                </Typography>
                            </li>
                            <li>
                                <Typography variant="subtitle1" align="left">
                                    The "bbox" field contains horizontal box converted from "points" for
                                    convenience, and "area" is computed based on width and height of "bbox".
                                    For any conversion to other formats such as rotated boxes or quadrilaterals,
                                    "points" should be used as the source of truth.
                                </Typography>
                            </li>
                            </ul>
                            <Typography variant="subheading" align="left"><b>Annotation Details</b></Typography>
                            <ul className={props.classes.ulItems}>
                            <li>
                                <Typography variant="subtitle1" align="left">
                                    In cases when the text is illegible or not in English, polygon is annotated
                                    normally but word will be annotated as a single "." symbol.
                                </Typography>
                            </li>
                            <li>
                                <Typography variant="subtitle1" align="left">
                                    Word annotations are case-sensitive, and can contain punctuations too.
                                </Typography>
                            </li>
                            <li>
                                <Typography variant="subtitle1" align="left">
                                    The annotators were instructed to draw exactly 4 points (quadrilaterals) whenever
                                    possible, and only draw more than 4 points when necessary (for cases like
                                    curved text).
                                </Typography>
                            </li>
                            </ul>
                            <Typography variant="subheading" align="left"><b>Relationship with TextVQA/TextCaps</b></Typography>
                            <ul className={props.classes.ulItems}>
                            <li>
                                <Typography variant="subtitle1" align="left">
                                    The image ids in TextOCR match the ids in TextVQA.
                                </Typography>
                            </li>
                            <li>
                                <Typography variant="subtitle1" align="left">
                                    train/val/test splits are the same as TextVQA/TextCaps. However due to privacy
                                    reasons, we removed 274 images from TextVQA while creating TextOCR.
                                </Typography>
                            </li>
                            </ul>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Typography variant="h6" align="left">Description</Typography>
                        <br />
                        <Typography align="left">
                            TextOCR JSON files
                        </Typography>
                        <Typography component="span" align="left" className={props.classes.preParent}>
                            <Typography component="pre">
                                <Typography component="span" variant="body1">
                                    <code>
                                        {JSON.stringify(dataDescription['default']['textocr'], null, 2)}
                                    </code>
                                </Typography>
                            </Typography>
                        </Typography>
                        <br />

                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Typography variant="h6" align="left">License</Typography>
                        <br />
                        <Typography variant="subtitle1" align="left">
                            <Link href={licenseURL}>CC BY 4.0</Link>
                        </Typography>
                    </Grid>
                </Grid>
                <br />
                <Divider />
                <br />
            </Grid>
        </Grid>

    )
}

export default withStyles(styles)(TextOCRDownload);