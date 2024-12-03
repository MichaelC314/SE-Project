import React, { useState } from "react";
import "./ImageCarousel.css";
import imagesMap from "./imagesMap";

const ImageCarousel = ({ onSelect }) => {
  // Convert the Map to an array of entries [key, value]
  const imagesArray = Array.from(imagesMap.entries());
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    const newIndex = (currentIndex + 1) % imagesArray.length;
    setCurrentIndex(newIndex);
    if (onSelect) onSelect(imagesArray[newIndex][0]); // Pass the key (e.g., "FlyDino1") to the onSelect callback
  };

  const handleBack = () => {
    const newIndex = (currentIndex - 1 + imagesArray.length) % imagesArray.length;
    setCurrentIndex(newIndex);
    if (onSelect) onSelect(imagesArray[newIndex][0]); // Pass the key to the onSelect callback
  };

  return (
    <div className="image-carousel">
      <button onClick={handleBack}>Back</button>
      <img
        src={imagesArray[currentIndex][1]} // Access the image path (value)
        alt={imagesArray[currentIndex][0]} // Use the key as the alt text
        className="carousel-image"
        onError={(e) =>
          console.error(`Image failed to load: ${imagesArray[currentIndex][1]}`, e)
        }
      />
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default ImageCarousel;
