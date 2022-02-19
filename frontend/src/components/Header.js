// Copyright (c) Facebook, Inc. and its affiliates.
import React from 'react';
import PropTypes from 'prop-types'

import { Route, withRouter } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuList from '@material-ui/core/MenuList';
import IconButton from '@material-ui/core/IconButton';
import Explore from '@material-ui/icons/Explore';
import CloudDownload from '@material-ui/icons/CloudDownload';
import Help from '@material-ui/icons/Help';
import Equalizer from '@material-ui/icons/Equalizer';
import Description from '@material-ui/icons/Description';
import MoreVert from '@material-ui/icons/MoreVert';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Code from '@material-ui/icons/Code';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { withStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import theme from '../styles';

import ExploreHelp from './ExploreHelp';
import { List, ListItem, Collapse, Typography } from '@material-ui/core';
import { getWebsiteType } from '../utils';

const CURRENT_YEAR = 2021;

const styles = {
    root: {
      width: '100%',
      flexGrow: 1
    },
    grow: {
        flexGrow: 1,
    },
    buttonLink: {
        color: theme['palette']['primary']['contrastText'],
        textDecoration: 'none'
    },
    buttonsSide: {
        textAlign: 'right'
    },
    logo: {
        height: '3.6em',
        verticalAlign: 'middle',
        marginBottom: '-1.0em',
        marginLeft: '-0.2em',
        [theme.breakpoints.down('sm')]: {
            height: '2.5em'
        }
    },
    logoText: {
        fontSize: '1.0em',
        fontWeight: 'bold',
        paddingTop: '1.4em',
        lineHeight: '2',
        marginLeft: '-0.2em',
        paddingRight: '0.5em',
        verticalAlign: 'sub',
        [theme.breakpoints.down('sm')]: {
            fontSize: '1em'
        }

    },
    leftIcon: {
        marginRight: theme.spacing.unit
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    activeLink: {
        borderBottom: theme['palette']['primary']['contrastText'] + ' dotted 3px',
        marginTop: '-0.2em'
    },
    inactiveLink: {
        borderBottom: 'transparent dotted 2px',
        marginTop: '-0.2em'
    },
    otherDatasetIcon: {
        height: '3em',
        marginBottom: '-1.5em',
        marginTop: '-1em',
        verticalAlign: 'middle',
        [theme.breakpoints.down('sm')]: {
            marginLeft: '-0.75em'
        }
    }
};

const mappings = {
    urlPrefix: {
        textvqa: '/',
        textcaps: '/textcaps/',
        textocr: '/textocr/'
    },
    fullText: {
        textvqa: 'TextVQA',
        textcaps: 'TextCaps',
        textocr: 'TextOCR'
    },
    logoOnlyWhiteUrl: {
        textvqa: '/assets/images/textvqa_logo_white.svg',
        textcaps: '/assets/images/textcaps_logo_white.svg',
        textocr: '/assets/images/textocr/logo_only_white.svg'
    },
    logoOnlyUrl: {
        textvqa: '/assets/images/textvqa_logo.svg',
        textcaps: '/assets/images/textcaps_logo.svg',
        textocr: '/assets/images/textocr/logo_only.svg'
    },
    uniqueKey: {
        textvqa: 0,
        textcaps: 1,
        textocr: 2,
    },
    paperLink: {
        textvqa: 'https://openaccess.thecvf.com/content_CVPR_2019/html/Singh_Towards_VQA_Models_That_Can_Read_CVPR_2019_paper.html',
        textcaps: 'https://arxiv.org/abs/2003.12462',
        textocr: 'https://openaccess.thecvf.com/content/CVPR2021/html/Singh_TextOCR_Towards_Large-Scale_End-to-End_Reasoning_for_Arbitrary-Shaped_Scene_Text_CVPR_2021_paper.html',
    },
    codeLink: {
        textvqa: 'https://github.com/facebookresearch/mmf',
        textcaps: 'https://github.com/facebookresearch/mmf/tree/project/m4c/projects/M4C_Captioner',
        textocr: '/textocr/code',
    }
};

const allWebsites = ['textvqa', 'textcaps', 'textocr'];

class Header extends React.Component {
    state = {
        mobileMoreAnchorEl: null,
        challengeAnchorEl: null,
        dialogOpen: false
    };

    handleExploreOpen = () => {
        this.setState({
            dialogOpen: true
        });
    }

    handleExploreClose = () => {
        this.setState({
            dialogOpen: false
        });
    }

    handleMobileMenuOpen = event => {
        this.setState({ mobileMoreAnchorEl: event.currentTarget, challengeAnchorEl: event.currentTarget });
    };

    handleMobileMenuClose = (event) => {
        event.stopPropagation();
        this.setState({ mobileMoreAnchorEl: null, challengeAnchorEl: null });
    };

    getYears = () => {
        const isTextVQA = this.props.location.pathname.indexOf('textcaps') === -1;
        let year = 2019;
        if (!isTextVQA) {
            year = 2020;
        }

        const years = [];

        for(let i = year; i <= CURRENT_YEAR; i++) {
            years.push(i);
        }

        return years.reverse();
    }

    handleChallengeMenuOpen = event => {
        this.setState({ challengeAnchorEl: event.currentTarget });
    }

    render() {
        const { classes } = this.props;
        const { mobileMoreAnchorEl, challengeAnchorEl } = this.state;
        const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
        const isChallengeMenuOpen = Boolean(challengeAnchorEl);
        const websiteType = getWebsiteType(this.props);
        const isTextVQA = websiteType === "textvqa";
        const isTextOCR = websiteType === "textocr";
        const pathSplits = this.props.location.pathname.split("/");
        const challengeYear = parseInt(
            pathSplits[pathSplits.length - 1].indexOf('20') === -1
            ? CURRENT_YEAR : pathSplits[pathSplits.length - 1], 10);

        const years = this.getYears();

        const helpMobileMenuItem = (
            <MenuItem onClick={this.handleMobileMenuClose}>
                <Link
                    underline="none"
                    className={[classes.buttonLink, classes.buttonsSide].join(' ')}
                    onClick={this.handleExploreOpen}
                >
                    <Button disableRipple={true} disableFocusRipple={true} color="default">
                        <Help className={classes.leftIcon} />
                        Help
                    </Button>
                </Link>
            </MenuItem>
        );

        const textVQAChallengeMenuList = (
            <ClickAwayListener onClickAway={this.handleMobileMenuClose}>
                <MenuList>
                    {
                        years.map(year =>
                            <MenuItem
                                component="a"
                                data-no-link={true}
                                href={
                                    (mappings.urlPrefix[websiteType]) + "challenge/"
                                    + (challengeYear === year ? "" : year)
                                }
                                key={year}
                                width="100"
                                selected={challengeYear === year}
                                onClick={this.handleMobileMenuClose}
                            >
                                {year}
                            </MenuItem>
                        )
                    }
                </MenuList>

            </ClickAwayListener>
        )

        const textVQAChallengeMenu = (
            <Menu
                anchorEl={challengeAnchorEl}
                open={isChallengeMenuOpen}
                id="challenge-menu"
                onClose={this.handleMobileMenuClose}
                MenuListProps={{ onMouseLeave: this.handleMobileMenuClose }}
                getContentAnchorEl={null}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
                {textVQAChallengeMenuList}
            </Menu>
        );

        const textVQAChallengeMenuMobile = (
            <Collapse in={true}>
                <List>
                    {
                        years.map(year =>
                            <ListItem
                                component="a"
                                data-no-link={true}
                                href={
                                    (mappings.urlPrefix[websiteType]) + "challenge/"
                                    + (challengeYear === year ? "" : year)
                                }
                                key={year}
                                className={classes.buttonsSide}
                                width="100"
                            >
                                <Button width="100" align="right" disableRipple={true} disableFocusRipple={true} color="default">
                                    <Typography width="100" align="right">{year}</Typography>
                                </Button>
                            </ListItem>
                        )
                    }
                </List>
            </Collapse>

        );



        const exploreHelpMenu = (
            <div>
                <Link
                    underline="none"
                    className={[classes.buttonLink, classes.buttonsSide].join(' ')}
                    onClick={this.handleExploreOpen}
                >
                    <Button disableRipple={true} disableFocusRipple={true} color="inherit">
                        <Help className={classes.leftIcon} />
                        Help
                    </Button>
                </Link>
                <ExploreHelp
                    open={this.state.dialogOpen}
                    handleClose={this.handleExploreClose}
                />

            </div>
        )
        const classesGrowButton = [classes.buttonLink, classes.grow, classes.inactiveLink].join(' ');

        const otherWebsiteButtons = allWebsites.map((website) => {
            if (website !== websiteType) {
                return (
                    <Link
                        underline="none"
                        key={mappings.uniqueKey[website]}
                        className={[classes.buttonLink, classes.buttonsSide].join(' ')}
                        href={mappings.urlPrefix[website]}
                    >
                        <Button disableRipple={true} disableFocusRipple={true} color="inherit">
                            {/* <CloudDownload className={classes.leftIcon} /> */}
                            <img
                                className={classes.otherDatasetIcon}
                                srcSet={mappings.logoOnlyWhiteUrl[website]}
                                alt={mappings.fullText[website]}
                                />

                            {mappings.fullText[website]}
                        </Button>
                    </Link>
                );
            } else {
                return '';
            }
        });

        const otherWebsiteButtonsMobile = allWebsites.map((website) => {
            if (website !== websiteType) {
                return (
                    <MenuItem onClick={this.handleMobileMenuClose}>
                        <Link
                            underline="none"
                            key={mappings.uniqueKey[website]}
                            className={[classes.buttonLink, classes.buttonsSide].join(' ')}
                            href={mappings.urlPrefix[website]}
                        >
                            <Button disableRipple={true} disableFocusRipple={true} color="default">
                                {/* <CloudDownload className={classes.leftIcon} /> */}
                                <img
                                    className={classes.otherDatasetIcon}
                                    srcSet={mappings.logoOnlyWhiteUrl[website]}
                                    alt={mappings.fullText[website]}
                                    />

                                {mappings.fullText[website]}
                            </Button>
                        </Link>
                    </MenuItem>
                );
            } else {
                return '';
            }
        });



        const homeLink = (
            <Link
                key={mappings.uniqueKey[websiteType]}
                underline="none"
                align="left"
                // className={isTextVQA ? classesGrowButton : classesButton}
                className={classesGrowButton}
                href={process.env.PUBLIC_URL.replace(/\/$/, "") + mappings.urlPrefix[websiteType]}
            >
                <img
                    className={classes.logo}
                    srcSet={mappings.logoOnlyWhiteUrl[websiteType]}
                    alt={mappings.fullText[websiteType]}
                />
                <span className={classes.logoText}>
                {mappings.fullText[websiteType]}
                </span>
            </Link>

        );

        const renderMobileMenu = (
            <Menu
                anchorEl={mobileMoreAnchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isMobileMenuOpen}
                onClose={this.handleMobileMenuClose}
            >
                <ClickAwayListener onClickAway={this.handleMobileMenuClose}>
                    <MenuList>
                        <Route exact path="/type:?/explore" render={() => helpMobileMenuItem} />
                        {otherWebsiteButtonsMobile}
                        <MenuItem onClick={this.handleMobileMenuClose}>
                            <Link
                                underline="none"
                                className={[classes.buttonLink, classes.buttonsSide].join(' ')}
                                href={mappings.urlPrefix[websiteType] + "dataset"}
                            >
                                <Button disableRipple={true} disableFocusRipple={true} color="default">
                                    <CloudDownload className={classes.leftIcon} />
                                    Dataset
                                </Button>
                            </Link>
                        </MenuItem>
                        {
                            !isTextOCR ?
                            <MenuItem onClick={this.handleMobileMenuClose}>
                            <Link
                                    underline="none"
                                    className={[classes.buttonLink, classes.buttonsSide].join(' ')}
                                    href={mappings.urlPrefix[websiteType] + "challenge"}
                                    >

                                    <Button disableRipple={true} disableFocusRipple={true} color="default">
                                        <Equalizer className={classes.leftIcon} />
                                        Challenge
                                        {isTextVQA ? <ExpandMoreIcon fontSize="small" /> : ""}
                                    </Button>
                                </Link>
                            </MenuItem> : ''
                        }
                        {
                            !isTextOCR ?
                            textVQAChallengeMenuMobile : ''
                        }
                        <MenuItem onClick={this.handleMobileMenuClose}>
                            <Link
                                underline="none"
                                className={[classes.buttonLink, classes.buttonsSide].join(' ')}
                                href={mappings.paperLink[websiteType]}
                            >
                                <Button disableRipple={true} disableFocusRipple={true} color="default">
                                    <Description className={classes.leftIcon} />
                                    Paper
                                </Button>
                            </Link>
                        </MenuItem>
                        <MenuItem onClick={this.handleMobileMenuClose}>
                            <Link
                                underline="none"
                                className={[classes.buttonLink, classes.buttonsSide].join(' ')}
                                href={mappings.codeLink[websiteType]}
                            >
                                <Button disableRipple={true} disableFocusRipple={true} color="default">
                                    <Code className={classes.leftIcon} />
                                    Code
                                </Button>
                            </Link>
                        </MenuItem>
                        <MenuItem onClick={this.handleMobileMenuClose}>
                            <Link
                                underline="none"
                                className={[classes.buttonLink, classes.buttonsSide].join(' ')}
                                href={mappings.urlPrefix[websiteType] + "explore"}
                            >
                                <Button disableRipple={true} disableFocusRipple={true} color="default">
                                    <Explore className={classes.leftIcon} />
                                    Explore
                                </Button>
                            </Link>
                        </MenuItem>
                    </MenuList>
                </ClickAwayListener>
            </Menu>
        );

        return (
            <div className={classes.root}>
                <AppBar position="static" color="primary">
                    <Toolbar>
                        {homeLink}
                        <div className={classes.sectionDesktop}>
                            <Route exact path="/type:?/explore" render={() => exploreHelpMenu}/>
                            {otherWebsiteButtons}
                            {
                                !isTextOCR ?
                                <Link
                                underline="none"
                                className={[classes.buttonLink, classes.buttonsSide].join(' ')}
                                href={mappings.urlPrefix[websiteType] + "challenge" }
                                >

                                    <Button
                                        disableRipple={true}
                                        disableFocusRipple={true}
                                        aria-owns={challengeAnchorEl ? challengeAnchorEl : undefined}
                                        aria-haspopup="true"
                                        onClick={this.handleChallengeMenuOpen}
                                        onMouseEnter={this.handleChallengeMenuOpen}
                                        className={[classes.buttonLink, classes.buttonsSide].join(' ')}
                                        >
                                        <Equalizer className={classes.leftIcon}/>
                                        Challenge
                                        {<ExpandMoreIcon fontSize="small"/>}
                                        {textVQAChallengeMenu}
                                    </Button>
                                </Link> : ''
                            }
                            <Link
                                underline="none"
                                className={[classes.buttonLink, classes.buttonsSide].join(' ')}
                                href={mappings.paperLink[websiteType]}
                            >
                                <Button disableRipple={true} disableFocusRipple={true} color="inherit">
                                    <Description className={classes.leftIcon}/>
                                    Paper
                                </Button>
                            </Link>
                            <Link
                                underline="none"
                                className={[classes.buttonLink, classes.buttonsSide].join(' ')}
                                href={mappings.codeLink[websiteType]}
                            >
                                <Button disableRipple={true} disableFocusRipple={true} color="inherit">
                                    <Code className={classes.leftIcon}/>
                                    Code
                                </Button>
                            </Link>
                            <Link
                                underline="none"
                                className={[classes.buttonLink, classes.buttonsSide].join(' ')}
                                href={mappings.urlPrefix[websiteType] + "dataset"}
                            >
                                <Button disableRipple={true} disableFocusRipple={true} color="inherit">
                                    <CloudDownload className={classes.leftIcon}/>
                                    Dataset
                                </Button>
                            </Link>
                            <Link
                                underline="none"
                                className={[classes.buttonLink, classes.buttonsSide].join(' ')}
                                href={mappings.urlPrefix[websiteType] + "explore"}
                        >
                                <Button disableRipple={true} disableFocusRipple={true} color="inherit">
                                    <Explore className={classes.leftIcon}/>
                                    Explore
                                </Button>
                            </Link>
                        </div>
                        <div className={classes.sectionMobile}>
                            <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit">
                                <MoreVert />
                            </IconButton>
                        </div>
                        {renderMobileMenu}
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(Header));