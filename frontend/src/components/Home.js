// Copyright (c) Facebook, Inc. and its affiliates.
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import TextVQAContent from './content/TextVQAContent';
import TextCapsContent from './content/TextCapsContent';
import TextOCRContent from './content/TextOCRContent';
import { getWebsiteType } from '../utils';

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
        height: '50vh'
    },
    people: {
        margin: '0 auto',
        marginTop: '1.5em'
    },
    root: {
        // flexGrow: 1,
        // marginTop: '50px'
    },
    divider: {
        color: '#888',
        width: '100%'
    },
    gridItem: {
        padding: theme.spacing.unit * 1.5
    },
    sectionHeader: {
        marginTop: '0.15em'
    },
    ulList: {
        margin: '0'
    },
    container: {
        padding: theme.spacing.unit * 2,
    },
    bannerLogo: {
        width: '100%'
    },
    spanInlineBlock: {
        display: 'inline'
    },
    greenColor: {
        color: theme.palette.primary.main
    },
    hrefGreenColor: {
        '& a': {
            color: theme.palette.primary.main,
            textDecoration: 'none'
        }
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
    citationPre: {
        backgroundColor: '#eee',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-all',
        padding: '1em'
    },
    breakWord: {
        wordBreak: 'break-all',
        whiteSpace: 'pre-wrap'
    }
});


class Home extends React.Component {
    state = {
        checked: false
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


    render() {
        const type = getWebsiteType(this.props);
        let Content = withStyles(styles)(TextVQAContent);

        if (type === "textcaps") {
            Content = withStyles(styles)(TextCapsContent);
        } else if (type == "textocr") {
            Content = withStyles(styles)(TextOCRContent);
        }
        return <Content/>;
    }
}

Home.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(Home));