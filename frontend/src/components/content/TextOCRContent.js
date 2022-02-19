import React from 'react';
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'
import Link from '@material-ui/core/Link';
import Divider from '@material-ui/core/Divider';

import Banner from '../Banner';
import People from '../People';
import news from '../../news.json';

import { ReactiveBase } from '@appbaseio/reactivesearch';
import * as config from '../../frontend_config.json';

class TextOCRContent extends React.Component {
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
                    {/* <ReactiveBase
                        app="textocr"
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
                    </ReactiveBase> */}
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
                                            srcSet="/assets/images/textocr/logo_horizontal_color_with_text.svg"
                                            alt="TextCaps"
                                            className={classes.bannerLogo}
                                        />
                                    </Grid>
                                </Grid>
                                <Typography variant="subtitle1">
                                    A dataset to benchmark text recognition on arbitrary shaped scene-text.
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
                                        <Link href="/textocr/explore">
                                            <Button variant="contained" color="primary">
                                                Explore
                                        </Button>
                                        </Link>
                                    </Grid>
                                    <Grid item xs={6} sm={6} md={3}>
                                        <Link href="https://arxiv.org/abs/2003.12462">
                                            <Button variant="contained" color="primary">
                                                Paper
                                        </Button>
                                        </Link>
                                    </Grid>
                                    <Grid item xs={6} sm={6} md={3}>
                                        <Link href="/textocr/dataset">
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
                                            TextOCR requires models to perform text-recognition on arbitrary shaped
                                            scene-text present on natural images. TextOCR provides ~1M high quality
                                            word annotations on TextVQA images allowing application of end-to-end
                                            reasoning on downstream tasks such as visual question answering or
                                            image captioning.
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
                                                    28,134 natural images from TextVQA
                                            </Typography>
                                            </li>
                                            <li>
                                                <Typography variant="subtitle1" align="left">
                                                    903,069 annotated scene-text words
                                            </Typography>
                                            </li>
                                            <li>
                                                <Typography variant="subtitle1" align="left">
                                                    32 words per image on average
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
                                    <ul className={classes.ulList}>
                                        {news["textocr"].news.map((obj, idx) => (
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
                                    Coming soon.
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
                                        className={classes.breakWord}
                                    >
                                        Coming soon!
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
                                        <pre className={classes.citationPre}>
                                            <code>
                                                @inproceedings{'{'}singh2021textocr,<br />
                                            &nbsp;&nbsp;&nbsp;&nbsp;title={'{'}{'{'}TextOCR}: Towards large-scale end-to-end reasoning for arbitrary-shaped scene text},<br />
                                            &nbsp;&nbsp;&nbsp;&nbsp;author={'{'}Singh, Amanpreet and Pang, Guan and Toh, Mandy and Huang, Jing and Galuba, Wojciech and Hassner, Tal},<br />
                                            &nbsp;&nbsp;&nbsp;&nbsp;journal={'{'}The Conference on Computer Vision and Pattern Recognition},<br />
                                                {/* &nbsp;&nbsp;&nbsp;&nbsp;pages={'{'}8317-8326},<br /> */}
                                            &nbsp;&nbsp;&nbsp;&nbsp;year={'{'}2021}<br />
                                            }
                                            </code>
                                        </pre>
                                    or use this <Link href="/textcaps_bibtex.txt">link</Link>.
                                    </Typography>
                                    <br />
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
                            <div className={classes.container} />
                            <People />
                            <Typography
                                className={classes.sectionHeader}
                                variant="caption"
                                align="center"
                            >
                                *Equal contribution
                            </Typography>
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

                        <Divider className={classes.people} />
                        <Grid
                            container
                            justify="flex-start"
                            alignContent="center"
                            spacing={16}
                            className={classes.sectionHeader}
                        >
                            <Grid item xs={6} md={6} lg={4}>
                                <Link target="_blank" href="https://research.fb.com/category/facebook-ai-research/">
                                    <img
                                        className={classes.bannerLogo}
                                        style={{
                                            marginTop: '5%'
                                        }}
                                        srcSet="/assets/images/fair_logo.png"
                                        alt="Facebook Artificial Intelligence Research"
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

export default TextOCRContent;