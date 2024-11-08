import React from "react";
import { useNavigate } from "react-router-dom";

//import Breadcrumbs
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import Header from "../../../components/MerchStore/Header";
import "./styles.css";

import { Container } from "reactstrap";
import { collectionData, featureProductsData } from "./data";

const Home = () => {
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
              //className="banner-image"
              style={{
                flex: "1 0 175px", // Flex shorthand for flex-grow, flex-shrink, and flex-basis
                textAlign: "center", // CamelCase for CSS properties in JSX
                padding: "30px",
              }}
            >
              <svg
                width="300"
                height="300"
                viewBox="0 0 128 146"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  fill: "#0056b3",
                  color: "#0056b3",
                }}
              >
                <path
                  d="M32.388 18.0772L1.15175 36.1544L1.05206 72.5081L0.985596 108.895L32.4213 127.039C49.7009 137.008 63.9567 145.182 64.1228 145.182C64.289 145.182 72.8956 140.264 83.2966 134.283C93.6644 128.268 107.82 120.127 114.732 116.139L127.26 108.895V101.119V93.3102L126.529 93.7089C126.097 93.9415 111.941 102.083 95.06 111.853C78.1459 121.622 64.156 129.531 63.9567 129.498C63.724 129.431 52.5587 123.051 39.1005 115.275L14.6099 101.152V72.5746V43.9967L25.6756 37.6165C31.7234 34.1274 42.8223 27.7472 50.2991 23.4273C57.7426 19.1073 63.9899 15.585 64.1228 15.585C64.2557 15.585 72.9288 20.5362 83.3963 26.5841L113.902 43.9967L118.713 41.1657L127.26 36.1544L113.902 28.5447C103.334 22.2974 64.3554 -0.033191 64.0231 3.90721e-05C63.8237 3.90721e-05 49.568 8.14142 32.388 18.0772Z"
                  fill="#0056b3"
                ></path>
                <path
                  d="M96.0237 54.1983C78.9434 64.0677 64.721 72.2423 64.4219 72.3088C64.0896 72.4084 55.7488 67.7562 44.8826 61.509L25.9082 50.543V58.4186L25.9414 66.2609L44.3841 76.8945C54.5193 82.743 63.1591 87.6611 63.5911 87.8272C64.2557 88.0598 68.9079 85.5011 95.5585 70.1156C112.705 60.1798 126.861 51.9719 127.027 51.839C127.16 51.7061 127.227 48.1505 127.194 43.9302L127.094 36.2541L96.0237 54.1983Z"
                  fill="#0056b3"
                ></path>
                <path
                  d="M123.771 66.7261C121.943 67.7562 107.854 75.8976 92.4349 84.8033C77.0161 93.7089 64.289 100.986 64.1228 100.986C63.9567 100.986 55.3501 96.0683 44.9491 90.0869L26.0744 79.1874L25.9747 86.8303C25.9082 92.6788 26.0079 94.5729 26.307 94.872C26.9383 95.4369 63.7241 116.604 64.1228 116.604C64.4551 116.604 126.496 80.8821 127.027 80.4169C127.16 80.284 127.227 76.7284 127.194 72.4749L127.094 64.7987L123.771 66.7261Z"
                  fill="#0056b3"
                ></path>
              </svg>
            </div>
            <div
              //className="banner-description"
              style={{
                flex: "1 0 300px", // Flex shorthand for flex-grow, flex-shrink, and flex-basis
                maxWidth: 800,
                textAlign: "left", // CamelCase for CSS properties in JSX
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
                      <h3>{item.title}</h3>
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
                      <a href={item.url}>
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
              <span>© 2024 CIIT Merch Store. All Rights Reserved.</span>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Home;
