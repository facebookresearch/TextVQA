import React from 'react';
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
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
  };

function Header(props) {
    const { classes } = props;

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
                <Link
                    underline="none"
                    className={[classes.buttonLink, classes.buttonsSide].join(' ')}
                    href="download"
                >
                    <Button color="inherit">Download</Button>
                </Link>
                <Link
                    underline="none"
                    className={[classes.buttonLink, classes.buttonsSide].join(' ')}
                    href="explore"
                >
                    <Button color="inherit">Explore</Button>
                </Link>
            </Toolbar>
        </AppBar>
        </div>
    );
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);