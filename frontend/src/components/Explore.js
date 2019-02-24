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

    handleCheckboxChange = name => event => {
        this.setState({ [name]: event.target.checked });
    };

    handleMenuButtonClick = (event) => {
        this.setState({ anchorEl: event.currentTarget });
    }

    handleMenuClose = () => {
        this.setState({ anchorEl: null });
    }

    render() {
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
            >
                <Grid item xs={12} md={6} lg={4}>
                    <CategorySearch
                        componentId="searchbox"
                        dataField="question"
                        categoryField="question"
                        placeholder="Search for questions"
                        style={{
                            padding: "5px"
                        }}
                    />
                </Grid>
                <Grid item xs={12} md={2} lg={1}>
                    <MultiDropdownList
                        componentId="set_name"
                        dataField="set_name"
                        placeholder="Choose set"
                        showSearch={false}
                    />
                </Grid>
                <Grid item xs={12} md={2} lg={2}>
                    <MultiDropdownList
                        componentId="image_classes"
                        dataField="image_classes"
                        placeholder="Choose classes"
                        showSearch={false}
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
                        <MenuItem>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={this.state.showQuestions}
                                        onChange={this.handleCheckboxChange('showQuestions')}
                                        value="showQuestions"
                                    />
                                }
                                label="Show questions">
                            </FormControlLabel>
                        </MenuItem>
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
                        </MenuItem>
                    </Menu>
                </Grid>
                <Grid item xs={12} md={6} lg={2}>
                    <CategorySearch
                        componentId="ocr_tokens"
                        dataField="ocr_tokens"
                        categoryField="ocr_tokens"
                        placeholder="Search for OCR tokens"
                        style={{
                            padding: "5px"
                        }}
                    />
                </Grid>
                <Grid item xs={12} md={6} lg={2}>
                    <CategorySearch
                        componentId="answers"
                        dataField="answers"
                        categoryField="answers"
                        placeholder="Search for Answers"
                        style={{
                            padding: "5px"
                        }}
                    />
                </Grid>
                <Banner
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
                />
            </Grid>
        </ReactiveBase>
      );
    }
}

export default withStyles(styles)(Explore);
