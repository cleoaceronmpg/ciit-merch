import React from "react";

//import Breadcrumbs
import Breadcrumbs from "../../../components/MerchStore/Common/Breadcrumb";
import Header from "../../../components/MerchStore/Header";
import "./styles.css";

import { Container } from "reactstrap";
import { collectionData, featureProductsData } from "./data";

const Home = () => {
  //meta title
  document.title = "CIIT Merch | Catalog";

  return (
    <React.Fragment>
      <Header />
      <div className="page-content" style={{ paddingLeft: 0, paddingRight: 0 }}>
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Home" breadcrumbItem="Senior High" />

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
              Senior High
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
              className="dropdown d-inline-block d-lg-none"
              style={{
                marginBottom: 4,
              }}
            />
            <div
              className="dropdown d-inline-block d-none d-lg-block"
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
                    <select className="form-field" placeholder="Default">
                      <option selected="" value="">
                        Default
                      </option>
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
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Home;
