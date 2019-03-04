import React from 'react';
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';

import Explore from '@material-ui/icons/Explore';
import CloudDownload from '@material-ui/icons/CloudDownload';
import Equalizer from '@material-ui/icons/Equalizer';
import Description from '@material-ui/icons/Description';
import MoreIcon from '@material-ui/icons/MoreVert';
import { withStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import theme from '../styles';

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
        height: '50px',
        verticalAlign: 'middle',
        [theme.breakpoints.down('sm')]: {
            height: '35px'
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
  };

class Header extends React.Component {
    state = {
        mobileMoreAnchorEl: null,
    };

    handleMobileMenuOpen = event => {
        this.setState({ mobileMoreAnchorEl: event.currentTarget });
    };

    handleMobileMenuClose = () => {
        this.setState({ mobileMoreAnchorEl: null });
    };

    render() {
        const { classes } = this.props;
        const { anchorEl, mobileMoreAnchorEl } = this.state;
        const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

        const renderMobileMenu = (
            <Menu
                anchorEl={mobileMoreAnchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isMobileMenuOpen}
                onClose={this.handleMenuClose}
            >
                <MenuItem onClick={this.handleMobileMenuClose}>
                    <Link
                        underline="none"
                        className={[classes.buttonLink, classes.buttonsSide].join(' ')}
                        href="download"
                    >
                            <Button disableRipple={true} disableFocusRipple={true} color="black">
                                <CloudDownload className={classes.leftIcon}/>
                                Download
                            </Button>
                    </Link>
                </MenuItem>
                <MenuItem onClick={this.handleMobileMenuClose}>
                    <Link
                        underline="none"
                        className={[classes.buttonLink, classes.buttonsSide].join(' ')}
                        href="challenge"
                    >
                            <Button disableRipple={true} disableFocusRipple={true} color="black">
                                <Equalizer className={classes.leftIcon}/>
                                Challenge
                            </Button>
                    </Link>
                </MenuItem>
                <MenuItem onClick={this.handleMobileMenuClose}>
                    <Link
                        underline="none"
                        className={[classes.buttonLink, classes.buttonsSide].join(' ')}
                        href="paper"
                    >
                            <Button disableRipple={true} disableFocusRipple={true} color="black">
                                <Description className={classes.leftIcon}/>
                                Paper
                            </Button>
                    </Link>
                </MenuItem>
                <MenuItem onClick={this.handleMobileMenuClose}>
                    <Link
                        underline="none"
                        className={[classes.buttonLink, classes.buttonsSide].join(' ')}
                        href="explore"
                    >
                            <Button disableRipple={true} disableFocusRipple={true} color="black">
                                <Explore className={classes.leftIcon}/>
                                Explore
                            </Button>
                    </Link>
                </MenuItem>
            </Menu>
        );

        return (
            <div className={classes.root}>
                <AppBar position="static" color="primary">
                    <Toolbar>
                        <Link
                            underline="none"
                            align="left"
                            className={[classes.buttonLink, classes.grow].join(' ')}
                            href={process.env.PUBLIC_URL + '/'}
                        >
                            <img
                                className={classes.logo}
                                srcSet="assets/images/textvqa_logo_and_text_white.svg"
                                alt="TextVQA"
                            />
                        </Link>
                        <div className={classes.sectionDesktop}>
                            <Link
                                underline="none"
                                className={[classes.buttonLink, classes.buttonsSide].join(' ')}
                                href="challenge"
                            >
                                    <Button disableRipple={true} disableFocusRipple={true} color="inherit">
                                        <Equalizer className={classes.leftIcon}/>
                                        Challenge
                                    </Button>
                            </Link>
                            <Link
                                underline="none"
                                className={[classes.buttonLink, classes.buttonsSide].join(' ')}
                                href="paper"
                            >
                                    <Button disableRipple={true} disableFocusRipple={true} color="inherit">
                                        <Description className={classes.leftIcon}/>
                                        Paper
                                    </Button>
                            </Link>
                            <Link
                                underline="none"
                                className={[classes.buttonLink, classes.buttonsSide].join(' ')}
                                href="download"
                            >
                                    <Button disableRipple={true} disableFocusRipple={true} color="inherit">
                                        <CloudDownload className={classes.leftIcon}/>
                                        Download
                                    </Button>
                            </Link>
                            <Link
                                underline="none"
                                className={[classes.buttonLink, classes.buttonsSide].join(' ')}
                                href="explore"
                            >
                                    <Button disableRipple={true} disableFocusRipple={true} color="inherit">
                                        <Explore className={classes.leftIcon}/>
                                        Explore
                                    </Button>
                            </Link>
                        </div>
                        <div className={classes.sectionMobile}>
                            <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit">
                                <MoreIcon />
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

export default withStyles(styles)(Header);