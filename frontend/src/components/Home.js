import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Link from '@material-ui/core/Link';

import Banner from './Banner';
import People from './People';
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
      width: '60%',
      margin: '0 auto',
      marginTop: '2em'
  },
  root: {
    //   flexGrow: 1,
    // marginTop: '50px'
  },
  divider: {
      color: '#888',
      width: '100%'
  },
  gridItem: {
      padding: theme.spacing.unit * 2
  },
  sectionHeader: {
      marginTop: '0.35em'
  },
  container: {
    padding: theme.spacing.unit * 2,
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
                                <Typography variant="h2">
                                TextVQA
                                </Typography>

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
                                    <Grid item xs={12} sm={6} md={3}>
                                        <Link href="explore">
                                            <Button variant="contained" color="primary">
                                                Explore
                                            </Button>
                                        </Link>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={3}>
                                        <Link href="paper">
                                            <Button variant="contained" color="primary">
                                                Paper
                                            </Button>
                                        </Link>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={3}>
                                        <Link href="challenge">
                                            <Button variant="contained" color="primary">
                                                Challenge
                                            </Button>
                                        </Link>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={3}>
                                        <Link href="download">
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
                <Grid container className={this.props.classes.people}>
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
                                    TextVQA requires models to read and reason about questions based on text in images.
                                    Specifically, given an image, model will be provided a question which will require reading
                                    and reasoning on text present in it. Current state-of-the-art visual question answering (VQA)
                                    fail at doing this task.
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
                                          28408 images from OpenImages
                                      </Typography>
                                    </li>
                                    <li>
                                        <Typography variant="subtitle1" align="left">
                                          45336 questions
                                        </Typography>
                                    </li>
                                    <li>
                                        <Typography variant="subtitle1" align="left">
                                          453360 ground truth answers
                                        </Typography>
                                    </li>
                                </ul>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <div className={this.props.classes.people}>
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
                                gutterBottom
                                >
                                Citation
                            </Typography>
                        </Grid>
                        <Grid item xs={12} className={classes.gridItem}>
                            <Typography
                                variant="subtitle1"
                                align="left"
                                gutterBottom
                                >
                                Please cite using <Link href="bibtex.txt">
                                this BiBTeX
                                </Link> if you use TextVQA in your work.
                            </Typography>
                        </Grid>
                    </Grid>
                </div>
                <div className={this.props.classes.people}>
                    <Grid container justify="flex-start" spacing={16}>
                        <Grid item xs={12} className={classes.gridItem}>
                            <Typography
                                className={classes.sectionHeader}
                                variant="h4"
                                align="left"
                                gutterBottom
                            >
                                People
                            </Typography>
                        </Grid>
                    </Grid>
                    <div className={classes.container}/>
                    <People/>
                </div>
            </div>
        );
    }
}

Home.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);