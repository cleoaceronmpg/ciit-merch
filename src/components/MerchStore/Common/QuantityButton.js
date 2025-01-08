import React from "react";
import PropTypes from "prop-types";

const QuantityButton = ({ quantity, setSelectedQty }) => {
  const plusQuantity = () => {
    setSelectedQty(quantity + 1);
  };

  const minusQuantity = () => {
    if (quantity > 0) {
      setSelectedQty(quantity - 1);
    }
  };

  return (
    <div className="quantity-input qty-box border">
      <button
        className="flex justify-center items-center"
        type="button"
        style={{
          border: "none",
          backgroundColor: "transparent",
          backgroundImage: "none",
        }}
        onClick={() => minusQuantity()}
      >
        <i className="dripicons-minus"></i>
      </button>
      <div
        style={{
          width: 130,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <span>{quantity}</span>
      </div>
      <button
        className="flex justify-center items-center"
        type="button"
        style={{
          border: "none",
          backgroundColor: "transparent",
          backgroundImage: "none",
        }}
        onClick={() => plusQuantity()}
      >
        <i className="dripicons-plus"></i>
      </button>
    </div>
  );
};

QuantityButton.propTypes = {
  setSelectedQty: PropTypes.func,
};

export default QuantityButton;
