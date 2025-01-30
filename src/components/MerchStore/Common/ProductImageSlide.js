import React, { useState, useEffect } from "react";
import { arrayOf, shape, string } from "prop-types";

import "./styles.css";

const ProductImageSlide = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 10000); // Change slide every 3 seconds

    return () => clearInterval(timer);
  }, [currentIndex]);

  const nextSlide = () => {
    const nextIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(nextIndex);
  };

  return (
    <div className="product-image-slide">
      <div className="product-image-slide__slideshow-container">
        <div className="product-image-slide__slideshow">
          {images.map((image, index) => (
            <div
              key={index}
              className={`product-image-slide__slide ${index === currentIndex ? "active" : ""}`}
              style={{ backgroundImage: `url(${image.url})` }}
            />
          ))}
        </div>
      </div>
      {images.length > 1 && (
        <div className="product-image-slide__thumbnail-list-container">
          <div className="product-image-slide__thumbnail-list">
            {images.map((image, index) => (
              <div
                key={index}
                className={`product-image-slide__slide-thumbnail ${index === currentIndex ? "active" : ""}`}
                style={{ backgroundImage: `url(${image.url})` }}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

ProductImageSlide.propTypes = {
  images: arrayOf(
    shape({
      filename: string,
      url: string,
    })
  ),
};

export default ProductImageSlide;
