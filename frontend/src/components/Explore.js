// Copyright (c) Facebook, Inc. and its affiliates.
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {
    ReactiveBase, CategorySearch, MultiDropdownList
} from '@appbaseio/reactivesearch';
import Grid from '@material-ui/core/Grid'

import * as config from '../frontend_config.json';
import Banner from './Banner';
import { withRouter } from 'react-router';
import BannerTextOCR from './BannerTextOCR';

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    optionsMenuButton: {
        width: '100%'
    }
});

class Explore extends Component {
    seed = Math.round(Math.random() * 10000);
    state = {
        showOCRBoxes: true,
        showQuestions: true,
        showAnswers: true,
        anchorEl: null
    };

    reactValues = {
        and: [
            "searchbox", "set_name", "image_classes",
            "ocr_tokens", "answers"
        ]
    }

    replaceBody = (body) => {
        const { type } = this.props.match.params;
        body = body.join('\n');
        body = body.replace('"field":"set_name"', '"field":"set_name"');
        body = body.replace('"field":"image_classes"', '"field":"image_classes"');
        if (type === "textcaps") {
            body = body.replace('"field":"captions"', '"field":"captions"');
        } else if (type == "textcaps") {
            body = body.replace('"field":"question"', '"field":"question"');
            body = body.replace('"field":"answers"', '"field":"answers"');
        }
        body = body.replace('"field":"ocr_tokens"', '"field":"ocr_tokens"');
        return body;
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
        body = this.replaceBody(body);
        query.body = body;
        return query;
    }

    handleCheckboxChange = name => event => {
        this.setState({ [name]: event.target.checked });
    };

    handleMenuButtonClick = (event) => {
        this.setState({ anchorEl: event.currentTarget });
    }

    handleMenuClose = () => {
        this.setState({ anchorEl: null });
    }

    getReactArray = (item) => {
        const { type } = this.props.match.params;

        let array = [];

        if (type === "textocr") {
            array = ["set_name", "image_classes", "ocr_tokens"];
        } else if (type === "textcaps") {
            array = ["set_name", "image_classes", "ocr_tokens", "captions"];
        } else {
            array = ["set_name", "image_classes", "ocr_tokens", "question", "answer"];
        }

        const index = array.indexOf(item);
        if (index !== -1) {
            array.splice(index, 1);
        }
        return array;
    }

    render() {
        const { type } = this.props.match.params;
        let mainDataField = "question";
        let mainPlaceHolder = "Search in the questions";
        let isTextVQA = true;
        let isTextOCR = false;
        let showQuestionsPlaceholder = "Show Questions";

        if (type === "textcaps") {
            mainDataField = "captions";
            mainPlaceHolder = "Search in the captions";
            isTextVQA = false;
            showQuestionsPlaceholder = "Show Captions";
            config.index_name = "textcaps";
        }

        let BannerClass = Banner;
        if (type === "textocr") {
            this.reactValues.and.pop();
            config.index_name = "textocr";
            BannerClass = BannerTextOCR;
            isTextVQA = false;
            isTextOCR = true;
        }

        return (
          <ReactiveBase
            app={config.index_name}
            url={config.server_url}
            transformRequest={this.updateQuery}
          >
            <Grid
                container
                direction="row"
                className={this.props.classes.root}
                justify="center"
                alignItems="center"
            >   {
                    !isTextOCR ?
                    <Grid item xs={12} md={6} lg={4}>
                        <CategorySearch
                            componentId="searchbox"
                            dataField={mainDataField}
                            autosuggest={false}
                            categoryField={mainDataField}
                            placeholder={mainPlaceHolder}
                            debounce={1000}
                            style={{
                                padding: "5px"
                            }}
                            react={{ and: this.getReactArray(mainDataField)}}
                            />
                    </Grid> : ""
                }
                <Grid item xs={12} md={2} lg={1}>
                    <MultiDropdownList
                        componentId="set_name"
                        dataField="set_name"
                        showCount={false}
                        placeholder="Choose set"
                        showSearch={false}
                        react={{ and: this.getReactArray("set_name")}}
                    />
                </Grid>
                <Grid item xs={12} md={2} lg={2}>
                    <MultiDropdownList
                        componentId="image_classes"
                        dataField="image_classes"
                        placeholder="Choose classes"
                        showSearch={false}
                        react={{ and: this.getReactArray("image_classes")}}
                    />
                </Grid>
                <Grid item xs={12} md={2} lg={1}>
                    <Button
                        variant="contained"
                        color="primary"
                        className={this.props.classes.optionsMenuButton}
                        aria-owns={this.state.anchorEl ? 'simple-menu' : undefined}
                        aria-haspopup="true"
                        onClick={this.handleMenuButtonClick}
                    >
                        Options
                    </Button>
                    <Menu
                        anchorEl={this.state.anchorEl}
                        open={Boolean(this.state.anchorEl)}
                        onClose={this.handleMenuClose}
                    >
                        <MenuItem>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={this.state.showOCRBoxes}
                                        onChange={this.handleCheckboxChange('showOCRBoxes')}
                                        value="showOCRBoxes"
                                    />
                                }
                                label="Show OCR boxes">
                            </FormControlLabel>
                        </MenuItem>
                        {
                            !isTextOCR ?
                            <MenuItem>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                        checked={this.state.showQuestions}
                                        onChange={this.handleCheckboxChange('showQuestions')}
                                        value="showQuestions"
                                        />
                                    }
                                    label={showQuestionsPlaceholder}>
                                </FormControlLabel>
                            </MenuItem> : ""
                        }
                        {
                            isTextVQA ?
                            <MenuItem>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                        checked={this.state.showAnswers}
                                        onChange={this.handleCheckboxChange('showAnswers')}
                                        value="showAnswers"
                                        />
                                    }
                                    label="Show answers">
                                </FormControlLabel>
                            </MenuItem> : ""
                        }
                    </Menu>
                </Grid>
                <Grid item xs={12} md={6} lg={2}>
                    <CategorySearch
                        componentId="ocr_tokens"
                        dataField="ocr_tokens"
                        categoryField="ocr_tokens"
                        debounce={1400}
                        placeholder="Search for OCR tokens"
                        style={{
                            padding: "5px"
                        }}
                        react={{ and: this.getReactArray("ocr_tokens")}}

                    />
                </Grid>
                {
                    isTextVQA ?
                    <Grid item xs={12} md={6} lg={2}>
                        <CategorySearch
                            componentId="answers"
                            dataField="answers"
                            categoryField="answers"
                            placeholder="Search for Answers"
                            debounce={1400}
                            style={{
                                padding: "5px"
                            }}
                            react={{ and: this.getReactArray("answers")}}
                            />
                    </Grid> : ""
                }
                <BannerClass
                    showOCRBoxes={this.state.showOCRBoxes}
                    showAnswers={this.state.showAnswers}
                    showQuestions={this.state.showQuestions}
                    reactValues={this.reactValues}
                    showResultStats={true}
                    pagination={false}
                    size={25}
                    style={{
                        "width": "90%",
                        "textAlign": "center"
                    }}
                    dialogEnabled={true}
                />
            </Grid>
        </ReactiveBase>
      );
    }
}

export default withStyles(styles)(withRouter(Explore));
