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
      console.log("selectedProduct --------------", selectedProduct);
      console.log("existing cart --------------", cart.data);
      console.log("sameCartVariant --------------", sameCartVariant);

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
      <div
        className="page-content"
        style={{ paddingLeft: 20, paddingRight: 20 }}
      >
        <Container>
          {/* Render Breadcrumbs */}
          <Breadcrumbs
            title="Catalog"
            breadcrumbItem={selectedProduct["Product Name"] || ""}
          />

          <div
            className="gap-12"
            style={{
              marginBottom: 4,
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <div>
              {selectedProduct?.Images && selectedProduct.Images.length > 0 && (
                <div
                  id="product-current-image"
                  style={{
                    backgroundColor: "rgb(246, 246, 246)",
                    minHeight: "450px",
                  }}
                  className="product-image product-single-page-image flex justify-center items-center"
                >
                  <img
                    src={selectedProduct.Images[0].url}
                    alt={selectedProduct["Product Name"]}
                    className="self-center-details"
                  />
                </div>
              )}
            </div>
            {selectedProduct["Product ID"] && (
              <div className="">
                <div className="flex flex-col ">
                  <h1 className="product-single-name">
                    {selectedProduct["Product Name"]}
                  </h1>
                  <h4 className="product-single-price">
                    <div>
                      <span className="sale-price">
                        ₱{" "}
                        {parseInt(selectedProduct.Price).toLocaleString(
                          "en-US"
                        )}{" "}
                        PHP
                      </span>
                    </div>
                  </h4>
                  <div
                    className="product-single-sku text-textSubdued"
                    style={{
                      marginBottom: 20,
                    }}
                  >
                    <span>Sku</span>
                    <span>: </span>
                    {selectedProduct["Product ID"]}
                  </div>
                  {/* <div
                    className="specification"
                    style={{
                      marginTop: 10,
                    }}
                  >
                    <ul className="list-disc list-inside">
                      <li>
                        <strong>Color</strong>{" "}
                        <span>{selectedProduct.color}</span>
                      </li>
                    </ul>
                  </div> */}
                </div>
                <div className="">
                  <div id="size">
                    <ul className="variant-option-list flex justify-start gap-2 flex-wrap">
                      {SIZE.map((item, index) => (
                        <li
                          key={index}
                          className={selectedSize === item.id ? "selected" : ""}
                        >
                          <a
                            href="#size"
                            onClick={() => setSelectedSize(item.id)}
                          >
                            {item.size}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div id="color">
                    <ul className="variant-option-list flex justify-start gap-2 flex-wrap">
                      {COLOR.map((item, index) => (
                        <li
                          key={index}
                          className={
                            selectedColor === item.id ? "selected" : ""
                          }
                        >
                          <a
                            href="#color"
                            onClick={() => setSelectedColor(item.id)}
                          >
                            {item.color}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="">
                  <div className="add-to-cart mt-8">
                    <div style={{ width: "5rem" }}>
                      <div className="form-field-container null">
                        <div className="field-wrapper flex flex-grow">
                          <span
                            style={{
                              marginRight: 10,
                              marginTop: 10,
                            }}
                          >
                            Quantity:{" "}
                          </span>
                          <input
                            style={{
                              border: "1px solid #e1e3e5",
                              width: 80,
                              padding: 10,
                            }}
                            type="text"
                            name="qty"
                            placeholder="Qty"
                            defaultValue="1"
                            onChange={(e) => setSelectedQty(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <Button
                        className="btn btn-primary w-100 waves-effect waves-light"
                        type="button"
                        style={{
                          backgroundColor: "#ff5400",
                          borderColor: "#ff5400",
                          maxWidth: "50%",
                        }}
                        color="primary"
                        onClick={() => addToCart()}
                      >
                        <span>ADD TO CART</span>
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="mt-8 md:mt-12">
                  <div className="product-description">
                    <div className="editor__html">
                      <div className="row__container mt-12 grid md:grid-cols-1 grid-cols-1 gap-8">
                        <div className="column__container md:col-span-1 col-span-1">
                          <div className="prose prose-base max-w-none">
                            {selectedProduct["Product Description"] !==
                            undefined ? (
                              <p>{selectedProduct["Product Description"]}</p>
                            ) : (
                              <p>Description not available</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Container>
      </div>
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
