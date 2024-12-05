import React, { useState } from 'react';
import ImageCarousel from './ImageCarousel'; // Import the carousel component
import images from './imagesMap'; // Import the array of image paths

const ChangeProfileModal = ({ handleProfileChange, setShowChangeProfile }) => {
  const [selectedImage, setSelectedImage] = useState(images[0]); // Default to the first image

  const handleSelect = (image) => {
    setSelectedImage(image); // Update the selected image
  };

  const modalOverlayStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dim background
    zIndex: 1000, // Ensure modal is on top
    animation: 'fadeIn 0.5s ease', // Smooth fade-in animation
  };

  const modalContentStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', // Center horizontally
    textAlign: 'center', // Center text
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', // Optional shadow
    animation: 'slideDown 0.5s ease', // Smooth slide-down animation
  };

  const headingStyle = {
    marginBottom: '20px', // Space below the heading
    fontSize: '24px', // Adjust font size
    color: '#333', // Adjust color as needed
  };

  const buttonStyle = {
    marginTop: '10px', // Space between buttons
    padding: '10px 20px',
    fontSize: '16px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
  };

  const primaryButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#007bff',
    color: '#fff',
  };

  const secondaryButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#6c757d',
    color: '#fff',
  };

  return (
    <div style={modalOverlayStyle}>
      {/* Inline <style> for animations */}
      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          @keyframes slideDown {
            from {
              transform: translateY(-20px);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }
        `}
      </style>

      <div style={modalContentStyle}>
        <h2 style={headingStyle}>Change Profile Picture</h2>
        <ImageCarousel images={images} onSelect={handleSelect} />
        <button
          style={primaryButtonStyle}
          onClick={() => handleProfileChange(selectedImage)}
        >
          Submit
        </button>
        <button
          style={secondaryButtonStyle}
          onClick={() => setShowChangeProfile(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ChangeProfileModal;
