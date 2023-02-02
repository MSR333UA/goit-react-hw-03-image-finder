import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { ImageGalleryUl } from './ImageGallery.styled';
import PropTypes from 'prop-types';

import React, { Component, createRef } from 'react';

class ImageGallery extends Component {
  listRef = createRef();

  getSnapshotBeforeUpdate(prevProps, prevState) {
    if (prevProps.images.length < this.props.images.length) {
      const list = this.listRef.current;
      return list.scrollHeight - list.scrollTop;
    }

    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (snapshot) {
      window.scrollTo({ top: snapshot, behavior: 'smooth' });
    }
  }

  render() {
    return (
      <ImageGalleryUl ref={this.listRef}>
        {this.props.images.map(({ id, tags, webformatURL, largeImageURL }) => {
          return (
            <ImageGalleryItem
              key={id}
              // ref={arr.length - 12 === id ? imagesItemRef : null}
              tags={tags}
              webformatURL={webformatURL}
              largeImageURL={largeImageURL}
              onClickItem={() => {
                this.props.onClick(largeImageURL);
              }}
            />
          );
        })}
      </ImageGalleryUl>
    );
  }
}

export default ImageGallery;

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
};
