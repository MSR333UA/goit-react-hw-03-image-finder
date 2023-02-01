import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { ImageGalleryUl } from './ImageGallery.styled';
import PropTypes from 'prop-types';
import React from 'react';

export const ImageGallery = React.forwardRef(
  ({ onClick, images }, imagesItemRef) => {
    return (
      <ImageGalleryUl ref={imagesItemRef}>
        {images.map(({ id, tags, webformatURL, largeImageURL }) => {
          return (
            <ImageGalleryItem
              key={id}
              // ref={arr.length - 12 === id ? imagesItemRef : null}
              tags={tags}
              webformatURL={webformatURL}
              largeImageURL={largeImageURL}
              onClickItem={() => {
                onClick(largeImageURL);
              }}
            />
          );
        })}
      </ImageGalleryUl>
    );
  }
);

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
};
