import { useState } from 'react';
import PropTypes from 'prop-types';
import { GalleryItem, GallerryItemImage } from './ImageGalleryItem.styled';
import Modal from '../Modal';

function ImageGalleryItem({ item }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(isModalOpen => !isModalOpen);
  };

  return (
    <GalleryItem>
      <GallerryItemImage
        src={item.webformatURL}
        alt={item.tags}
        onClick={toggleModal}
      />
      {isModalOpen && <Modal image={item} toggleModal={toggleModal} />}
    </GalleryItem>
  );
}

ImageGalleryItem.propTypes = {
  item: PropTypes.object.isRequired,
};

export default ImageGalleryItem;
