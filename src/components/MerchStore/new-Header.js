import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
//Import Icons
import FeatherIcon from "feather-icons-react";
// Reactstrap
import { Container, Row, Col } from "reactstrap";
//redux
import { actionCreator } from "../../store";
import "./styles.css";

import weareLogo from "../../assets/images/weare-logo-white.png";
import cartIcon from "../../assets/images/cart.png";

const Header = (props) => {
  const [search, setsearch] = React.useState(true);
  return (
    <React.Fragment>
      <header
        id="page-topbar"
        style={{
          position: "relative",
        }}
      >
        <div
          style={{
            backgroundColor: "#00364D",
            width: "100%",
          }}
        >
          <Container
            className="p-0"
            style={{
              miHeight: 30,
            }}
          >
            <Row>
              <Col lg={6} md={6} sm={12} xxl={6}>
                <div className="leftUpperHeader">
                  <span style={{ marginRight: 15 }}>
                    Welcome to WeAre, CIIT’s Official Merch{" "}
                  </span>
                  <span> | </span>
                  <span style={{ marginLeft: 15 }}>
                    Follow us on{"  "}
                    <i
                      className="fab fa-facebook-f"
                      style={{ height: 15, width: 15, marginLeft: 10 }}
                    ></i>
                    <i
                      className="fab fa-instagram"
                      style={{ height: 15, width: 15 }}
                    ></i>
                  </span>
                </div>
              </Col>
              <Col lg={6} md={6} sm={12} xxl={6}>
                <div className="rightUpperHeader">
                  <span>
                    <i className="bx bx-bell"></i> Notifications
                  </span>
                  <span>
                    <i className="bx bx-message-rounded-dots"></i> Chat us
                  </span>
                  <span>Sign-in</span>
                  <span>| Sign-up</span>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <div
          style={{
            backgroundColor: "#FF5400",
            width: "100%",
          }}
        >
          <Container
            className="p-0"
            style={{
              miHeight: 70,
            }}
          >
            <Row
              style={{
                paddingTop: 15,
                paddingBottom: 15,
              }}
            >
              <Col
                lg={4}
                xxl={4}
                style={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <img
                  src={weareLogo}
                  width={94}
                  height={27}
                  style={{
                    marginRight: 10,
                  }}
                />
                <h5
                  className="text-white"
                  style={{
                    fontSize: 24,
                    fontWeight: 700,
                    marginTop: 2,
                  }}
                >
                  CIIT Merch
                </h5>
              </Col>
              <Col
                style={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <div
                  className="d-inline-block ms-2"
                  style={{
                    width: 500,
                    marginRight: 10,
                  }}
                >
                  <form>
                    <div className="form-group m-0">
                      <div
                        className="input-group"
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          width: "100%",
                        }}
                      >
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search Anything ..."
                          aria-label="Recipient's username"
                        />
                        <div
                          className="input-group-append"
                          style={{
                            backgroundColor: "white",
                            borderTopRightRadius: 4,
                            borderBottomRightRadius: 4,
                          }}
                        >
                          <button className="btn" type="submit">
                            <i className="mdi mdi-magnify" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                <img src={cartIcon} width={35} height={35} />
              </Col>
            </Row>
            <Row
              style={{
                marginTop: 10,
              }}
            >
              <Col lg={12} xxl={12}>
                <ul
                  className=""
                  style={{
                    listStyle: "none",
                    display: "flex",
                    flexDirection: "row",
                    color: "#fff",
                    padding: 0,
                  }}
                >
                  <li
                    style={{
                      borderRight: "#fff solid 2px",
                      paddingRight: 5,
                    }}
                  >
                    {" "}
                    Category{" "}
                  </li>
                  <li
                    style={{
                      borderRight: "#fff solid 2px",
                      paddingLeft: 5,
                      paddingRight: 5,
                    }}
                  >
                    {" "}
                    Basic Tees{" "}
                  </li>
                  <li
                    style={{
                      borderRight: "#fff solid 2px",
                      paddingLeft: 5,
                      paddingRight: 5,
                    }}
                  >
                    {" "}
                    Polo Shirts{" "}
                  </li>
                  <li
                    style={{
                      borderRight: "#fff solid 2px",
                      paddingLeft: 5,
                      paddingRight: 5,
                    }}
                  >
                    {" "}
                    PE/NTSP Uniform{" "}
                  </li>
                  <li
                    style={{
                      borderRight: "#fff solid 2px",
                      paddingLeft: 5,
                      paddingRight: 5,
                    }}
                  >
                    {" "}
                    Jacket / Hoodies{" "}
                  </li>
                  <li
                    style={{
                      paddingLeft: 5,
                    }}
                  >
                    {" "}
                    Accessories / Others...{" "}
                  </li>
                </ul>
              </Col>
            </Row>
          </Container>
        </div>
      </header>
    </React.Fragment>
  );
};

const mapStateToProps = ({ layout, app, ...state }) => {
  const { layoutMode } = layout;
  return { app, layout, layoutMode };
};

export default connect(mapStateToProps, { actionCreator })(Header);
