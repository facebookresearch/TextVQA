import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider';
import Slide from '@material-ui/core/Slide';

import ImageCard from './ImageCard'
import * as data from '../TextVQA_with_url_val.json';


const styles = theme => ({
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  root: {
    //   flexGrow: 1,
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
                <Grid container direction="row" justify="center" alignItems="flex-start">
                    <Grid item xs={12} md={6}>
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
                        
                        <Grid container spacing={40}>
                            <Divider className={classes.divider} variant='fullWidth'/>
                            <Grid item xs={12} md={6}>
                                Hello
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