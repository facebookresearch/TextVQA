import React from 'react';
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import theme from '../styles'

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
    }
  };

function Header(props) {
    const { classes } = props;

    return (
        <div className={classes.root}>
        <AppBar position="static" color="primary">
            <Toolbar>
            <Typography variant="h6" color="inherit" align="left" className={classes.grow}>
                <Link
                    underline="none"
                    className={classes.buttonLink}
                    href={process.env.PUBLIC_URL + '/'}
                >
                    TextVQA
                </Link>
            </Typography>
            <Link underline="none" className={classes.buttonLink} href="explore">
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