import React, { useState } from 'react';
import ImageCarousel from './ImageCarousel'; // Import the carousel component
import images from './imagesMap'; // Import the array of image paths

const ChangeProfileModal = ({ handleProfileChange, setShowChangeProfile }) => {
  const [selectedImage, setSelectedImage] = useState(images[0]); // Default to the first image

  const handleSelect = (image) => {
    setSelectedImage(image); // Update the selected image
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Change Profile Picture</h2>
        <ImageCarousel images={images} onSelect={handleSelect} />
        <button
          className="button-primary"
          onClick={() => handleProfileChange(selectedImage)}
        >
          Submit
        </button>
        <button
          className="button-secondary"
          onClick={() => setShowChangeProfile(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};


export default ChangeProfileModal;
