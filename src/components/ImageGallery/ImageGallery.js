import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem';
import { Gallery } from './ImageGallery.styled';

const ImageGallery = ({ items, page }) => {
  useEffect(() => {
    if (page < 2) {
      return;
    }
    window.scrollBy({
      top: 260 * 2,
      behavior: 'smooth',
    });
  }, [items, page]);

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
  page: PropTypes.number.isRequired,
};
export default ImageGallery;
