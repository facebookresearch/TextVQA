// Copyright (c) Facebook, Inc. and its affiliates.
import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';

import { ReactiveList } from '@appbaseio/reactivesearch';
import Grid from '@material-ui/core/Grid'

import BoundingBox from './BoundingBox';
import SampleDialog from './SampleDialog';

const styles = theme => ({
    gridItem: {
        padding: theme.spacing.unit * 0.5,
        position: 'relative',
        width: '100%',
        display: 'inline-block'
    },
    cardContent: {
        paddingBottom: '4px !important'
    },
    card: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center'
    }
});

class Banner extends Component {
    seed = Math.round(Math.random() * 10000);
    state = {
        render: 0,
        currentDialog: -1
    };
    vars = {
        nChunks: null,
        originalChunks: [],
        originalLen: 0,
        currentResult: null,
        currentMaxAnswer: null,
        currentBoxes: null
    };

    handleDialogOpen = (data) => {
        this.vars.currentMaxAnswer = data['currentMaxAnswer'];
        this.vars.currentBoxes = data['currentBoxes'];
        this.vars.currentResult = data['currentResult'];
        this.setState({
            currentDialog: data['currentDialog']
        });
    }
    handleDialogClose = () => {
        this.setState({
            currentDialog: -1
        });
    }

    getWidthForColumn = () => {
        // NOTE: Keep this is in this order.
        // Smallest key should come first
        const mapping = {
            'xs': '100',
            'sm': '50',
            'md': '33',
            'lg': '25'
        };

        let currentWidth = '100';
        Object.keys(mapping).forEach((key) => {
            if (isWidthUp(key, this.props.width)) {
                currentWidth = mapping[key];
            }
        });

        return currentWidth;
    }

    chunkArray = (arr, nChunks) => {
        let isNewSearch = false;
        if (arr.length === 0) {
            isNewSearch = true
        } else if (this.vars.originalChunks.length > 0 &&
            this.vars.originalChunks[0].length > 0 &&
            this.vars.originalChunks[0][0].question_id !== arr[0].question_id) {
                isNewSearch = true;
        }

        if (this.vars.nChunks !== nChunks || isNewSearch) {
            this.vars.nChunks = nChunks;
            this.vars.originalChunks = [];
            this.vars.originalLen = 0;
            this.seed = Math.round(Math.random() * 10000);

            for(let i = 0; i < nChunks; i++) {
                this.vars.originalChunks.push([]);
            }
        }

        const gap = Math.ceil((arr.length - this.vars.originalLen) / nChunks);
        let index = 0;
        const chunks = this.vars.originalChunks;

        for(let i = this.vars.originalLen; i < arr.length; i += gap) {
            chunks[index] = chunks[index].concat(arr.slice(i, i + gap));
            index++;
        }

        this.vars.originalChunks = chunks;
        this.vars.originalLen = arr.length;
        this.vars.nChunks = nChunks;

        return chunks;
    }

    renderCardComponents = (results) => {
        if (results.length === 0) {
            return "";
        }

        const finalResults = [...results.results, ...results.streamResults];
        const colWidth = this.getWidthForColumn();
        const numChunks = Math.floor(100 / colWidth);
        const chunks = this.chunkArray(finalResults, numChunks);

        const cardChunks = chunks.map((chunk, idx) => {
            return chunk.map((result, idx) => {
                return this.renderCardComponent(result, idx);
            })
        });

        const containerChunks = cardChunks.map((chunk, idx) => {
            return (
                <div
                    key={idx + this.seed}
                    style={{
                        width: colWidth + '%',
                        float: 'left'
                    }}
                >
                    {chunk}
                </div>
            )

        });

        return (
            <div>
                {containerChunks}
            </div>
        );
    }

    getMaxAnswer = (answers) => {
        const counter = {}
        if (!answers) {
            return '';
        }
        let maxWord = answers[0];
        let maxCount = 1;

        for(const idx in answers) {
            const currentAnswer = answers[idx];
            if (counter[currentAnswer]) {
                counter[currentAnswer] += 1;
            } else {
                counter[currentAnswer] = 1;
            }

            if (counter[currentAnswer] > maxCount) {
                maxCount = counter[currentAnswer];
                maxWord = currentAnswer;
            }
        }

        return maxWord;
    }

    renderCardComponent = (result, cardIdx) => {
        const boxes = []

        for(const idx in result.ocr_info) {
            const ocrInfo = result.ocr_info[idx];
            const x1 = ocrInfo.bounding_box.top_left_x;
            const y1 = ocrInfo.bounding_box.top_left_y;
            const width = ocrInfo.bounding_box.width;
            const height = ocrInfo.bounding_box.height;
            const box =  {
                coords: [x1, y1, width, height],
                rotation: ocrInfo.bounding_box.rotation,
                word: ocrInfo.word
            };
            boxes.push(box)
        }

        const maxAnswer = this.getMaxAnswer(result.answers);
        return (
            <div
                key={cardIdx + this.seed}
                className={this.props.classes.gridItem}
                onClick={() => this.handleDialogOpen({
                    currentDialog: cardIdx + this.seed,
                    currentBoxes: boxes,
                    currentResult: result,
                    currentMaxAnswer: maxAnswer
                })}
            >
                <Card
                    key={cardIdx}
                    className={this.props.classes.card}
                >
                    <BoundingBox
                        showBoxes={this.props.showOCRBoxes}
                        imageUrl={result.flickr_300k_url}
                        boxes={boxes}
                        rotation={result.rotation}
                    />
                    <CardContent className={this.props.classes.cardContent}>
                        {
                            this.props.showQuestions ?
                            <Typography variant="subtitle1">
                                {result.question}
                            </Typography> : ''
                        }
                        {
                            this.props.showAnswers && maxAnswer.length > 0 ?
                            <Typography variant="caption">
                                {maxAnswer}
                            </Typography> : ''
                        }
                    </CardContent>
                </Card>
            </div>
        )
    }
    formatResultsStats = (resultInfo) => {
        return (
            <Typography
                className={this.props.classes.gridItem}
                component="span"
                align="center"
            >
                {resultInfo.totalResults} results found in {resultInfo.time}ms.<br/>
                For more information on how to use search, please see "Help" in navigation bar.<br/>
            </Typography>
        );
    }

    noResultStats = (resultInfo) => {
        return (
            <Typography
                className={this.props.classes.gridItem}
                component="span"
                align="center"
            >
                No results found.<br/>
                For more information on how to use search, please see "Help" in navigation bar.<br/>
            </Typography>
        );
    }
    render() {
        return (
            <Grid container direction="row" justify="center" alignItems="center">
                <ReactiveList
                    componentId="result"
                    dataField="question"
                    title="Results"
                    from={0}
                    size={this.props.size || 25}
                    renderResultStats={this.formatResultsStats}
                    pagination={this.props.pagination || false}
                    showResultStats={this.props.showResultStats}
                    loader={this.props.loader}
                    renderNoResults={this.noResultStats}
                    react={this.props.reactValues}
                    renderAllData={this.renderCardComponents}
                    style={this.props.style || {}}
                />
                {this.props.dialogEnabled ?
                    <SampleDialog
                        maxAnswer={this.vars.currentMaxAnswer}
                        result={this.vars.currentResult}
                        showOCRBoxes={this.props.showOCRBoxes}
                        boxes={this.vars.currentBoxes}
                        open={this.state.currentDialog !== -1}
                        handleClose={this.handleDialogClose}
                    /> : ''
                }
            </Grid>
        );
    }
}

export default withWidth()(withStyles(styles)(Banner));
