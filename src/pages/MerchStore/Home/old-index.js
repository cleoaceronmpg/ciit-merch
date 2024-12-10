import React from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { actionCreator, types } from "../../../store";

//import Breadcrumbs
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import Header from "../../../components/MerchStore/Header";
import "./styles.css";
import tshirtLogo from "../../../assets/images/merch01-tshirt.png";

import { Container } from "reactstrap";
import { collectionData, featureProductsData } from "./data";

const Home = ({ authentication, ...props }) => {
  let navigate = useNavigate();
  //meta title
  document.title = "CIIT Merch | Home";

  return (
    <React.Fragment>
      <Header />
      <div className="page-content" style={{ paddingLeft: 0, paddingRight: 0 }}>
        {/* Render Breadcrumbs */}
        <div className="banner-container">
          <div className="banner">
            <div
              style={{
                flex: "1 0 175px",
                textAlign: "center",
                padding: "30px",
              }}
            >
              <img src={tshirtLogo} width="300" height="300" />
            </div>
            <div
              style={{
                flex: "1 0 300px",
                maxWidth: 800,
                textAlign: "left",
                padding: "20px",
              }}
            >
              <h1
                style={{
                  fontSize: "2rem",
                  fontWeight: 800,
                  color: "#fff",
                }}
              >
                Your Heading Here
              </h1>
              <p
                style={{
                  fontSize: "1rem",
                  color: "#fff",
                  marginTop: 20,
                  marginBottom: 20,
                }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Praesent ultricies sodales mi, at ornare elit semper ac.
              </p>
              <a
                href="#"
                className="shopnow"
                onClick={() => {
                  navigate("/catalog");
                }}
              >
                SHOP NOW
              </a>
            </div>
          </div>
        </div>
        <div className="text-block-widget page-width">
          <div className="editor__html">
            <div
              className=" mt-12 grid md:grid-cols-3 grid-cols-1 gap-8"
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
              }}
            >
              {collectionData.length > 0 &&
                collectionData.map((item, index) => (
                  <div
                    key={index}
                    className="col-span-1"
                    style={{
                      width: 350,
                    }}
                  >
                    <div className="prose prose-base max-w-none">
                      <h3
                        style={{
                          color: "#00364d",
                        }}
                      >
                        {item.title}
                      </h3>
                      <p>{item.description}</p>
                      <div>
                        <a
                          href={"#"}
                          className="button primary"
                          onClick={() => {
                            navigate("/catalog", {
                              state: { collection: item.btnName }, // Pass your data here
                            });
                          }}
                        >
                          <span>{item.btnName}</span>
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="pt-12">
          <div className="page-width">
            <h3 className="mt-12 mb-12 text-center uppercase tracking-widest">
              Featured Products
            </h3>
            <div className="grid grid-cols-2 grid-cols-4 gap-8">
              {featureProductsData.length > 0 &&
                featureProductsData.map((item, index) => (
                  <div key={index} className="listing-tem">
                    <div className="product-thumbnail-listing">
                      <a href={`/product/${item.id}`}>
                        <img
                          src={item.img}
                          alt={item.title}
                          style={{
                            maxWidth: "100%",
                            height: "auto",
                            display: "block",
                            verticalAlign: "middle",
                          }}
                        />
                      </a>
                    </div>
                    <div
                      className="product-name product-list-name mt-4 mb-1"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <a
                        href={item.url}
                        className="font-bold hover:underline h5"
                      >
                        <span>{item.title}</span>
                      </a>
                    </div>
                    <div
                      className="product-price-listing"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <div>
                        <span className="sale-price font-semibold">
                          {item.price}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
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
              <span>
                © {new Date().getFullYear()} CIIT Merch Store. All Rights
                Reserved.
              </span>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = ({ authentication }) => ({ authentication });

export default connect(mapStateToProps, { actionCreator })(Home);
