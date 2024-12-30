import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
//Import Icons
import FeatherIcon from "feather-icons-react";
// Reactstrap
import {
  Container,
  Row,
  Col,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
//redux
import { actionCreator, types } from "../../store";
import "./styles.css";

import weareLogo from "../../assets/images/weare-logo-white.png";
import cartIcon from "../../assets/images/cart.png";

const Header = ({ authentication, ...props }) => {
  let navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen(!dropdownOpen);
  const [search, setsearch] = React.useState(true);
  const [minTopNav, setMinTopNav] = React.useState(false);

  React.useEffect(() => {
    console.log("authentication", authentication);
  }, [authentication]);

  const setTopNav = () => {
    if (minTopNav) {
      setMinTopNav(false);
    } else {
      setMinTopNav(true);
    }
  };

  return (
    <React.Fragment>
      <header
        id="page-topbar"
        style={{
          position: "relative",
        }}
      >
        <div
          className="top-bar-min-menu"
          style={{
            backgroundColor: "#00364D",
            width: "100%",
          }}
        >
          <div className="top-nav">
            <Link onClick={() => setTopNav()}>
              <i className="dripicons-menu"></i>
            </Link>
            <div
              className={`top-nav-links ${minTopNav ? "top-nav-links-active" : ""}`}
            >
              {authentication.authenticated ? (
                <>
                  <a href="/profile">Profile</a>
                  <a href="#">Notification</a>
                  <a
                    href="#"
                    onClick={() => {
                      props.actionCreator({
                        type: types.LOGOUT_USER,
                      });
                    }}
                  >
                    Logout
                  </a>
                </>
              ) : (
                <>
                  <a
                    href="https://www.facebook.com/messages/t/502903216233917"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Chat Us
                  </a>
                  <a href="/login">Login</a>
                  <a href="/register">Sign Up</a>
                </>
              )}
            </div>
          </div>
        </div>
        <div
          className="top-bar-menu"
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
              <Col lg={6} md={5} sm={12} xxl={6}>
                <div className="left-upper-header">
                  <span className="welcome-container">
                    Welcome to WeAre, CIIT’s Official Merch{" "}
                  </span>
                  {/* <span className="top-nav-divider"> | </span>
                  <span className="follow-container">
                    Follow us on{"  "}
                    <a
                      href="https://bit.ly/3D4mPPq"
                      style={{
                        color: "#fff",
                      }}
                    >
                      <i
                        className="fab fa-facebook-f"
                        style={{ height: 15, width: 15, marginLeft: 10 }}
                      ></i>
                    </a>
                    <a
                      href="https://bit.ly/3Vr8h2m"
                      style={{
                        color: "#fff",
                      }}
                    >
                      <i
                        className="fab fa-instagram"
                        style={{ height: 15, width: 15, marginLeft: 8 }}
                      ></i>
                    </a>
                  </span> */}
                </div>
              </Col>
              <Col lg={6} md={7} sm={12} xxl={6}>
                <div className="rightUpperHeader">
                  <span>
                    <i className="bx bx-bell"></i> Notifications
                  </span>
                  <span>
                    <Link
                      to={"https://www.facebook.com/messages/t/502903216233917"}
                      target="_blank"
                    >
                      <i className="bx bx-message-rounded-dots"></i> Chat us
                    </Link>
                  </span>
                  {authentication.authenticated ? (
                    <>
                      {" "}
                      <span>
                        <a href="/profile" style={{ color: "#fff" }}>
                          Hello! {authentication.data?.fields?.FullName || ""}
                        </a>
                      </span>
                      <span>
                        |{" "}
                        <a
                          href="#"
                          style={{ color: "#fff" }}
                          onClick={() => {
                            props.actionCreator({
                              type: types.LOGOUT_USER,
                            });
                          }}
                        >
                          Logout
                        </a>
                      </span>
                    </>
                  ) : (
                    <>
                      {" "}
                      <span>
                        <a href="/login" style={{ color: "#fff" }}>
                          Login
                        </a>
                      </span>
                      <span>
                        |{" "}
                        <a href="/register" style={{ color: "#fff" }}>
                          Sign-up
                        </a>
                      </span>
                    </>
                  )}
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
                paddingTop: 20,
                paddingBottom: 25,
              }}
            >
              <Col className="logo-container" lg={4} xxl={4} md={4}>
                <Link to="/home">
                  <img
                    src={weareLogo}
                    width={94}
                    height={27}
                    style={{
                      marginRight: 10,
                    }}
                  />
                </Link>
                <h5
                  className="ciitMerchLogo text-white"
                  style={{
                    fontSize: 24,
                    fontWeight: 700,
                    margin: 0,
                  }}
                >
                  CIIT Merch
                </h5>
              </Col>
              <Col>
                <div className="search-container">
                  <div className="search-form">
                    <form>
                      <div className="form-group m-0">
                        <div className="input-group">
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
                  <Link to="/cart">
                    <img src={cartIcon} width={35} height={35} />
                  </Link>
                </div>
              </Col>
            </Row>
            {/* <Row className="category-container">
              <Col lg={12} xxl={12}>
                <ul className="category">
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
            </Row> */}
          </Container>
        </div>
      </header>
    </React.Fragment>
  );
};

const mapStateToProps = ({ layout, app, authentication, ...state }) => {
  const { layoutMode } = layout;
  return { app, authentication, layout, layoutMode };
};

export default connect(mapStateToProps, { actionCreator })(Header);
