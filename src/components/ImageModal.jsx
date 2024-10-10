import { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { API_URL } from "../app/http";

const ImageModal = ({ images, isOpen, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const navigateImage = useCallback(
    (direction) => {
      setCurrentImageIndex((prevIndex) => {
        const newIndex = prevIndex + direction;
        if (newIndex < 0) {
          return images.length - 1;
        } else if (newIndex >= images.length) {
          return 0;
        }
        return newIndex;
      });
    },
    [images]
  );

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowLeft") {
        navigateImage(-1);
      } else if (event.key === "ArrowRight") {
        navigateImage(1);
      } else if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, navigateImage, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="relative w-full max-w-4xl mx-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300 focus:outline-none z-10"
          aria-label="Close modal"
        >
          <i className="fas fa-times"></i>
        </button>
        <div className="relative">
          <img
            src={API_URL + images[currentImageIndex]?.image}
            alt={`Product image ${currentImageIndex + 1}`}
            className="w-full h-auto max-h-[60vh] object-contain"
          />
          <button
            onClick={() => navigateImage(-1)}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-4xl hover:text-gray-300 focus:outline-none"
            aria-label="Previous image"
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          <button
            onClick={() => navigateImage(1)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-4xl hover:text-gray-300 focus:outline-none"
            aria-label="Next image"
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
        <div className="mt-4">
          <p className="text-center text-white mb-2">
            {currentImageIndex + 1} / {images.length}
          </p>
          <div className="flex justify-center items-center space-x-2 overflow-x-auto py-2">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`focus:outline-none ${
                  index === currentImageIndex ? "ring-2 ring-pink-500" : ""
                }`}
                aria-label={`Go to image ${index + 1}`}
              >
                <img
                  src={API_URL + image?.image}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-16 h-16 object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
ImageModal.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string,
    })
  ),
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};
export default ImageModal;
