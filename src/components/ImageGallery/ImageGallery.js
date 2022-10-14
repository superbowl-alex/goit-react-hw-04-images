import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem';
import { HITS_PER_PAGE } from '../../Services/fetchImages';

import { Gallery } from './ImageGallery.styled';

const ImageGallery = ({ items }) => {
  useEffect(() => {
    if (items.length <= HITS_PER_PAGE) {
      return;
    }
    window.scrollBy({
      top: 260 * 2,
      behavior: 'smooth',
    });
  }, [items]);

  return (
    <Gallery>
      {items.map(item => (
        <ImageGalleryItem key={item.id} item={item} />
      ))}
    </Gallery>
  );
};

ImageGallery.propTypes = {
  items: PropTypes.array.isRequired,
};
export default ImageGallery;
