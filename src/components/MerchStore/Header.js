import PropTypes from "prop-types";
import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

//Import Icons
import FeatherIcon from "feather-icons-react";

// Reactstrap
import { Dropdown, DropdownToggle, DropdownMenu, Row, Col } from "reactstrap";

// Import menuDropdown
import LanguageDropdown from "../CommonForBoth/TopbarDropdown/LanguageDropdown";
import NotificationDropdown from "./CommonForBoth/TopbarDropdown/NotificationDropdown";
import ProfileMenu from "./CommonForBoth/TopbarDropdown/ProfileMenu";
import LightDark from "../CommonForBoth/Menus/LightDark";

// import images
import logoSvg from "../../assets/images/weare-logo.png";
import github from "../../assets/images/brands/github.png";
import bitbucket from "../../assets/images/brands/bitbucket.png";
import dribbble from "../../assets/images/brands/dribbble.png";
import dropbox from "../../assets/images/brands/dropbox.png";
import mail_chimp from "../../assets/images/brands/mail_chimp.png";
import slack from "../../assets/images/brands/slack.png";

//i18n
import { withTranslation } from "react-i18next";
//redux
import { useSelector, useDispatch } from "react-redux";

// Redux Store
import {
  showRightSidebarAction,
  toggleLeftmenu,
  changeSidebarType,
  changelayoutMode,
} from "../../store/actions";
import { createSelector } from "reselect";
import { actionCreator } from "../../store";

