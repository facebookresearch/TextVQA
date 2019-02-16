import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';


const styles = {
  card: {
    // maxWidth: 345,
  },
  media: {
    height: 140,
  },
  imgElement: {
    width: '250px',
    listStyle: 'none',
    minHeight: '200px',
    maxHeight: '400px'
  },
  titleStyles: {
      whiteSpace: 'inherit',
      fontSize: '0.95rem',
      lineHeight: '20px'
  },
  subtitleStyles: {
      whiteSpace: 'inherit'
  },
};

function ImageCard(props) {
  const { classes, imgUrl, question, answer } = props;
  return (
    <GridListTile className={classes.imgElement} key={imgUrl}>
        <img className={classes.imgElement} src={imgUrl} alt={question} />
        <GridListTileBar
            classes={
                {
                    title: classes.titleStyles,
                    subtitle: classes.subtitleStyles
                }
            }
            title={question}
            subtitle={<span>{answer}</span>}
        />
    </GridListTile>
  );
}

ImageCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImageCard);