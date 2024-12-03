import React, { useState } from 'react';
import './ImageCarousel.css'; 

const ImageCarousel = ({ images, onSelect }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
  
    const handleNext = () => {
      const newIndex = (currentIndex + 1) % images.length;
      setCurrentIndex(newIndex);
      if (onSelect) onSelect(images[newIndex]);
    };
  
    const handleBack = () => {
      const newIndex = (currentIndex - 1 + images.length) % images.length;
      setCurrentIndex(newIndex);
      if (onSelect) onSelect(images[newIndex]);
    };
  
    return (
      <div className="image-carousel">
        <button onClick={handleBack}>Back</button>
        <img
          src={images[currentIndex]}
          alt={`Image ${currentIndex + 1}`}
          className="carousel-image"
        />
        <button onClick={handleNext}>Next</button>
      </div>
    );
  };
  
export default ImageCarousel;