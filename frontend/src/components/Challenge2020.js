// Copyright (c) Facebook, Inc. and its affiliates.
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
import { withStyles, ListItem, ListItemText, List } from '@material-ui/core';

import People from './People';
import challengePeople from '../challenge_people.json';

import moment from 'moment-timezone';
import { useLocation } from 'react-router-dom';

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
    overview: {
        marginTop: '2em'
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
    evalAILink: {
        wordBreak: 'break-word'
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
    },
    evalaiLogo: {
        marginLeft: '-3px'
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
    const sceneTextVQALink = "https://rrc.cvc.uab.es/?ch=11";
    const ocrVQALink = "https://ocr-vqa.github.io/";
    const textCapsLink = "https://textvqa.org/textcaps";
    const deadline = moment.tz("2020-05-15T23:59:59", "Etc/GMT").toDate();
    const location = useLocation();
    const index = location.pathname.indexOf("textcaps") === -1 ? "textvqa" : "textcaps";

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
                            TextVQA Challenge 2020
                        </Typography>
                    </Grid>
                    <br/>
                    <Grid item className={props.classes.versionNumber} xs={12}>
                        <Typography variant="h4" align="left">
                            Deadline: <Countdown date={deadline} renderer={renderer} />
                        </Typography>
                        <Divider />
                    </Grid>
                    <Grid item className={props.classes.versionNumber} xs={12}>
                        <Grid container>
                            <Grid item xs={6} sm={4} lg={2}>
                                <Typography variant="h5" align="left">
                                    Powered by:
                                    <Link target="_blank" href="https://evalai.cloudcv.org/web/challenges/challenge-page/244/">
                                        <img
                                            className={props.classes.bannerLogo + " " + props.classes.evalaiLogo}
                                            srcSet="/assets/images/evalai_logo.png"
                                            alt="EvalAI"
                                        />
                                    </Link>
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item className={props.classes.overview} xs={12} md={8} lg={8}>
                        <Typography variant="h4" align="left">
                            Overview
                        </Typography>

                        <Typography variant="subtitle1" className={props.classes.headings}  align="left">
                        TextVQA requires models to read and reason about text in an image to answer questions based on them.
                        In order to perform well on this task, models need to first detect and read text in the images.
                        Models then need to reason about this to answer the question.
                        </Typography>
                        <Typography variant="subtitle1" className={props.classes.headings} align="left">
                        Current state-of-the-art models fail to answer questions in TextVQA because they do not
                        have text reading and reasoning capabilities.
                        See the examples in the image to compare ground truth answers and
                        corresponding predictions by a state-of-the-art model.
                        </Typography>
                        <Typography variant="subtitle1" className={props.classes.headings} align="left">
                            Challenge
                            link: <Link
                                className={props.classes.evalAILink}
                                target="_blank"
                                href="https://evalai.cloudcv.org/web/challenges/challenge-page/551/">
                                https://evalai.cloudcv.org/web/challenges/challenge-page/551/</Link>
                        </Typography>
                    </Grid>
                    <Grid item className={props.classes.title} xs={12} md={4} lg={4}>
                        <img className={props.classes.teaserImage} srcSet="/assets/images/teaser.png" alt="Teaser"/>
                    </Grid>
                    <Grid
                        item
                        style={{ marginTop: 0 }}
                        className={props.classes.headings}
                        xs={12}
                    >
                        <Typography variant="h4" align="left">
                            Results and Analysis
                        </Typography>
                        <Typography
                            variant="subtitle1"
                            gutterBottom
                            align="left"
                        >
                            <iframe
                                width="560"
                                height="315"
                                src="https://www.youtube.com/embed/O5y8i3OYdo8"
                                frameBorder="0"
                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </Typography>
                    </Grid>

                    <Grid item style={{marginTop: 0}} className={props.classes.headings} xs={12}>
                        <Typography variant="h4" align="left">
                        Starter Code
                        </Typography>
                    </Grid>
                    <Grid item className={props.classes.versionNumber} xs={12} md={8} lg={8}>
                        <Typography variant="subtitle1" align="left">
                        The starter code for TextVQA challenge is available in <Link href="https://github.com/facebookresearch/pythia/">
                         Pythia
                        </Link>. Tutorial on how to submit a submission using <Link href="https://arxiv.org/pdf/1904.08920">LoRRA</Link> model is
                        available in <Link href="https://learnpythia.readthedocs.io/en/latest/tutorials/challenge.html">documentation</Link>. LoRRA
                            can be easily plugged to any VQA model to add text reading capabilities.

                        Use <Link href="https://github.com/facebookresearch/pythia/tree/project/m4c">project/m4c</Link> branch to use TextVQA SoTA model, M4C. Find
                        more details on how to use it
                        at <Link href="https://github.com/facebookresearch/pythia/tree/project/m4c/projects/M4C">this link</Link> and <Link href="https://arxiv.org/abs/1911.06258">read the paper</Link>.
                        </Typography>
                    </Grid>
                    <Grid item className={props.classes.headings} xs={12}>
                        <Typography variant="h4" align="left">
                        Prizes
                        </Typography>
                    </Grid>
                    <Grid item className={props.classes.versionNumber} xs={12} md={8} lg={8}>
                        <Typography variant="subtitle1" align="left">
                        We will be providing the winners of the second TextVQA 2020 challenge, the first TextCaps 2020 challenge (coming soon) and
                        the first joint TextVQA and TextCaps 2020 challenge (coming soon) <Link href="https://cloud.google.com/">
                                Google Cloud Platform (GCP)
                        </Link>  credits worth $10k total. We thank GCP for their generosity.
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
                                13 March 2020
                            </Typography> &mdash; Challenge announced.
                        </Typography>
                        <Typography variant="subtitle1" align="left">
                            <Typography component="span" className={props.classes.spanTypography} color="primary">
                                15 May 2020 (23:59:59 GMT)
                            </Typography> &mdash; Submission deadline for participants.
                        </Typography>
                        <Typography variant="subtitle1" align="left">
                            <Typography component="span" className={props.classes.spanTypography} color="primary">
                                June 14th 2020
                            </Typography> &mdash; Winners' announcment at the <Link href="https://visualqa.org/workshop.html">
                                Visual Question Answering and Dialog Workshop, CVPR 2020</Link>.
                        </Typography>
                        <br/>
                        <Typography variant="subtitle1" align="left">
                         Winners will be invited to give a short talk at the workshop. <br/>
                        For questions about the challenge,
                        join our <Link href="https://groups.google.com/forum/#!forum/textvqa">Google Group</Link> or
                        email us at <Link href="mailto:textvqa@fb.com"> textvqa@fb.com.
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
                        You can find a detailed description and the download links for the dataset at the <Link href="/dataset">download</Link> page.
                        </Typography>
                        <br/>
                        <Typography variant="subtitle1" align="left">
                        The challenge will be conducted on v0.5.1 of the <Link href="dataset">TextVQA dataset</Link>, which is
                        based on <Link href="https://storage.googleapis.com/openimages/web/index.html">OpenImages</Link>.
                        <br/>
                        TextVQA v0.5.1 contains 45,336 questions based on 28,408 images. The v0.5.1 training set contains 34,602 questions
                            based on 21,953 images from OpenImages' training set. The v0.5.1 validation set contains 5,000 questions based on
                            3,166 images from OpenImages' training set while the v0.5.1 test-std set contains 5,734 questions based on 3,289
                            images from OpenImages' test set.
                        </Typography>
                        <br/>
                        <Typography variant="subtitle1" align="left">
                        {/* <b>LoRRA</b> model provided in our paper uses OCR tokens extracted via Rosetta system used inside Facebook.
                        As the gap between upper bound of accuracy that can be achieved using OCR tokens from Rosetta
                        and LoRRA's accuracy is large, we provide these OCR tokens also as part of our dataset in belief
                        that these tokens will help in pushing state-of-the-art on TextVQA. */}
                        To allow easier adoption, we also provide OCR tokens extracted
                        using <Link href="https://code.fb.com/ai-research/rosetta-understanding-text-in-images-and-videos-with-machine-learning/">Rosetta</Link>.
                        Participants are free to use these OCR tokens
                        and/or use other systems/ways to read/understand
                        the text in the images.
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
                        Teams must register on <Link target="_blank" href="https://evalai.cloudcv.org/">EvalAI</Link> and create a team
                        for the challenge (<Link target="_blank" href="https://evalai.readthedocs.io/en/latest/participate.html">Quickstart</Link>)
                        <br/>
                            The challenge page is available at: <Link
                                className={props.classes.evalAILink}
                                target="_blank"
                                href="https://evalai.cloudcv.org/web/challenges/challenge-page/551/">
                            https://evalai.cloudcv.org/web/challenges/challenge-page/551/</Link>
                        </Typography>
                        <Typography variant="subtitle1" align="left">
                        Challenge has three phases:
                        </Typography>
                    </Grid>
                    <Grid item className={props.classes.versionNumber} style={{ width: '100%', overflowX: 'auto' }} xs={12} md={12} lg={12}>
                        <Table style={{minWidth: 700}}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>No.</TableCell>
                                    <TableCell><b>Phase</b></TableCell>
                                    <TableCell align="left"><b>Submissions</b></TableCell>
                                    <TableCell align="left"><b>Results</b></TableCell>
                                    <TableCell align="left"><b>Leaderboard</b></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>#1</TableCell>
                                    <TableCell><b>val</b></TableCell>
                                    <TableCell align="left">unlimited</TableCell>
                                    <TableCell align="left">immediate</TableCell>
                                    <TableCell align="left">none</TableCell>
                                </TableRow>
                            </TableBody>
                            <TableBody>
                                <TableRow>
                                    <TableCell>#2</TableCell>
                                    <TableCell><b>test-std</b></TableCell>
                                    <TableCell align="left">5 total combined with #3</TableCell>
                                    <TableCell align="left">immediate</TableCell>
                                    <TableCell align="left">public (optional)</TableCell>
                                </TableRow>
                            </TableBody>
                            <TableBody>
                                <TableRow>
                                    <TableCell>#3</TableCell>
                                    <TableCell><b>test-violating-standard-guidelines</b></TableCell>
                                    <TableCell align="left">5 total combined with #2</TableCell>
                                    <TableCell align="left">immediate</TableCell>
                                    <TableCell align="left">none</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                        <br/>
                    </Grid>
                    <Grid item className={props.classes.versionNumber} xs={12} md={12} lg={12}>

                        <Typography className={props.classes.headings} variant="subtitle1" align="left">
                        Please use the <b>validation</b> split of TextVQA 0.5.1 for the <b>val</b> phase and the <b>test</b> split
                        for the <b>test-std</b> phase.
                        While answers are already provided for the <b>validation</b> set, this phase is useful for sanity checking the result format
                        without wasting submissions in the other phases. For the <b>test-std</b> phase,
                        the results must be submitted on the full set.
                        Submissions to <b>test-std</b> phase are considered entries into the challenge.
                        By default, the submissions for the <b>test-std</b> phase are private but can be voluntarily
                        released to the public leaderboard, with a limit of one public leaderboard entry per team.
                        At the end of the challenge, the entry with best accuracy from each team will
                        be made public automatically and will be used for the challenge rankings.
                        If you make an entry to <b>test-std</b> and do not want to be considered for the challenge,
                        please contact us at <Link href="mailto:textvqa@fb.com">
                            textvqa@fb.com
                        </Link> We will contact
                        the winning team to voluntarily present at the <Link href="https://visualqa.org/workshop.html">
                        Visual Question Answering and Dialog Workshop, CVPR 2020</Link>. Following guidelines must be followed
                        for making a submission to <b>test-std</b>.

                        <b>Note:</b> Teams submitting to the challenge are required to submit a up-to 2 page abstract after the challenge.
                        A detailed report on challenge analysis citing these abstracts will be provided later
                        </Typography>

                        <List
                            dense={false}
                        >
                            <ListItem>
                                <ListItemText>
                                    1. Submission <b>should not use ensembles</b> of any form for making predictions <i>i.e.</i> it needs
                                    to be a single model.
                                </ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText>
                                    2. Submission <b>should not use ground-truth OCRs</b> or any kind of human-annotated text tokens for training or for making predictions.
                                    Note that submissions are allowed to use any kind of automatic OCR system.
                                </ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText>
                                    3. Total number of submissions from a participant team on <b>test-std</b> and <b>test-violating-standard-guidelines</b> (more details on this new phase below)
                                    combined should not exceed <b>5</b>.
                                </ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText>
                                    4. Only one submission can be made public on <b>test-std</b> leaderboard by one participant team.
                                </ListItemText>
                            </ListItem>
                        </List>

                        <Typography className={props.classes.headings} variant="subtitle1" align="left">

                        <b>NEW:</b> This year we have a new phase called <b>test-violating-standard-guidelines</b> which
                        participants can to submit for submissions that violate above guidelines.
                        This phase doesn't have a leaderboard and submissions on this phase will remain private.
                        The total number of submissions for <b>test-std</b> and <b>test-violating-standard-guidelines</b> combined should not exceed 5.
                        </Typography>
                        <br/>
                        <Typography variant="subtitle1" align="left">
                        It is not acceptable to create multiple accounts for a single team in order to bypass
                        the limits on number of submissions. A person can only be part of one team.
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
                            Abstract Submission Guidelines
                        </Typography>
                    </Grid>
                    <Grid item className={props.classes.versionNumber} xs={12} md={12} lg={12}>
                        <Typography variant="subtitle1" align="left">
                            All participants of the TextVQA and TextCaps Challenges can submit a
                            short abstract (max 2 pages in CVPR camera ready format, references excluded) providing details of their submission.
                            To be considered as challenge winner the submission of an abstract is required.
                            The abstract must be submitted by <b>Wednesday, May 20th, 4pm PDT.</b> Submit
                            by email to textvqa@fb.com.
                            <List dense={false}>
                                <ListItem>
                                    <ListItemText>
                                    1. The submission is NOT blind.
                                    </ListItemText>
                                </ListItem>
                                <ListItem>
                                    <ListItemText>
                                    2. Please include all team members/authors names and their affiliation.
                                    </ListItemText>
                                </ListItem>
                                <ListItem>
                                    <ListItemText>
                                    3. Please include the team name used on the challenge server so we can correctly identify your results.
                                    </ListItemText>
                                </ListItem>
                                <ListItem>
                                    <ListItemText>
                                    4. Please let us know in the email if you are fine that your abstract PDF will be on the web page of the challenge.
                                    </ListItemText>
                                </ListItem>
                            </List>
                            Recommended content includes:

                            <List dense={false}>
                                <ListItem>
                                    <ListItemText>
                                    1. List of all the data sources which were used for training
                                    </ListItemText>
                                </ListItem>
                                <ListItem>
                                    <ListItemText>
                                    2. Experimental setup including training details, what pretraining was used (if any), how OCR tokens were incorporated
                                    </ListItemText>
                                </ListItem>
                                <ListItem>
                                    <ListItemText>
                                    3. A table with ablations (on validation set)
                                    </ListItemText>
                                </ListItem>
                                <ListItem>
                                    <ListItemText>
                                    4. Discussion on the insights you gained.
                                    </ListItemText>
                                </ListItem>
                            </List>
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
                            where <b>question_id</b> is a question's unique id
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
                    <Grid id="evaluation" item className={props.classes.headings} xs={12}>
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
                    <Grid id="related" item className={props.classes.headings} xs={12}>
                        <Typography variant="h4" align="left">
                            Related Datasets
                        </Typography>
                    </Grid>
                    <Grid item className={props.classes.versionNumber} xs={12} md={12} lg={12}>
                        <Typography variant="subtitle1" align="left">
                            Following is a list of datasets related or similar to TextVQA. We encourage you to evaluate your approach on these
                            as well, and/or consider using it as an additional source of training data. <br/>
                            1. <Link href={sceneTextVQALink}>Scene-Text VQA</Link> is a concurrently released dataset that also contains questions
                            about text in images. Scene-Text VQA is available in M4C branch of Pythia. <br/>
                            2. <Link href={ocrVQALink}>OCR-VQA</Link> is another TextVQA dataset which provides questions inquiring about
                            title, author, edition, year and genre of the book and corresponding ground-truth answer. OCR-VQA is also available in M4c branch of Pythia. <br/>
                            3. <Link href={textCapsLink}>TextCaps</Link> dataset is based on task of image captioning with reading comprehension. The captions require reading text in the image and
                            are collected on the same images as TextVQA.
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
                        <People lgSize={3} people={challengePeople[index]["2020"]}/>
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
                                srcSet="/assets/images/fair_logo.png"
                                alt="Facebook Artificial Intelligence Research"
                            />
                        </Grid>
                        <Grid item xs={3} md={3} lg={2}>
                            <img
                                className={props.classes.bannerLogo}
                                srcSet="/assets/images/gt_logo.png"
                                alt="Georgia Tech"
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider />
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

export {
    styles,
    Completionist,
    renderer
};