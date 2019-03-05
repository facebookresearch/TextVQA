import React from 'react';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Countdown from 'react-countdown-now';
import Link from '@material-ui/core/Link';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core';

import People from './People';
import * as challengePeople from '../challenge_people.json';

import moment from 'moment-timezone';

const Completionist = () => <span>Challenge has completed!</span>

const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
        // Render a completed state
        return <Completionist />;
    } else {
        // Render a countdown
        return <span>{days} days {hours}h {minutes}m {seconds}s</span>;
    }
};

const styles = (theme) => ({
    title: {
        marginTop: '3em'
    },
    headings: {
        marginTop: '1em'
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
    },
    teaserImage: {
        width: '100%',
    },
    spanTypography: {
        display: 'inline-block'
    },
    bannerLogo: {
        width: '100%'
    },
    sectionHeader: {
        marginTop: '0.35em'
    }
});

const Challenge = (props) => {
    const submissionFormat = [
        {
            'question_id': 'INT',
            'answer': 'STRING'
        }, {
            'question_id': '...',
            'answer': '...'
        }
    ];
    const sampleJSONLink = "https://drive.google.com/file/d/1KpDGPUKILomUZY37b0N5urfMjF60eHNf/view?usp=sharing";
    const evaluationInfoLink = "https://visualqa.org/evaluation.html";
    const deadline = moment.tz("2019-05-18T23:59:59", "Etc/GMT").toDate();
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
                    alignItems="flex-start"
                    spacing={16}
                >
                    <Grid item className={props.classes.title} xs={12}>
                        <Typography variant="h3" align="left">
                            TextVQA Challenge 2019
                        </Typography>
                    </Grid>
                    <br/>
                    <Grid item className={props.classes.versionNumber} xs={12}>
                        <Typography variant="h4" align="left">
                            Deadline: <Countdown date={deadline} renderer={renderer} />
                        </Typography>
                        <Divider/>
                    </Grid>
                    <Grid item className={props.classes.title} xs={12} md={8} lg={8}>
                        <Typography variant="h4" align="left">
                            Overview
                        </Typography>

                        <Typography variant="subtitle1" className={props.classes.headings}  align="left">
                        TextVQA requires models to read and reason about text in an image to answer questions based on them.
                        In order to perform well on this task, models need to first detect and extract out text in the images.
                        Model then using its reasoning capability needs to answer a question grounded in text in the image.
                        </Typography>
                        <Typography variant="subtitle1" className={props.classes.headings} align="left">
                        Current state-of-the-art models fail to answer questions included in TextVQA as they don't have text reading
                        capabilities. As shown in the examples in the image, the answers predicted by the state-of-the-art model are random
                        with no basis when the questions involve reasoning or reading the text.
                        </Typography>
                        <Typography variant="subtitle1" className={props.classes.headings} align="left">
                        Challenge link: <Link href="">add link here later</Link>
                        </Typography>
                    </Grid>
                    <Grid item className={props.classes.title} xs={12} md={4} lg={4}>
                        <img className={props.classes.teaserImage} srcSet="assets/images/teaser.png" alt="Teaser"/>
                    </Grid>
                    <Grid item style={{marginTop: '-1em'}}className={props.classes.headings} xs={12}>
                        <Typography variant="h4" align="left">
                        Prizes
                        </Typography>
                    </Grid>
                    <Grid item className={props.classes.versionNumber} xs={12} md={8} lg={8}>
                        <Typography variant="subtitle1" align="left">
                        The winning team gets <Link href="https://cloud.google.com/">
                         Google Cloud Platform
                        </Link> credits worth $10k!
                        </Typography>
                    </Grid>
                    <Grid item className={props.classes.headings} xs={12}>
                        <Typography variant="h4" align="left">
                        Dates
                        </Typography>
                    </Grid>
                    <Grid item className={props.classes.versionNumber} xs={12} md={8} lg={8}>
                        <Typography variant="subtitle1" align="left">
                            <Typography component="span" className={props.classes.spanTypography} color="primary">
                                4 March 2019
                            </Typography> - Challenge announced.
                        </Typography>
                        <Typography variant="subtitle1" align="left">
                            <Typography component="span" className={props.classes.spanTypography} color="primary">
                                18 May 2019 (23:59:59 GMT)
                            </Typography>
                            - Submission deadline for participants.
                        </Typography>
                        <Typography variant="subtitle1" align="left">
                            <Typography component="span" className={props.classes.spanTypography} color="primary">
                                June 2019
                            </Typography> - Winners' announcment at the <Link href="https://visualqa.org/workshop.html">
                            VQA and VisualDialog Workshop, CVPR 2019.</Link>
                        </Typography>
                        <br/>
                        <Typography variant="subtitle1" align="left">
                        For questions about the challenge, email us at <Link href="mailto:textvqa@fb.com">
                        textvqa@fb.com
                        </Link>
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider/>
                    </Grid>
                    <Grid item className={props.classes.headings} xs={12}>
                        <Typography variant="h4" align="left">
                        Dataset Description
                        </Typography>
                    </Grid>
                    <Grid item className={props.classes.versionNumber} xs={12} md={12} lg={12}>
                        <Typography variant="subtitle1" align="left">
                        You can find detailed description and download links for the dataset at <Link href="download">download</Link> page.
                        </Typography>
                        <br/>
                        <Typography variant="subtitle1" align="left">
                        The challenge will be conducted on v0.5 of the <Link href="download">TextVQA dataset</Link>, which is
                        based on <Link href="https://storage.googleapis.com/openimages/web/index.html">OpenImages</Link>.
                        <br/>
                        TextVQA v0.5 contains 45,336 questions based on 29,634 images. The v0.5 training set contains 34,602 questions
                        based on 22,960 images from OpenImages training set. The v0.5 validation set contains 5,000 questions based on
                        3,321 images from OpenImages training set while the v0.5 test-std set contains 5,734 questions based on 3,353
                        images from OpenImages test set.
                        </Typography>
                        <br/>
                        <Typography variant="subtitle1" align="left">
                        <b>LoRRA</b> model provided in our paper uses OCR tokens extracted via Rosetta system used inside Facebook.
                        As the gap between upper bound of accuracy that can be achieved using OCR tokens from Rosetta
                        and LoRRA's accuracy is large, we provide these OCR tokens also as part of our dataset in belief
                        that these tokens will help in pushing state-of-the-art on TextVQA.
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider />
                    </Grid>
                    <Grid item className={props.classes.headings} xs={12}>
                        <Typography variant="h4" align="left">
                        Participation Guidelines
                        </Typography>
                    </Grid>
                    <Grid item className={props.classes.versionNumber} xs={12} md={12} lg={12}>
                        <Typography variant="subtitle1" align="left">
                        Teams must register on <Link href="https://evalai.cloudcv.org/">EvalAI</Link> and create a team
                        for the challenge (<Link href="https://evalai.readthedocs.io/en/latest/participate.html">Quickstart</Link>)
                        <br/>
                        The challenge page is available here: <Link href="">update with link</Link>
                        </Typography>
                        <Typography variant="subtitle1" align="left">
                        Challenge has two phases:
                        </Typography>
                    </Grid>
                    <Grid item className={props.classes.versionNumber} style={{ width: '100%', overflowX: 'auto' }} xs={12} md={12} lg={12}>
                        <Table style={{minWidth: 700}}>
                            <TableHead>
                                <TableRow>
                                    <TableCell><b>Phase</b></TableCell>
                                    <TableCell align="left"><b>Submissions</b></TableCell>
                                    <TableCell align="left"><b>Results</b></TableCell>
                                    <TableCell align="left"><b>Leaderboard</b></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell><b>val</b></TableCell>
                                    <TableCell align="left">unlimited</TableCell>
                                    <TableCell align="left">immediate</TableCell>
                                    <TableCell align="left">none</TableCell>
                                </TableRow>
                            </TableBody>
                            <TableBody>
                                <TableRow>
                                    <TableCell><b>test-std</b></TableCell>
                                    <TableCell align="left">5 total</TableCell>
                                    <TableCell align="left">immediate</TableCell>
                                    <TableCell align="left">public (optional)</TableCell>
                                </TableRow>
                            </TableBody>
                            <TableBody>
                                <TableRow>
                                    <TableCell><b>test-challenge</b></TableCell>
                                    <TableCell align="left">5 total</TableCell>
                                    <TableCell align="left">To be Announced at CVPR 2019</TableCell>
                                    <TableCell align="left">private, to be announced at CVPR 2019</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                        <br/>
                    </Grid>
                    <Grid item className={props.classes.versionNumber} xs={12} md={12} lg={12}>

                        <Typography className={props.classes.headings} variant="subtitle1" align="left">
                        Please use <b>validation</b> split of TextVQA 0.5 for <b>val</b> phase and <b>test</b> split
                        for <b>test-std</b> phase.
                        While answers are already provided for the <b>val</b> set, this phase is useful for sanity checking result format
                        without wasting submissions in the other phases. For the <b>test-std</b> and <b>test-challenge</b> phases, the results must be submitted on the full set.
                        By default, the submissions for <b>test-std</b> phase are private but can be voluntarily
                        released to the public leaderboard, with a limit of one public leaderboard entry per team.
                        Submissions to <b>test-challenge</b> phase are considered entries into the challenge.
                        For multiple submissions to <b>test-challenge</b>, the approach with
                        the highest test-std accuracy will be used.
                        </Typography>
                        <br/>
                        <Typography variant="subtitle1" align="left">
                        It is not acceptable to create multiple accounts for a single team in order to bypass these limits.
                        The exception to this is if a group is working on multiple unrelated methods,
                        in this case all sets of results can be submitted for evaluation.
                        Results must be submitted to the evaluation server by
                        the challenge deadline -- no exceptions will be made.
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider />
                    </Grid>
                    <Grid item className={props.classes.headings} xs={12}>
                        <Typography variant="h4" align="left">
                            Submission Format
                        </Typography>
                    </Grid>
                    <Grid item className={props.classes.versionNumber} xs={12} md={12} lg={12}>
                        <Typography variant="subtitle1" align="left">
                        To submit to a phase, teams must upload a JSON file containing their model's answer prediction in the following format:
                        </Typography>
                        <br/>
                        <Typography component="span" align="left" className={props.classes.preParent}>
                            <Typography component="pre">
                                <Typography component="span" variant="body1">
                                    <code>
                                        {JSON.stringify(submissionFormat, null, 2)}
                                    </code>
                                </Typography>
                            </Typography>
                        </Typography>
                        <Typography className={props.classes.headings} variant="subtitle1" align="left">
                            where <b>question_id</b> is question's unique id
                            and <b>answer</b> is the prediction by your model for the question.
                            You can find an example submission file <Link href={sampleJSONLink}>here</Link>.
                            When submitting, teams should also include a method name,
                            method description, project URL,
                            and publication URL if available.
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider />
                    </Grid>
                    <Grid item className={props.classes.headings} xs={12}>
                        <Typography variant="h4" align="left">
                            Evaluation
                        </Typography>
                    </Grid>
                    <Grid item className={props.classes.versionNumber} xs={12} md={12} lg={12}>
                        <Typography variant="subtitle1" align="left">
                        We use the same metric as VQA v2 which is robust to inter-human variability in phrasing
                        the answers. More information on this can be found at <Link href={evaluationInfoLink}>
                        {evaluationInfoLink}</Link>
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider />
                    </Grid>
                    <Grid item className={props.classes.headings} xs={12}>
                        <Typography variant="h4" align="left">
                            Organizers
                        </Typography>
                    </Grid>

                    <Grid item className={props.classes.versionNumber} xs={12} md={12} lg={12}>
                        <People people={challengePeople.people}/>
                    </Grid>
                    <Grid
                        container
                        justify="flex-start"
                        alignContent="center"
                        spacing={16}
                        className={props.classes.sectionHeader}
                    >
                        <Grid item xs={6} md={6} lg={4}>
                            <img
                                className={props.classes.bannerLogo}
                                style={{
                                    marginTop: '5%'
                                }}
                                srcSet="assets/images/fair_logo.png"
                                alt="Facebook Artificial Intelligence Research"
                            />
                        </Grid>
                        <Grid item xs={3} md={3} lg={2}>
                            <img
                                className={props.classes.bannerLogo}
                                srcSet="assets/images/gt_logo.png"
                                alt="Georgia Tech"
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider />
                    </Grid>
                    <Grid item className={props.classes.headings} xs={12}>
                        <Typography variant="h4" align="left">
                            Sponsors
                        </Typography>
                    </Grid>
                    <Grid item className={props.classes.versionNumber} xs={12} md={12} lg={12}>
                        <Grid item xs={3} md={3} lg={2}>
                            <img
                                className={props.classes.bannerLogo}
                                srcSet="assets/images/gcp_logo.svg"
                                alt="Google Cloud Platform"
                            />
                        </Grid>
                    </Grid>

                </Grid>
                <br />
                <Divider />
                <br />
            </Grid>
        </Grid>

      )
}

export default withStyles(styles)(Challenge);