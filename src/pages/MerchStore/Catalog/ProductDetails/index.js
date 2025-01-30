import React from "react";
import Swal from "sweetalert2";
import DOMPurify from "dompurify";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { actionCreator, types } from "../../../../store";
import { generateRandomString } from "../../../../helpers/crypto_helper";
import { Button, Container } from "reactstrap";

//import Breadcrumbs
import Breadcrumbs from "../../../../components/MerchStore/Common/Breadcrumb";
import Header from "../../../../components/MerchStore/Header";
import Footer from "../../../../components/MerchStore/Footer";
import QuantityButton from "../../../../components/MerchStore/Common/QuantityButton";
import ProductImageSlide from "../../../../components/MerchStore/Common/ProductImageSlide";
import "./styles.css";

const ProductDetails = ({ app, cart, ...props }) => {
  const { id } = useParams();
  const { products } = app;
  const [selectedProduct, setSelectedProduct] = React.useState({});
  const [selectedSize, setSelectedSize] = React.useState(null);
  const [selectedColor, setSelectedColor] = React.useState(null);
  const [selectedQty, setSelectedQty] = React.useState(1);
  const [sanitizedDescriptionHTML, setSanitizedDescriptionHTML] =
    React.useState(null);

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

  React.useEffect(() => {
    selectedProduct?.id && fetchRemainingStocks(selectedProduct["Product ID"]);
    selectedProduct?.id &&
      setSanitizedDescriptionHTML(
        DOMPurify.sanitize(selectedProduct["Product Description"], {
          ALLOWED_ATTR: ["style"], // Allow inline styles
        })
      );
  }, [selectedSize, selectedColor, selectedProduct]);

  const fetchRemainingStocks = async (recordId) => {
    if (selectedSize || selectedColor) {
      await props.actionCreator({
        type: types.GET_REMAINING_STOCKS,
        payload: {
          recordId: recordId,
          size: selectedSize,
          color: selectedColor,
        },
      });
    }
  };

  const filterProduct = (id) => {
    const filteredProduct = products.find((item) => item["Product ID"] === id);
    setSelectedProduct(filteredProduct);
  };

  const addToCart = async () => {
    if (selectedProduct.VariantOptions === "Yes") {
      if (
        selectedSize &&
        selectedColor &&
        app.selectedProductRemainingStock > 0
      ) {
        const sameCartVariant = cart.data.find(
          (item) =>
            item["Product ID"] === selectedProduct["Product ID"] &&
            item["Color"] === selectedColor &&
            item["Size"] === selectedSize
        );

        if (sameCartVariant) {
          const newCartData = cart.data.map((item) =>
            item["Product ID"] === selectedProduct["Product ID"] &&
            item["Color"] === selectedColor &&
            item["Size"] === selectedSize
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
                Size: selectedSize,
                Color: selectedColor,
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
        if (!selectedSize) {
          Swal.fire({
            icon: "error",
            title: "Size Option",
            text: "Please select size variant options",
          });
        } else if (!app.selectedProductRemainingStock) {
          Swal.fire({
            icon: "error",
            title: "Remaining Stocks",
            text: "This product has 0 remaining stock.",
          });
        } else {
          if (!selectedColor) {
            Swal.fire({
              icon: "error",
              title: "Color Option",
              text: "Please select color variant options",
            });
          }
        }
      }
    } else {
      const sameCartVariant = cart.data.find(
        (item) => item["Product ID"] === selectedProduct["Product ID"]
      );

      if (sameCartVariant) {
        const newCartData = cart.data.map((item) =>
          item["Product ID"] === selectedProduct["Product ID"]
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
              Size: selectedSize || "No Size",
              Color: selectedColor || "No Color",
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
          url="/catalog"
        />

        <div>
          <div className="product-details">
            {selectedProduct?.Images && selectedProduct.Images.length > 0 && (
              <div className="product-details__image">
                <ProductImageSlide images={selectedProduct.Images} />
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
              {selectedProduct.VariantOptions === "Yes" && (
                <>
                  <div className="product-details__sizes">
                    <h6>Sizes:</h6>
                    <ul className="product-details__variant-options">
                      {selectedProduct?.Sizes &&
                        selectedProduct.Sizes.map((item, index) => (
                          <li
                            key={index}
                            className={selectedSize === item ? "selected" : ""}
                          >
                            <span onClick={() => setSelectedSize(item)}>
                              {item}
                            </span>
                          </li>
                        ))}
                    </ul>
                  </div>
                  <div className="product-details__colors">
                    <h6>Colors:</h6>
                    <ul className="product-details__variant-options">
                      {selectedProduct?.Colors &&
                        selectedProduct.Colors.map((item, index) => (
                          <li
                            key={index}
                            className={selectedColor === item ? "selected" : ""}
                          >
                            <span onClick={() => setSelectedColor(item)}>
                              {item}
                            </span>
                          </li>
                        ))}
                    </ul>
                  </div>
                </>
              )}

              <div className="product-details__quantity">
                <div>
                  <label>Quantity:</label>
                  <QuantityButton
                    quantity={selectedQty}
                    setSelectedQty={setSelectedQty}
                  />
                </div>
                {selectedSize && (
                  <div className="product-details__stocks-container">
                    <label>Remaining Stocks:</label>
                    <h4>{app.selectedProductRemainingStock}</h4>
                  </div>
                )}
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
                  disabled={
                    selectedProduct.VariantOptions === "No"
                      ? false
                      : !app.selectedProductRemainingStock
                  }
                >
                  <span>ADD TO CART</span>
                </Button>
              </div>
            </div>
          </div>
          <div className="product-description">
            <h4>Description</h4>
            {selectedProduct["Product Description"] !== undefined ? (
              <p
                className="text-muted"
                dangerouslySetInnerHTML={{ __html: sanitizedDescriptionHTML }}
              />
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
