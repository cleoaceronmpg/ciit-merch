import React from "react";
import { useParams } from "react-router-dom";

//import Breadcrumbs
import Breadcrumbs from "../../../../components/MerchStore/Common/Breadcrumb";
import Header from "../../../../components/MerchStore/Header";
import "./styles.css";

import { Container } from "reactstrap";
import { SIZE, COLOR, CatalogProducts } from "../data";

const ProductDetails = () => {
  const { id } = useParams();
  const [selectedProduct, setSelectedProduct] = React.useState({});

  React.useEffect(() => {
    console.log(id);
    id && filterProduct(parseInt(id));
  }, [id]);

  const filterProduct = (id) => {
    const filteredProduct = CatalogProducts.find((item) => item.id === id);
    setSelectedProduct(filteredProduct);
  };

  React.useEffect(() => {
    console.log(selectedProduct);
  }, [selectedProduct]);

  //meta title
  document.title = "CIIT Merch | Product Details";

  return (
    <React.Fragment>
      <Header />
      <div
        className="page-content"
        style={{ paddingLeft: 20, paddingRight: 20 }}
      >
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs
            title="Home"
            breadcrumbItem={selectedProduct.title || ""}
          />

          <div
            className="grid grid-cols-1 gap-12 md:grid-cols-2"
            style={{
              marginBottom: 4,
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div>
              {selectedProduct.img && (
                <div
                  id="product-current-image"
                  style={{
                    backgroundColor: "rgb(246, 246, 246)",
                    minHeight: "450px",
                  }}
                  className="product-image product-single-page-image flex justify-center items-center"
                >
                  <img
                    src={selectedProduct.img}
                    alt="Nike revolution 5"
                    className="self-center"
                  />
                </div>
              )}
            </div>
            {selectedProduct.id && (
              <div className="">
                <div className="flex flex-col ">
                  <h1 className="product-single-name">
                    {selectedProduct.title}
                  </h1>
                  <h4 className="product-single-price">
                    <div>
                      <span className="sale-price">
                        {selectedProduct.price}
                      </span>
                    </div>
                  </h4>
                  <div className="product-single-sku text-textSubdued">
                    <span>Sku</span>
                    <span>: </span>
                    {selectedProduct.sku}
                  </div>
                  <div
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
                  </div>
                </div>
                <div className="">
                  <div>
                    <ul className="variant-option-list flex justify-start gap-2 flex-wrap">
                      <li className="">
                        <a href="#">X</a>
                      </li>
                      <li className="">
                        <a href="#">M</a>
                      </li>
                      <li className="">
                        <a href="#">S</a>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <ul className="variant-option-list flex justify-start gap-2 flex-wrap">
                      <li className="">
                        <a href="#">Purple</a>
                      </li>
                      <li className="">
                        <a href="#">Brown</a>
                      </li>
                    </ul>
                  </div>
                </div>
                <form
                  id="productForm"
                  action="/api/cart/mine/items"
                  method="POST"
                >
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
                            />
                          </div>
                        </div>
                      </div>
                      <div className="mt-4">
                        <button
                          type="button"
                          className="button primary outline"
                        >
                          <span>ADD TO CART</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
                <div className="mt-8 md:mt-12">
                  <div className="product-description">
                    <div className="editor__html">
                      <div className="row__container mt-12 grid md:grid-cols-1 grid-cols-1 gap-8">
                        <div className="column__container md:col-span-1 col-span-1">
                          <div className="prose prose-base max-w-none">
                            <p>
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit. Vestibulum feugiat mi eget elit elementum,
                              id pulvinar tellus eleifend.
                            </p>
                            <p>
                              Integer porttitor elit id euismod elementum. Nulla
                              vel molestie massa, eget iaculis elit. Quisque a
                              tortor vel lectus ultricies pretium quis non
                              purus. Pellentesque molestie leo eget rutrum
                              tristique.
                            </p>
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
      <div className="footerStore">
        <div
          className="page-width"
          style={{
            gap: "2rem",
            display: "grid",
            justifyContent: "flex-end",
          }}
        >
          <div
            style={{
              alignSelf: "center",
            }}
          >
            <div
              style={{
                fontSize: 13,
                opacity: 1,
                color: "#737373",
                textAlign: "center",
              }}
            >
              <span>© 2024 CIIT Merch Store. All Rights Reserved.</span>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProductDetails;
