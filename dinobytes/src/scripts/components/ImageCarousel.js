import React, { useState } from 'react';
import './ImageCarousel.css'; 
import images from './imagesMap';

const ImageCarousel = ({ images, onSelect }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    const newIndex = (currentIndex + 1) % images.length;
    console.log("Next index:", newIndex, "Image:", images[newIndex]);
    setCurrentIndex(newIndex);
    if (onSelect) onSelect(images[newIndex]);
  };

  const handleBack = () => {
    const newIndex = (currentIndex - 1 + images.length) % images.length;
    console.log("Back index:", newIndex, "Image:", images[newIndex]);
    setCurrentIndex(newIndex);
    if (onSelect) onSelect(images[newIndex]);
  };

  return (
    <div className="image-carousel">
      <button onClick={handleBack}>Back</button>
      <img
        src={images[currentIndex]}
        alt={`Profile ${currentIndex + 1}`}
        className="carousel-image"
        onError={(e) => console.error(`Image failed to load: ${images[currentIndex]}`, e)}
      />
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default ImageCarousel;