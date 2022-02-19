// Copyright (c) Facebook, Inc. and its affiliates.
import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';

import { ReactiveList } from '@appbaseio/reactivesearch';
import Grid from '@material-ui/core/Grid'

import Polygon from './Polygon';
import SampleDialog from './SampleDialog';
import { withRouter } from 'react-router-dom';

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

class BannerTextOCR extends Component {
    seed = Math.round(Math.random() * 10000);
    state = {
        render: 0,
        currentDialog: -1
    };
    vars = {
        nChunks: null,
        originalChunks: [],
        originalIds: [],
        originalLen: 0,
        currentResult: null,
        currentBoxes: null
    };

    handleDialogOpen = (data) => {
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
        let uniqueId = "question_id";

        if (this.props.match.params.type === "textcaps") {
            uniqueId = "image_id";
        }

        const currentIds = [];

        arr.forEach((element) => {
            currentIds.push(element[uniqueId]);
        });

        if (arr.length === 0) {
            isNewSearch = true
        } else if (this.vars.originalChunks.length > 0 &&
            this.vars.originalChunks[0].length > 0 &&
            (this.vars.originalChunks[0][0][uniqueId] !== arr[0][uniqueId] ||
                JSON.stringify(this.vars.originalIds) !==
                JSON.stringify(currentIds.slice(0, this.vars.originalLen)))
        ) {
            isNewSearch = true;
        }
        if (this.vars.nChunks !== nChunks || isNewSearch) {
            this.vars.nChunks = nChunks;
            this.vars.originalChunks = [];
            this.vars.originalLen = 0;
            this.seed = Math.round(Math.random() * 10000);

            for (let i = 0; i < nChunks; i++) {
                this.vars.originalChunks.push([]);
            }
        }

        let gap = Math.floor((arr.length - this.vars.originalLen) / nChunks);
        let index = 0;
        const chunks = this.vars.originalChunks;

        if (gap === 0) {
            gap = 1;
        }

        for (let i = this.vars.originalLen; i < arr.length; i += gap) {
            if (index === this.vars.nChunks) {
                index = Math.floor(Math.random() * this.vars.nChunks);
            }
            chunks[index] = chunks[index].concat(arr.slice(i, i + gap));
            index++;
        }

        this.vars.originalChunks = chunks;
        this.vars.originalLen = arr.length;
        this.vars.nChunks = nChunks;
        this.vars.originalIds = currentIds;

        return chunks;
    }

    renderCardComponents = (results) => {
        if (results.error) {
            return (
                <div> Some error happened! </div>
            );
        }
        console.log(results);
        if (results.length === 0) {
            return "";
        }

        const finalResults = [...results.data, ...results.streamData];
        // const finalResults = [...results];
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


    renderCardComponent = (result, cardIdx) => {
        const boxes = []
        for (const idx in result.ocr_info) {
            if (result.ocr_info[idx].word === ".") {
                continue;
            }
            const box = {
                coords: result.ocr_info[idx].points,
                word: result.ocr_info[idx].word
            };
            boxes.push(box)
        }
        console.log(boxes)
        return (
            <div
                key={cardIdx + this.seed}
                className={this.props.classes.gridItem}
                onClick={() => this.handleDialogOpen({
                    currentDialog: cardIdx + this.seed,
                    currentBoxes: boxes,
                    currentResult: result,
                })}
            >
                <Card
                    key={cardIdx}
                    className={this.props.classes.card}
                >
                    <Polygon
                        showBoxes={this.props.showOCRBoxes}
                        imageUrl={result.flickr_300k_url}
                        boxes={boxes}
                        rotation={result.rotation}
                    />
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
                {resultInfo.totalResults} results found in {resultInfo.time}ms.<br />
                For more information on how to use search, please see "Help" in navigation bar.<br />
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
                No results found.<br />
                For more information on how to use search, please see "Help" in navigation bar.<br />
            </Typography>
        );
    }
    render() {
        const { type } = this.props.match.params;
        let dataField = "question";

        if (type === "textcaps") {
            dataField = "captions";
        }

        return (
            <Grid container direction="row" justify="center" alignItems="center">
                <ReactiveList
                    componentId="result"
                    dataField={dataField}
                    title="Results"
                    from={0}
                    size={this.props.size || 25}
                    renderResultStats={this.formatResultsStats}
                    pagination={this.props.pagination || false}
                    showResultStats={this.props.showResultStats}
                    loader={this.props.loader}
                    renderNoResults={this.noResultStats}
                    react={this.props.reactValues}
                    render={this.renderCardComponents}
                    style={this.props.style || {}}
                />
                {this.props.dialogEnabled ?
                    <SampleDialog
                        maxAnswer=""
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

export default withWidth()(withStyles(styles)(withRouter(BannerTextOCR)));
