import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

//Import Icons
import FeatherIcon from "feather-icons-react";

// Reactstrap

// Import menuDropdown
import ProfileMenu from "../CommonForBoth/TopbarDropdown/ProfileMenu";
import LightDark from "../CommonForBoth/Menus/LightDark";

// import images
import stEngrLogo from "../../assets/images/ste-logo.png";

import { actionCreator } from "../../store";

const Header = ({ app, layout, ...props }) => {
  const body = document.body;
  const { onChangeLayoutMode } = props;
  const [isClick, setClick] = useState(true);

  //React.useEffect(() => {
  // body.classList.remove("sidebar-enable");
  // document.body.setAttribute("data-sidebar-size", "sm");
  // }, []);

  /*** Sidebar menu icon and default menu set */
  function tToggle() {
    setClick(!isClick);
    if (isClick === true) {
      body.classList.add("sidebar-enable");
      document.body.setAttribute("data-sidebar-size", "lg");
    } else {
      body.classList.remove("sidebar-enable");
      document.body.setAttribute("data-sidebar-size", "sm");
    }
  }

  return (
    <React.Fragment>
      <header id="page-topbar">
        <div className="navbar-header">
          <div className="d-flex">
            <div className="navbar-brand-box">
              <Link to="/dashboard" className="logo logo-dark">
                <span className="logo-sm">
                  <img src={stEngrLogo} alt="" height="24" />
                </span>
                <span className="logo-lg">
                  <img src={stEngrLogo} alt="" height="24" />{" "}
                  <span
                    className="logo-txt"
                    style={{
                      fontFamily: "Roboto",
                    }}
                  >
                    ST Engineering
                  </span>
                </span>
              </Link>

              <Link to="/dashboard" className="logo logo-light">
                <span className="logo-sm">
                  <img src={stEngrLogo} alt="" height="24" />
                </span>
                <span className="logo-lg">
                  <img src={stEngrLogo} alt="" height="24" />{" "}
                  <span
                    className="logo-txt"
                    style={{
                      fontFamily: "Roboto",
                    }}
                  >
                    ST Engineering
                  </span>
                </span>
              </Link>

              <h6
                style={{
                  fontFamily: "Roboto",
                  fontWeight: 700,
                  textAlign: "center",
                  marginTop: -10,
                  color: "#807C7C",
                  fontSize: 16,
                }}
              >
                EMS
              </h6>
            </div>

            <button
              onClick={() => {
                tToggle();
              }}
              type="button"
              className="btn btn-sm px-3 font-size-16 header-item"
              id="vertical-menu-btn"
            >
              <i className="fa fa-fw fa-bars"></i>
            </button>

            {/* <div
              style={{
                padding: 20,
                position: "relative",
                display: "block",
              }}
            >
              <h3
                style={{
                  fontFamily: "Roboto",
                }}
              >
                {selectedWorkshopData.workshop_name}
              </h3>
            </div> */}
          </div>

          <div className="d-flex">
            {/* light / dark mode */}
            <LightDark
              layoutMode={props["layoutMode"]}
              onChangeLayoutMode={onChangeLayoutMode}
            />
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
