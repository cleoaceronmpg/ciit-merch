import React from "react";
import { useLocation } from "react-router-dom";

//import Breadcrumbs
import Breadcrumbs from "../../../components/MerchStore/Common/Breadcrumb";
import Header from "../../../components/MerchStore/Header";
import Footer from "../../../components/MerchStore/Footer";
import "./styles.css";

import { Container } from "reactstrap";
import { SIZE, COLOR, CatalogProducts } from "./data";

const Catalog = () => {
  const location = useLocation();
  const [catalog, setCatalog] = React.useState(null);
  // Access the passed data
  const { collection } = location.state || { collection: "Catalog" };

  React.useEffect(() => {
    collection && setCatalog(collection);
  }, []);

  //meta title
  document.title = "CIIT Merch | Catalog";

  return (
    <React.Fragment>
      <Header />
      <div
        className="page-content"
        style={{ paddingLeft: 20, paddingRight: 20 }}
      >
        <Container>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Home" breadcrumbItem={catalog} />

          <div
            style={{
              marginBottom: 4,
            }}
          >
            <h1
              style={{
                fontWeight: 800,
                fontSize: "2.25em",
                color: "#111827",
                textTransform: "uppercase",
                lineHeight: 1.1111111,
              }}
            >
              {catalog && catalog}
            </h1>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <div
              className="dropdown d-inline-block d-md-none"
              style={{
                marginBottom: 4,
              }}
            />
            <div
              className="dropdown d-inline-block d-none d-md-block"
              style={{
                marginBottom: 4,
              }}
            >
              <span
                style={{
                  fontWeight: 700,
                }}
              >
                Shop by
              </span>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingRight: 10,
                }}
              >
                <span>Sort By:</span>
              </div>
              <div
                style={{
                  width: 160,
                }}
              >
                <div className="form-field-container dropdown null">
                  <div
                    style={{
                      alignItems: "baseline",
                      display: "flex",
                      backgroundColor: "#fff",
                      position: "relative",
                    }}
                  >
                    <select
                      className="form-field"
                      placeholder="Default"
                      style={{
                        width: 100,
                      }}
                    >
                      <option value="">Default</option>
                      <option value="price">Price</option>
                      <option value="name">Name</option>
                    </select>
                    <div className="field-border"></div>
                    <div
                      style={{
                        margin: 10,
                      }}
                    >
                      <svg
                        viewBox="0 0 20 20"
                        width="1rem"
                        height="1.25rem"
                        focusable="false"
                        aria-hidden="true"
                      >
                        <path d="m10 16-4-4h8l-4 4zm0-12 4 4H6l4-4z"></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 20,
            }}
          >
            <div
              className="dropdown d-inline-block d-none d-md-block"
              style={{
                width: 400,
                paddingRight: 30,
              }}
            >
              <div
                style={{
                  borderBottom: "#ced4da solid 1px",
                  paddingBottom: 5,
                }}
              >
                <span
                  style={{
                    fontWeight: 500,
                    letterSpacing: "0.2em",
                  }}
                >
                  SIZE
                </span>
              </div>
              {SIZE.map((item, index) => (
                <div
                  className="form-check"
                  key={index}
                  style={{
                    marginTop: 10,
                    marginLeft: 5,
                  }}
                >
                  <input
                    type="checkbox"
                    className="form-check-input"
                    onChange={() => console.log("check!")}
                    id="formCheck2"
                    style={{
                      width: 20,
                      height: 20,
                    }}
                  />
                  <label
                    style={{
                      marginLeft: 10,
                      marginTop: 3,
                    }}
                    className="form-check-label"
                    htmlFor="formCheck2"
                  >
                    {item.size}
                  </label>
                </div>
              ))}
              <div
                style={{
                  borderBottom: "#ced4da solid 1px",
                  paddingBottom: 5,
                  marginTop: 20,
                }}
              >
                <span
                  style={{
                    fontWeight: 500,
                    letterSpacing: "0.2em",
                  }}
                >
                  COLOR
                </span>
              </div>
              {COLOR.map((item, index) => (
                <div
                  className="form-check"
                  key={index}
                  style={{
                    marginTop: 10,
                    marginLeft: 5,
                  }}
                >
                  <input
                    type="checkbox"
                    className="form-check-input"
                    onChange={() => console.log("check!")}
                    id="formCheck2"
                    style={{
                      width: 20,
                      height: 20,
                    }}
                  />
                  <label
                    style={{
                      marginLeft: 10,
                      marginTop: 3,
                    }}
                    className="form-check-label"
                    htmlFor="formCheck2"
                  >
                    {item.color}
                  </label>
                </div>
              ))}
            </div>
            <div
              className="grid grid-cols-2 md:grid-cols-3 gap-8"
              style={{
                width: "100%",
              }}
            >
              {CatalogProducts.map((item, index) => (
                <div
                  key={index}
                  className="listing-tem"
                  style={{
                    width: "100%",
                  }}
                >
                  <div className="product-thumbnail-listing2">
                    <a href={`/product/${item.id}`}>
                      <img
                        src={item.img}
                        alt={item.title}
                        className="catalog-image"
                        height={200}
                        width={200}
                      />
                    </a>
                  </div>
                  <div
                    className="product-name product-list-name mt-4 mb-1"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <a
                      href="/kids/continental-80-shoes-54"
                      className="font-bold hover:underline h5"
                    >
                      <span
                        style={{
                          fontSize: 18,
                        }}
                      >
                        {item.title}
                      </span>
                    </a>
                  </div>
                  <div
                    className="product-price-listing"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <div>
                      <span className="sale-price font-semibold">
                        ₱ {parseInt(item.price).toLocaleString("en-US")} PHP
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Catalog;
