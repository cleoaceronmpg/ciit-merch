import React from "react";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { actionCreator, types } from "../../../../store";
import { generateRandomString } from "../../../../helpers/crypto_helper";

//import Breadcrumbs
import Breadcrumbs from "../../../../components/MerchStore/Common/Breadcrumb";
import Header from "../../../../components/MerchStore/Header";
import Footer from "../../../../components/MerchStore/Footer";
import QuantityButton from "../../../../components/MerchStore/Common/QuantityButton";
import "./styles.css";

import { Button, Container } from "reactstrap";
import { SIZE, COLOR, CatalogProducts } from "../data";

const ProductDetails = ({ app, cart, ...props }) => {
  const { id } = useParams();
  const { products } = app;
  const [selectedProduct, setSelectedProduct] = React.useState({});
  const [selectedSize, setSelectedSize] = React.useState(null);
  const [selectedColor, setSelectedColor] = React.useState(null);
  const [selectedQty, setSelectedQty] = React.useState(1);

  React.useEffect(() => {
    cart &&
      selectedSize &&
      selectedColor &&
      Swal.fire({
        icon: "success",
        title: "JUST ADDED TO YOUR CART",
        showConfirmButton: true,
        confirmButtonText: "Go to Cart",
        footer: '<a href="/catalog">Continue Shopping</a>',
        customClass: {
          confirmButton: "custom-confirm-button", // Add a custom class
        },
      }).then((result) => {
        if (result.isConfirmed) {
          // Redirect to /cart
          window.location.href = "/cart";
        }
      });
  }, [cart]);

  React.useEffect(() => {
    id && filterProduct(id);
  }, [id]);

  const filterProduct = (id) => {
    const filteredProduct = products.find((item) => item["Product ID"] === id);
    console.log("filteredProduct", filteredProduct);
    setSelectedProduct(filteredProduct);
  };

  React.useEffect(() => {
    console.log(selectedQty);
  }, [selectedQty]);

  const addToCart = async () => {
    if (selectedSize && selectedColor) {
      const sizeDetails = SIZE.find((item) => item.id === selectedSize);
      const colorDetails = COLOR.find((item) => item.id === selectedColor);

      const sameCartVariant = cart.data.find(
        (item) =>
          item["Product ID"] === selectedProduct["Product ID"] &&
          item["Color"] === colorDetails.color &&
          item["Size"] === sizeDetails.size
      );

      if (sameCartVariant) {
        const newCartData = cart.data.map((item) =>
          item["Product ID"] === selectedProduct["Product ID"] &&
          item["Color"] === colorDetails.color &&
          item["Size"] === sizeDetails.size
            ? {
                ...item,
                Quantity: parseInt(item.Quantity) + parseInt(selectedQty),
                TotalAmount:
                  parseFloat(item.Price) *
                  parseInt(item.Quantity + parseInt(selectedQty)),
              }
            : item
        );

        await props.actionCreator({
          type: types.UPDATE_CART,
          payload: newCartData,
        });
      } else {
        await props.actionCreator({
          type: types.ADD_TO_CART,
          payload: [
            {
              uid: generateRandomString(15),
              ...selectedProduct,
              Size: sizeDetails.size,
              Color: colorDetails.color,
              Quantity: parseInt(selectedQty),
              TotalAmount:
                parseFloat(selectedProduct.Price) * parseInt(selectedQty),
            },
          ],
        });
      }

      setSelectedSize(null);
      setSelectedColor(null);
      setSelectedQty(1);
    } else {
      Swal.fire({
        icon: "error",
        title: "Add to Cart",
        text: "Please select variant options",
      });
    }
  };

  //meta title
  document.title = "CIIT Merch | Product Details";

  return (
    <React.Fragment>
      <Header />
      <Container>
        {/* Render Breadcrumbs */}
        <Breadcrumbs
          title="Catalog"
          breadcrumbItem={selectedProduct["Product Name"] || ""}
        />

        <div>
          <div className="product-details">
            {selectedProduct?.Images && selectedProduct.Images.length > 0 && (
              <div className="product-details__image">
                <img
                  src={selectedProduct.Images[0].url}
                  alt={selectedProduct["Product Name"]}
                  className="self-center-details"
                />
              </div>
            )}

            <div className="product-details__info">
              <div className="product-details__name">
                <h1>{selectedProduct["Product Name"]}</h1>
              </div>
              <div className="product-details__sku">
                <h6>SKU: {selectedProduct["Product ID"]}</h6>
              </div>
              <div className="product-details__price">
                <h3>₱ {parseFloat(selectedProduct.Price).toFixed(2)}</h3>
              </div>
              <div className="product-details__sizes">
                <h6>Sizes:</h6>
                <ul className="product-details__variant-options">
                  {SIZE.map((item, index) => (
                    <li
                      key={index}
                      className={selectedSize === item.id ? "selected" : ""}
                    >
                      <span onClick={() => setSelectedSize(item.id)}>
                        {item.size}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="product-details__colors">
                <h6>Colors:</h6>
                <ul className="product-details__variant-options">
                  {COLOR.map((item, index) => (
                    <li
                      key={index}
                      className={selectedColor === item.id ? "selected" : ""}
                    >
                      <span onClick={() => setSelectedColor(item.id)}>
                        {item.color}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="product-details__quantity">
                <label>Quantity:</label>
                <QuantityButton
                  quantity={selectedQty}
                  setSelectedQty={setSelectedQty}
                />
              </div>
              <div className="product-details__actions">
                <Button
                  className="btn btn-primary w-100 waves-effect waves-light"
                  type="button"
                  style={{
                    backgroundColor: "#ff5400",
                    borderColor: "#ff5400",
                    maxWidth: "50%",
                    padding: "15px",
                  }}
                  color="primary"
                  onClick={() => addToCart()}
                >
                  <span>ADD TO CART</span>
                </Button>
              </div>
            </div>
          </div>
          <div className="product-description">
            <h5>Description:</h5>
            {selectedProduct["Product Description"] !== undefined ? (
              <p>{selectedProduct["Product Description"]}</p>
            ) : (
              <p>Description not available</p>
            )}
          </div>
        </div>
      </Container>
      <Footer />
    </React.Fragment>
  );
};

const mapStateToProps = ({ app, cart, authentication }) => ({
  app,
  cart,
  authentication,
});

export default connect(mapStateToProps, { actionCreator })(ProductDetails);
