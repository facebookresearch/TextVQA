import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider';
import Slide from '@material-ui/core/Slide';

import ImageCard from './ImageCard'
import People from './People';
import * as data from '../TextVQA_with_url_val.json';


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
      height: '40vh'
  },
  people: {
      width: '80%',
      margin: '0 auto'
  },
  root: {
    //   flexGrow: 1,
    // marginTop: '50px'
  },
  divider: {
      color: '#888',
      width: '100%'
  },
  container: {
    padding: theme.spacing.unit * 2,
  }
});

class Home extends React.Component {
    state = {
        choice: Math.floor(Math.random() * data['data'].length),
        checked: false
    }

    componentDidMount = () => {
        this.updateExampleCard();
    }

    updateExampleCard = () => {
        window.setTimeout(() => {
            this.setState({
                checked: false
            })

            const choice = Math.floor(Math.random() * data['data'].length);
            const testImage = new Image();
            testImage.onload = () => {
                this.setState({
                    choice: choice,
                    checked: true
                });
                this.updateExampleCard();
            }

            testImage.onerror = () => {
                this.updateExampleCard();
            }

            testImage.src = data['data'][choice]['flickr_url'];
        }, 5000);
    }

    render() {
        const { classes } = this.props;
        const item = data['data'][this.state.choice];

        return (
            <div className={classes.root}>
                <Grid
                    container
                    className={classes.mainContainer}
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    <div
                        style={{
                            height: '40vh',
                            backgroundColor: 'rgba(0, 0, 0, 0.1)',
                            width: '100%',
                            zIndex: -10,
                            position: "absolute"
                        }}
                    />
                    <Grid zIndex={5} item xs={12} md={8} lg={6}>
                        <div style={{
                            zIndex: 4
                        }}>
                        </div>
                        <Paper className={classes.paper} elevation={1}>
                            <Typography variant="h2" align="left">
                            TextVQA
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
                                <Grid item xs={12} md={6}>
                                    <Button variant="contained" color="primary">
                                        Explore
                                    </Button>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Button variant="contained" color="primary">
                                        Download
                                    </Button>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                    {/* <Grid item xs={12} md={6}>
                        <Grid container spacing={40} justify="center" alignItems="center">
                            <Grid item xs={12} md={4}>
                                <Paper className={classes.paper} elevation={1}>
                                    <Typography variant="title" component="h3" gutterBottom align="left">
                                        What is TextVQA?
                                    </Typography>
                                    <Typography component="p" align="justify">
                                        Built on OpenImages, TextVQA contains open-ended questions on
                                        real-world images, which can only be answered by reading text present in
                                        the images. Current state-of-the-art VQA models are perform poorly on TextVQA and questions
                                        that require reading text in the image. TextVQA aims to help solve this problem by providing examples
                                        specifically for it.
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Paper className={classes.paper} elevation={1}>
                                    <Typography variant="title" component="h3" gutterBottom align="left">
                                        Dataset
                                    </Typography>
                                    <Typography component="p" align="left">
                                        TextVQA contains x questions based on y images from OpenImages.
                                        <br/>
                                        Training and Validation sets of TextVQA has been created from OpenImages training set with a random split.
                                        <br/>
                                        While the test set has been collected from OpenImages test set.
                                        <br/>
                                        Statistics:

                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Slide direction="left" in={this.state.checked} mountOnEnter unmountOnExit>
                                    <ImageCard
                                        imgUrl={item['flickr_url']}
                                        question={item['question']}
                                        answer={item['answers'][0]}
                                    />
                                </Slide>
                            </Grid>
                        </Grid>

                    </Grid>
                */}
                </Grid>
                <div className={this.props.classes.people}>
                    <Typography variant="title" component="h2" gutterBottom align="left">
                        People
                    </Typography>
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