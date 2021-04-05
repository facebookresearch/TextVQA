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
        const isTextVQA = this.props.location.pathname.indexOf('textcaps') === -1;
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
                                    (isTextVQA ? "" : "/textcaps") + "/challenge/"
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
                                    (isTextVQA ? "" : "/textcaps") + "/challenge/"
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
        const textVQALink = (
            <Link
                key={isTextVQA ? 0 : 1}
                underline="none"
                align="left"
                // className={isTextVQA ? classesButton : classesGrowButton}
                className={classesGrowButton}
                href={process.env.PUBLIC_URL + '/'}
            >
                <img
                    className={classes.logo}
                    srcSet="/assets/images/textvqa_logo_white.svg"
                    alt="TextVQA"
                />
                <span className={classes.logoText}>
                TextVQA
                </span>
            </Link>

        );

        const textVQAButtonLink = (
            <Link
                underline="none"
                className={[classes.buttonLink, classes.buttonsSide].join(' ')}
                href="/"
            >
                <Button disableRipple={true} disableFocusRipple={true} color="inherit">
                    {/* <CloudDownload className={classes.leftIcon} /> */}
                    <img
                        className={classes.otherDatasetIcon}
                        srcSet="/assets/images/textvqa_logo_white.svg"
                        alt="TextVQA"
                    />

                    TextVQA
                </Button>
            </Link>
        )
        const textVQAButtonMobileLink = (
            <Link
                underline="none"
                className={[classes.buttonLink, classes.buttonsSide].join(' ')}
                href="/"
            >
                <Button disableRipple={true} disableFocusRipple={true} color="default">
                    {/* <CloudDownload className={classes.leftIcon} /> */}
                    <img
                        className={classes.otherDatasetIcon}
                        srcSet="/assets/images/textvqa_logo.svg"
                        alt="TextVQA"
                    />

                    TextVQA
                </Button>
            </Link>
        )

        const textCapsButtonLink = (
            <Link
                underline="none"
                className={[classes.buttonLink, classes.buttonsSide].join(' ')}
                href="/textcaps"
            >
                <Button disableRipple={true} disableFocusRipple={true} color="inherit">
                    {/* <CloudDownload className={classes.leftIcon} /> */}
                    <img
                        className={classes.otherDatasetIcon}
                        srcSet="/assets/images/textcaps_logo_white.svg"
                        alt="TextCaps"
                    />

                    TextCaps
                </Button>
            </Link>
        )
        const textCapsButtonMobileLink = (
            <Link
                underline="none"
                className={[classes.buttonLink, classes.buttonsSide].join(' ')}
                href="/textcaps"
            >
                <Button disableRipple={true} disableFocusRipple={true} color="default">
                    {/* <CloudDownload className={classes.leftIcon} /> */}
                    <img
                        className={classes.otherDatasetIcon}
                        srcSet="/assets/images/textcaps_logo.svg"
                        alt="TextCaps"
                    />

                    TextCaps
                </Button>
            </Link>
        )

        const textCapsLink = (
            <Link
                key={isTextVQA ? 1 : 0}
                underline="none"
                align="left"
                // className={isTextVQA ? classesGrowButton : classesButton}
                className={classesGrowButton}
                href={process.env.PUBLIC_URL + '/textcaps/'}
            >
                <img
                    className={classes.logo}
                    srcSet="/assets/images/textcaps_logo_white.svg"
                    alt="TextCaps"
                />
                <span className={classes.logoText}>
                TextCaps
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
                        <MenuItem onClick={this.handleMobileMenuClose}>
                            {
                                isTextVQA ? textCapsButtonMobileLink : textVQAButtonMobileLink
                            }
                        </MenuItem>
                        <MenuItem onClick={this.handleMobileMenuClose}>
                            <Link
                                underline="none"
                                className={[classes.buttonLink, classes.buttonsSide].join(' ')}
                                href={(isTextVQA ? "/" : "/textcaps/") + "dataset"}
                            >
                                <Button disableRipple={true} disableFocusRipple={true} color="default">
                                    <CloudDownload className={classes.leftIcon} />
                                    Dataset
                                </Button>
                            </Link>
                        </MenuItem>
                        <MenuItem onClick={this.handleMobileMenuClose}>
                            <Link
                                underline="none"
                                className={[classes.buttonLink, classes.buttonsSide].join(' ')}
                                href={(isTextVQA ? "/" : "/textcaps/") + "challenge"}
                            >

                                <Button disableRipple={true} disableFocusRipple={true} color="default">
                                    <Equalizer className={classes.leftIcon} />
                                    Challenge
                                    {isTextVQA ? <ExpandMoreIcon fontSize="small" /> : ""}
                                </Button>
                            </Link>
                        </MenuItem>
                        {textVQAChallengeMenuMobile}
                        <MenuItem onClick={this.handleMobileMenuClose}>
                            <Link
                                underline="none"
                                className={[classes.buttonLink, classes.buttonsSide].join(' ')}
                                href={(isTextVQA ? "https://arxiv.org/abs/1904.08920" :
                                        "https://arxiv.org/abs/2003.12462")}
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
                                href={isTextVQA ? "https://github.com/facebookresearch/pythia" :
                                    "https://github.com/facebookresearch/pythia/tree/project/m4c/projects/M4C_Captioner"
                                }
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
                                href={(isTextVQA ? "/" : "/textcaps/") + "explore"}
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
                        {
                            isTextVQA ? textVQALink : textCapsLink
                        }
                        {/* {
                            isTextVQA ? textCapsLink : textVQALink
                        } */}
                        <div className={classes.sectionDesktop}>
                            <Route exact path="/type?/explore" render={() => exploreHelpMenu}/>
                            {
                                isTextVQA ? textCapsButtonLink : textVQAButtonLink
                            }
                            <Link
                                underline="none"
                                className={[classes.buttonLink, classes.buttonsSide].join(' ')}
                                href={isTextVQA ? "/challenge" : "/textcaps/challenge" }
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
                            </Link>
                            <Link
                                underline="none"
                                className={[classes.buttonLink, classes.buttonsSide].join(' ')}
                                href={(isTextVQA ? "https://arxiv.org/abs/1904.08920" :
                                    "https://arxiv.org/abs/2003.12462")}
                            >
                                <Button disableRipple={true} disableFocusRipple={true} color="inherit">
                                    <Description className={classes.leftIcon}/>
                                    Paper
                                </Button>
                            </Link>
                            <Link
                                underline="none"
                                className={[classes.buttonLink, classes.buttonsSide].join(' ')}
                                href={isTextVQA ? "https://github.com/facebookresearch/pythia" :
                                    "https://github.com/facebookresearch/pythia/tree/project/m4c/projects/M4C_Captioner"
                                }
                            >
                                <Button disableRipple={true} disableFocusRipple={true} color="inherit">
                                    <Code className={classes.leftIcon}/>
                                    Code
                                </Button>
                            </Link>
                            <Link
                                underline="none"
                                className={[classes.buttonLink, classes.buttonsSide].join(' ')}
                                href={(isTextVQA ? "/" : "/textcaps/") + "dataset"}
                            >
                                <Button disableRipple={true} disableFocusRipple={true} color="inherit">
                                    <CloudDownload className={classes.leftIcon}/>
                                    Dataset
                                </Button>
                            </Link>
                            <Link
                                underline="none"
                                className={[classes.buttonLink, classes.buttonsSide].join(' ')}
                                href={(isTextVQA ? "/" : "/textcaps/") + "explore"}
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