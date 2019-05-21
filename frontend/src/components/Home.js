// Copyright (c) Facebook, Inc. and its affiliates.
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Link from '@material-ui/core/Link';
import Divider from '@material-ui/core/Divider';

import Banner from './Banner';
import People from './People';
import * as news from '../news.json';
import * as config from '../frontend_config.json';
import { ReactiveBase } from '@appbaseio/reactivesearch';


const styles = theme => ({
    paper: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
    },
    mainContainer: {
        backgroundImage: 'radial-gradient( ' +
        theme.palette.primary.light + ' 20% ,' + theme.palette.primary.dark + ' 100%)',
        opacity: 0.9,
        height: '50vh'
    },
    people: {
        margin: '0 auto',
        marginTop: '1.5em'
    },
    root: {
        // flexGrow: 1,
        // marginTop: '50px'
    },
    divider: {
        color: '#888',
        width: '100%'
    },
    gridItem: {
        padding: theme.spacing.unit * 1.5
    },
    sectionHeader: {
        marginTop: '0.15em'
    },
    ulList: {
        margin: '0'
    },
    container: {
        padding: theme.spacing.unit * 2,
    },
    bannerLogo: {
        width: '100%'
    },
    spanInlineBlock: {
        display: 'inline'
    },
    greenColor: {
        color: theme.palette.primary.main
    },
    hrefGreenColor: {
        '& a': {
            color: theme.palette.primary.main,
            textDecoration: 'none'
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
    }
});

class Home extends React.Component {
    state = {
        checked: false
    }

