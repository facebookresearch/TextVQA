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

class TextCapsContent extends React.Component {
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
                        app="textcaps"
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
                                            srcSet="/assets/images/textcaps_logo_and_text.svg"
                                            alt="TextCaps"
                                            className={classes.bannerLogo}
                                        />
                                    </Grid>
                                </Grid>
                                <Typography variant="subtitle1">
                                    A dataset to benchmark reading comprehension in image captioning task.
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
                                        <Link href="/textcaps/explore">
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
                                        <Link href="/textcaps/challenge">
                                            <Button variant="contained" color="primary">
                                                Challenge
                                        </Button>
                                        </Link>
                                    </Grid>
                                    <Grid item xs={6} sm={6} md={3}>
                                        <Link href="/textcaps/dataset">
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
                                            TextCaps requires models to read and reason about text in images
                                            to generate captions about them. Specifically, models need to
                                            incorporate a new modality of text present in the images and
                                            reason over it and visual content in the image to generate image descriptions.
                                    </Typography>
                                    </Grid>
                                    <Grid item xs={12} className={classes.gridItem}>
                                        <Typography
                                            className={classes.sectionHeader}
                                            variant="subtitle1"
                                            gutterBottom
                                            align="left"
                                        >
                                            Have a look at our ECCV 2020 oral presentation to know more about TextCaps:
                                        <iframe
                                                title="ECCV Video"
                                                width="560"
                                                height="315"
                                                src="https://www.youtube.com/embed/bWOnRpqmom4"
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                            />
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
                                                    142,040 captions
                                            </Typography>
                                            </li>
                                            <li>
                                                <Typography variant="subtitle1" align="left">
                                                    5 captions per image
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
                                        Join our <Link href="https://groups.google.com/forum/#!forum/textvqa">Google Group</Link> for TextCaps release updates and announcements.
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} className={classes.gridItem}>
                                    <ul className={classes.ulList}>
                                        {news["textcaps"].news.map((obj, idx) => (
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
                                        TextCaps Challenge 2020 is live! See more details
                                        on the <Link href="/textcaps/challenge">challenge page</Link>.
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
                                        Find the starter code for TextCaps and M4C-Captioner
                                        at <Link href="https://github.com/facebookresearch/pythia/tree/project/m4c/projects/M4C_Captioner">https://github.com/facebookresearch/pythia</Link>.
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
                                    {/* <Typography
                                        variant="subtitle1"
                                        align="left"
                                        >
                                        <b>Title</b>: Towards VQA models that can read<br/>
                                        <b>Authors</b>: Amanpreet Singh, Vivek Natarajan, Meet Shah, Yu Jiang, Xinlei Chen, Dhruv Batra, Devi Parikh, and Marcus Rohrbach<br/>
                                        <b>Venue</b>: CVPR 2019 (<Link href="paper">Paper</Link>)<br/><br/>
                                        If you use TextVQA, please cite <Link href="bibtex.txt">
                                        using this
                                        </Link>.
                                    </Typography> */}
                                    <Typography
                                        variant="subtitle1"
                                        align="left"
                                    >
                                        <pre className={classes.citationPre}>
                                            <code>
                                                @inproceedings{'{'}sidorov2019textcaps,<br />
                                            &nbsp;&nbsp;&nbsp;&nbsp;title={'{'}TextCaps: a Dataset for Image Captioningwith Reading Comprehension},<br />
                                            &nbsp;&nbsp;&nbsp;&nbsp;author={'{'}Sidorov, Oleksii and Hu, Ronghang and Rohrbach, Marcus and Singh, Amanpreet},<br />
                                            &nbsp;&nbsp;&nbsp;&nbsp;journal={'{'}European Conference on Computer Vision},<br />
                                                {/* &nbsp;&nbsp;&nbsp;&nbsp;pages={'{'}8317-8326},<br /> */}
                                            &nbsp;&nbsp;&nbsp;&nbsp;year={'{'}2020}<br />
                                            }
                                            </code>
                                        </pre>
                                    or use this <Link href="/textcaps_bibtex.txt">link</Link>.
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
                            <div className={classes.container} />
                            <People />
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
                            <Grid item xs={3} md={3} lg={2}>
                                <Link target="_blank" href="https://www.berkeley.edu/">
                                    <img
                                        className={classes.bannerLogo}
                                        style={{
                                            marginTop: '5%'
                                        }}
                                        srcSet="https://www.berkeley.edu/images/uploads/logo-ucberkeley.png"
                                        alt="UC Berkeley"
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

export default TextCapsContent;