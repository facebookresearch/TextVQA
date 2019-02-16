import React from 'react';
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Masonry from 'react-masonry-component';
import InfinteScroll from 'react-infinite-scroller';

import ImageCard from './ImageCard'
import * as data from '../TextVQA_with_url_val.json';


const styles = {
    root: {
      width: '100%',
    },
    imgElement: {
        width: '200px',
        listStyle: 'none'
    },
};
  
const masonryOptions = {
    transitionDuration: 10
};
 
const imagesLoadedOptions = { background: '.my-bg-image-el' }

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

class Explore extends React.Component {
    state = {
        layoutReady: false,
        elements: [],
        page: 0,
        hasMore: true
    }

    handleImagesLoaded = (instanceImageLoaded) => {
        if (this.vars.first) {
            return;
        }
        this.vars.first = true;
        this.show();
    }

    loadMore = () => {
        const elements = shuffle(data['data'].slice(this.state.page * 50, (this.state.page + 1) * 50));
        this.setState({
            elements: this.state.elements.concat(elements),
            page: this.state.page + 1,
            hasMore: (this.state.page + 1) * 50 < data['data'].length
        })
    };

    getElements = () => {
        const imageIds = []

        const childElements = this.state.elements.filter((item, idx) => {
            if (imageIds[item['image']]) {
                return false;
            }
            imageIds[item['image']] = 1;
            return true;
        }).map((item, idx) => {
            return (
                <ImageCard key={idx} imgUrl={item['flickr_url']} question={item['question']} answer={item['answers'][0]} />
            );
        });

        return childElements;
    }

    getLoaderElement = () => {
        return (<CircularProgress key={Math.random()}/>)
    }
    
    handleLayoutReady = () => {
		if (!this.state.layoutReady) {
			this.setState({ layoutReady: true });
		}
	}

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>

                <Grid container direction="row" justify="center" alignItems="flex-start">
                    <Grid item xs={12} md={10}>
                        <InfinteScroll
                            loader={this.getLoaderElement()}
                            loadMore={this.loadMore}
                            hasMore={this.state.hasMore}
                            threshold={1000}>
                            <Masonry
                                className={'my-gallery-class'}
                                elementType={'ul'} 
                                // style={{ 
                                //     display: (this.state.layoutReady)
                                //         ? 'none'
                                //         : 'block', 
                                // }}                            
                                options={masonryOptions} 
                                disableImagesLoaded={false} 
                                updateOnEachImageLoad={false} 
                                imagesLoadedOptions={imagesLoadedOptions} 
                                onLayoutComplete={this.handleLayoutReady}
                            >
                                {this.getElements()}
                            </Masonry>
                        </InfinteScroll>
                    </Grid>
                </Grid>
            </div>
        );
}
}

Explore.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Explore);