const Header = (props) => {
  const dispatch = useDispatch();

  const [socialDrp, setsocialDrp] = useState(false);
  const [isClick, setClick] = useState(true);

  // React.useEffect(() => {
  //   const body = document.body;
  //   body.classList.remove("sidebar-enable");
  //   document.body.setAttribute("data-sidebar-size", "sm");
  // }, []);
  /*** Sidebar menu icon and default menu set */
  function tToggle() {
    const body = document.body;
    setClick(!isClick);
    if (isClick === true) {
      body.classList.remove("sidebar-enable");
      document.body.setAttribute("data-sidebar-size", "sm");
    } else {
      body.classList.add("sidebar-enable");
      document.body.setAttribute("data-sidebar-size", "lg");
    }
  }

  return (
    <React.Fragment>
      <header id="page-topbar">
        <div className="navbar-header">
          <div className="d-flex">
            <div
              className="navbar-brand-box"
              style={{
                boxShadow: "none",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "none",
                borderRight: "none",
              }}
            >
              <Link to="/home" className="logo logo-dark">
                <span className="logo-sm">
                  <img src={logoSvg} alt="" height="24" />
                </span>
                <span className="logo-lg">
                  <img src={logoSvg} alt="" height="24" />{" "}
                  <span className="logo-txt">CIIT Merch ❤️ </span>
                </span>
              </Link>

              <Link to="/home" className="logo logo-light">
                <span className="logo-sm">
                  <img src={logoSvg} alt="" height="24" />
                </span>
                <span className="logo-lg">
                  <img src={logoSvg} alt="" height="24" />{" "}
                  <span className="logo-txt">CIIT Merch ❤️ </span>
                </span>
              </Link>
            </div>

            <div
              className="dropdown d-inline-block d-none d-lg-block"
              style={{
                marginTop: 20,
              }}
            >
              <ul
                style={{
                  display: "flex",
                  listStyle: "none",
                  width: 300,
                  justifyContent: "space-between",
                }}
              >
                <li>
                  <Link
                    className="dropdown-icon-item"
                    to="/home"
                    style={{
                      color: "#00364d",
                      fontSize: "1rem",
                      fontWeight: 700,
                    }}
                  >
                    <span>Home</span>
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-icon-item"
                    to="/catalog"
                    style={{
                      color: "#00364d",
                      fontSize: "1rem",
                      fontWeight: 700,
                    }}
                  >
                    <span>Catalog</span>
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-icon-item"
                    to="/contact"
                    style={{
                      color: "#00364d",
                      fontSize: "1rem",
                      fontWeight: 700,
                    }}
                  >
                    <span>Contact</span>
                  </Link>
                </li>
              </ul>
            </div>
            {/* <button
              onClick={() => {
                tToggle();
              }}
              type="button"
              className="btn btn-sm px-3 font-size-16 header-item"
              id="vertical-menu-btn"
            >
              <i className="fa fa-fw fa-bars"></i>
            </button> */}

            {/* <form className="app-search d-none d-lg-block">
              <div className="position-relative">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search..."
                />
                <button className="btn btn-primary" type="button">
                  <i className="bx bx-search-alt align-middle"></i>
                </button>
              </div>
            </form> */}
          </div>

          {/* <div className="d-flex">
            <div className="dropdown d-inline-block d-lg-none ms-2">
              <ul
                style={{
                  display: "flex",
                  listStyle: "none",
                  width: 200,
                  justifyContent: "space-between",
                }}
              >
                <li>
                  <a href="/home">Home</a>
                </li>
                <li>
                  <a href="/catalog">Catalog</a>
                </li>
                <li>
                  <a href="/contact">Contact</a>
                </li>
              </ul>
            </div>
          </div> */}
          <div className="d-flex">
            <Dropdown
              className="dropdown d-inline-block d-lg-none ms-2"
              isOpen={socialDrp}
              toggle={() => {
                setsocialDrp(!socialDrp);
              }}
            >
              <DropdownToggle
                className="btn header-item noti-icon "
                tag="button"
              >
                <FeatherIcon icon="grid" className="icon-lg" />
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-lg dropdown-menu-end">
                <div className="p-2">
                  <Row className="g-0">
                    <Col>
                      <Link
                        className="dropdown-icon-item"
                        to="/home"
                        style={{
                          color: "#00364d",
                          fontSize: "1rem",
                          fontWeight: 700,
                        }}
                      >
                        <span>Home</span>
                      </Link>
                    </Col>
                    <Col>
                      <Link
                        className="dropdown-icon-item"
                        to="/catalog"
                        style={{
                          color: "#00364d",
                          fontSize: "1rem",
                          fontWeight: 700,
                        }}
                      >
                        <span>Catalog</span>
                      </Link>
                    </Col>
                    <Col>
                      <Link
                        className="dropdown-icon-item"
                        to="/contact"
                        style={{
                          color: "#00364d",
                          fontSize: "1rem",
                          fontWeight: 700,
                        }}
                      >
                        <span>Contact</span>
                      </Link>
                    </Col>
                  </Row>
                </div>
              </DropdownMenu>
            </Dropdown>
            {/* <div className="dropdown d-inline-block d-lg-none ms-2">
              <button
                onClick={() => {
                  setsearch(!search);
                }}
                type="button"
                className="btn header-item noti-icon "
                id="page-header-search-dropdown"
              >
                <i className="mdi mdi-magnify" />
              </button>
              <div
                className={
                  search
                    ? "dropdown-menu dropdown-menu-lg dropdown-menu-end p-0 show"
                    : "dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"
                }
                aria-labelledby="page-header-search-dropdown"
              >
                <form className="p-3">
                  <div className="form-group m-0">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search ..."
                        aria-label="Recipient's username"
                      />
                      <div className="input-group-append">
                        <button className="btn btn-primary" type="submit">
                          <i className="mdi mdi-magnify" />
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div> */}

            {/* <LanguageDropdown /> */}

            {/* light / dark mode */}
            {/* <LightDark
              layoutMode={props["layoutMode"]}
              onChangeLayoutMode={onChangeLayoutMode}
            />

            <Dropdown
              className="d-none d-lg-inline-block ms-1"
              isOpen={socialDrp}
              toggle={() => {
                setsocialDrp(!socialDrp);
              }}
            >
              <DropdownToggle
                className="btn header-item noti-icon "
                tag="button"
              >
                <FeatherIcon icon="grid" className="icon-lg" />
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-lg dropdown-menu-end">
                <div className="p-2">
                  <Row className="g-0">
                    <Col>
                      <Link className="dropdown-icon-item" to="#">
                        <img src={github} alt="Github" />
                        <span>GitHub</span>
                      </Link>
                    </Col>
                    <Col>
                      <Link className="dropdown-icon-item" to="#">
                        <img src={bitbucket} alt="bitbucket" />
                        <span>Bitbucket</span>
                      </Link>
                    </Col>
                    <Col>
                      <Link className="dropdown-icon-item" to="#">
                        <img src={dribbble} alt="dribbble" />
                        <span>Dribbble</span>
                      </Link>
                    </Col>
                  </Row>

                  <Row className="g-0">
                    <Col>
                      <Link className="dropdown-icon-item" to="#">
                        <img src={dropbox} alt="dropbox" />
                        <span>Dropbox</span>
                      </Link>
                    </Col>
                    <Col>
                      <Link className="dropdown-icon-item" to="#">
                        <img src={mail_chimp} alt="mail_chimp" />
                        <span>Mail Chimp</span>
                      </Link>
                    </Col>
                    <Col>
                      <Link className="dropdown-icon-item" to="#">
                        <img src={slack} alt="slack" />
                        <span>Slack</span>
                      </Link>
                    </Col>
                  </Row>
                </div>
              </DropdownMenu>
            </Dropdown> */}

            <NotificationDropdown />
            {/* <div
              onClick={() => {
                dispatch(showRightSidebarAction(!showRightSidebar));
              }}
              className="dropdown d-inline-block"
            >
              <button
                type="button"
                className="btn header-item noti-icon right-bar-toggle "
              >
                <FeatherIcon icon="settings" className="icon-lg" />
              </button>
            </div> */}
            <ProfileMenu />
          </div>
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