    updateQuery = (query) => {
        let body = query.body;
        body = body.split('\n')
        let queryParams = JSON.parse(body[1]);
        queryParams["query"] = {
            "function_score": {
                "query": queryParams["query"],
                "random_score": {
                    "seed": this.seed
                }
            }
        };

        body[1] = JSON.stringify(queryParams)
        body = body.join('\n');
        body = body.replace('"field":"set_name"', '"field":"set_name.keyword"');
        body = body.replace('"field":"image_classes"', '"field":"image_classes.keyword"');
        query.body = body;

        return query;
    }


    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Grid
                    container
                    className={classes.mainContainer}
                    direction="row"
                    justify="center"
                    alignItems="center"
                    style={{
                        position: 'relative'
                    }}
                >
                    <div
                        style={{
                            height: '50vh',
                            backgroundColor: 'rgba(0, 0, 0, 0.4)',
                            width: '100%',
                            zIndex: -10,
                            position: "absolute"
                        }}
                    />
                    <ReactiveBase
                        app={config.index_name}
                        url={config.server_url}
                        transformRequest={this.updateQuery}
                        style={{
                            height: '50vh',
                            overflow: 'auto',
                            position: 'relative'
                        }}
                    >
                        <Banner
                            showOCRBoxes={true}
                            showAnswers={true}
                            showResultStats={false}
                            showQuestions={true}
                            reactValues={{}}
                            pagination={true}
                            loader=""
                            size={15}
                            style={{
                                height: '50vh',
                                zIndex: -20,
                                size: 10,
                                position: 'absolute',
                                top: 0,
                                overflow: 'hidden'
                            }}
                        />
                    </ReactiveBase>
                    <Grid
                        container
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%'
                        }}
                        justify="center"
                        alignItems="center"
                    >
                        <Grid
                            item
                            xs={10}
                            sm={9}
                            md={8}
                            lg={6}
                            style={{
                                position: 'relative'
                            }}
                        >
                            <Paper className={classes.paper} elevation={1}>
                                <Grid
                                    container
                                    justify="center"
                                    alignItems="center"
                                    >
                                    <Grid
                                        item
                                        xs={10}
                                        md={8}
                                        lg={6}
                                    >
                                        <img
                                            srcSet="assets/images/textvqa_logo_and_text_green.svg"
                                            alt="TextVQA"
                                            className={classes.bannerLogo}
                                        />
                                    </Grid>
                                </Grid>
                                <Typography variant="subtitle1">
                                A dataset to benchmark visual reasoning based on text in images.
                                </Typography>
                                <Grid
                                    style={{
                                        marginTop: '10px'
                                    }}
                                    container
                                    direction="row"
                                    justify="center"
                                    alignItems="center"
                                    spacing={16}
                                >
                                    <Grid item xs={6} sm={6} md={3}>
                                        <Link href="explore">
                                            <Button variant="contained" color="primary">
                                                Explore
                                            </Button>
                                        </Link>
                                    </Grid>
                                    <Grid item xs={6} sm={6} md={3}>
                                        <Link href="https://arxiv.org/abs/1904.08920">
                                            <Button variant="contained" color="primary">
                                                Paper
                                            </Button>
                                        </Link>
                                    </Grid>
                                    <Grid item xs={6} sm={6} md={3}>
                                        <Link href="challenge">
                                            <Button variant="contained" color="primary">
                                                Challenge
                                            </Button>
                                        </Link>
                                    </Grid>
                                    <Grid item xs={6} sm={6} md={3}>
                                        <Link href="dataset">
                                            <Button variant="contained" color="primary">
                                                Download
                                            </Button>
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>

                    </Grid>
                </Grid>
                <Grid
                    container
                    justify="center"
                    alignContent="center"
                >
                    <Grid
                        item
                        xs={10}
                        md={8}
                        lg={7}
                        className={classes.people}
                    >
                        <Grid container justify="center" alignContent="center">
                            <Grid item xs={12} lg={6}>
                                <Grid container justify="flex-start" spacing={16}>
                                    <Grid item xs={12} className={classes.gridItem}>
                                        <Typography
                                            className={classes.sectionHeader}
                                            variant="h4"
                                            gutterBottom
                                            align="left"
                                            >
                                            Overview
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} className={classes.gridItem}>
                                        <Typography
                                            className={classes.sectionHeader}
                                            variant="subtitle1"
                                            gutterBottom
                                            align="left"
                                        >
                                            TextVQA requires models to read and reason about text in images
                                            to answer questions about them. Specifically, models need to
                                            incorporate a new modality of text present in the images and
                                            reason over it to answer TextVQA questions.
                                            </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <Grid container justify="flex-start" spacing={16}>
                                    <Grid item xs={12} className={classes.gridItem}>
                                        <Typography
                                            className={classes.sectionHeader}
                                            variant="h4"
                                            gutterBottom
                                            align="left"
                                        >
                                        Statistics
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid container justify="flex-start" spacing={16}>
                                    <Grid item xs={12} className={classes.gridItem}>
                                        <ul>
                                            <li>
                                            <Typography variant="subtitle1" align="left">
                                                28,408 images from OpenImages
                                            </Typography>
                                            </li>
                                            <li>
                                                <Typography variant="subtitle1" align="left">
                                                45,336 questions
                                                </Typography>
                                            </li>
                                            <li>
                                                <Typography variant="subtitle1" align="left">
                                                453,360 ground truth answers
                                                </Typography>
                                            </li>
                                        </ul>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <div className={classes.people}>
                            <Grid
                                container
                                justify="flex-start"
                                spacing={16}
                            >
                                <Grid item xs={12} className={classes.gridItem}>
                                    <Typography
                                        className={classes.sectionHeader}
                                        variant="h4"
                                        align="left"
                                    >
                                        News
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} className={classes.gridItem}>
                                    <Typography
                                        className={classes.sectionHeader}
                                        variant="subtitle1"
                                        align="left"
                                    >
                                        Join our <Link href="https://groups.google.com/forum/#!forum/textvqa">Google Group</Link> for TextVQA release updates and announcements.
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} className={classes.gridItem}>
                                    <ul className={classes.ulList}>
                                        {news.news.map((obj, idx) => (
                                            <li key={idx}>
                                                <Typography
                                                    align="left"
                                                    variant="subtitle1"
                                                >
                                                    <span>[{obj.date}] </span>
                                                    <span className={classes.hrefGreenColor} dangerouslySetInnerHTML={{ __html: obj.news }} />
                                                </Typography>
                                            </li>

                                        ))}
                                    </ul>
                                </Grid>
                            </Grid>
                        </div>

                        <div className={classes.people}>
                            <Grid
                                container
                                justify="flex-start"
                                spacing={16}
                            >
                                <Grid item xs={12} className={classes.gridItem}>
                                    <Typography
                                        className={classes.sectionHeader}
                                        variant="h4"
                                        align="left"
                                    >
                                        Challenge
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} className={classes.gridItem}>
                                    <Typography
                                        variant="subtitle1"
                                        align="left"
                                        >
                                        TextVQA Challenge 2019 is live! See more details
                                        on the <Link href="challenge">challenge page</Link>.
                                    </Typography>
                                </Grid>
                            </Grid>
                        </div>
                        <div className={classes.people}>
                            <Grid
                                container
                                justify="flex-start"
                                spacing={16}
                            >
                                <Grid item xs={12} className={classes.gridItem}>
                                    <Typography
                                        className={classes.sectionHeader}
                                        variant="h4"
                                        align="left"
                                    >
                                        Code
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} className={classes.gridItem}>
                                    <Typography
                                        variant="subtitle1"
                                        align="left"
                                        >
                                        Find the starter code for TextVQA and LoRRA
                                        at <Link href="https://github.com/facebookresearch/pythia">https://github.com/facebookresearch/pythia</Link>.
                                    </Typography>
                                </Grid>
                            </Grid>
                        </div>
                        <div className={classes.people}>
                            <Grid
                                container
                                justify="flex-start"
                                spacing={16}
                            >
                                <Grid item xs={12} className={classes.gridItem}>
                                    <Typography
                                        className={classes.sectionHeader}
                                        variant="h4"
                                        align="left"
                                    >
                                        Citation
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} className={classes.gridItem}>
                                    <Typography
                                        variant="subtitle1"
                                        align="left"
                                        >
                                        <b>Title</b>: Towards VQA models that can read<br/>
                                        <b>Authors</b>: Amanpreet Singh, Vivek Natarajan, Meet Shah, Yu Jiang, Xinlei Chen, Dhruv Batra, Devi Parikh, and Marcus Rohrbach<br/>
                                        <b>Venue</b>: CVPR 2019 (<Link href="paper">Paper</Link>)<br/><br/>
                                        If you use TextVQA, please cite <Link href="bibtex.txt">
                                        using this
                                        </Link>.
                                    </Typography>
                                    <br />
                                    {/* <Typography component="span" align="left" className={classes.preParent}>
                                        <Typography component="pre" dangerouslySetInnerHTML={{
                                            __html: '@InProceedings{singh2019textvqa, \n\ttitle={Towards VQA models that can read},' +
                                                    '\n\tauthor={Singh, Amanpreet and Natarajan, Vivek and Shah, Meet and Jiang, Yu ' +
                                                    'and Chen, Xinlei and Batra, Dhruv and Parikh, Devi and Rohrbach, Marcus},' +
                                                    '\n\tbooktitle = {The IEEE Conference on Computer Vision and Pattern Recognition ' +
                                                    '(CVPR)}, \n\tyear = {2019}\n}'
                                        }} />
                                    </Typography> */}
                                </Grid>
                            </Grid>
                        </div>

                        <div className={classes.people}>
                            <Grid container justify="flex-start" spacing={16}>
                                <Grid item xs={12} className={classes.gridItem}>
                                    <Typography
                                        className={classes.sectionHeader}
                                        variant="h4"
                                        align="left"
                                    >
                                        People
                                    </Typography>
                                </Grid>
                            </Grid>
                            <div className={classes.container}/>
                            <People/>
                        </div>
                        <div className={classes.people}>
                            <Grid container justify="flex-start" spacing={16}>
                                <Grid item xs={12} className={classes.gridItem}>
                                    <Typography
                                        className={classes.sectionHeader}
                                        variant="h4"
                                        align="left"
                                    >
                                        Contact
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} className={classes.gridItem}>
                                    <Typography
                                        variant="subtitle1"
                                        align="left"
                                    >
                                        Reach us out at <Link href="mailto:textvqa@fb.com">textvqa@fb.com</Link> for any questions, suggestions and feedback.
                                    </Typography>

                                </Grid>
                            </Grid>

                        </div>

                        <Divider className={classes.people}/>
                        <Grid
                            container
                            justify="flex-start"
                            alignContent="center"
                            spacing={16}
                            className={classes.sectionHeader}
                        >
                            <Grid item xs={6} md={6} lg={4}>
                                <Link href="https://research.fb.com/category/facebook-ai-research/">
                                    <img
                                        className={classes.bannerLogo}
                                        style={{
                                            marginTop: '5%'
                                        }}
                                        srcSet="assets/images/fair_logo.png"
                                        alt="Facebook Artificial Intelligence Research"
                                    />
                                </Link>
                            </Grid>
                            <Grid item xs={3} md={3} lg={2}>
                                <Link href="https://www.gatech.edu/">
                                    <img
                                        className={classes.bannerLogo}
                                        srcSet="assets/images/gt_logo.png"
                                        alt="Georgia Tech"
                                    />
                                </Link>
                            </Grid>
                        </Grid>
                    </Grid>

                </Grid>
            </div>
        );
    }
}

Home.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);