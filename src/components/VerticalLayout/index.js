import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { connect } from "react-redux";

import {
  CHANGE_SIDEBAR_TYPE,
  CHANGE_LAYOUT_THEME,
} from "../../store/layout/types";

import { actionCreator } from "../../store";

// Layout Related Components
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import RightSidebar from "../CommonForBoth/RightSidebar";

const Layout = ({ layout, ...props }) => {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  const toggleMenuCallback = () => {
    if (layout.leftSideBarType === "default") {
      props.actionCreator({
        type: CHANGE_SIDEBAR_TYPE,
        payload: {
          sidebarType: "condensed",
        },
      });
    } else if (layout.leftSideBarType === "condensed") {
      props.actionCreator({
        type: CHANGE_SIDEBAR_TYPE,
        payload: {
          sidebarType: "default",
        },
      });
    }
  };

  //hides right sidebar on body click
  const hideRightbar = (event) => {
    var rightbar = document.getElementById("right-bar");
    //if clicked in inside right bar, then do nothing
    if (rightbar && rightbar.contains(event.target)) {
      return;
    } else {
      //if clicked in outside of rightbar then fire action for hide rightbar
      //dispatch(showRightSidebarAction(false));
    }
  };

  useEffect(() => {
    // init body click event for toggle rightbar
    document.body.addEventListener("click", hideRightbar, true);

    const preloaderElement = document.getElementById("preloader");

    if (preloaderElement) {
      if (layout.isPreloader === true) {
        preloaderElement.style.display = "block";

        setTimeout(function () {
          preloaderElement.style.display = "none";
        }, 2500);
      } else {
        preloaderElement.style.display = "none";
      }
    }
  }, [layout.isPreloader]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  /*
  call dark/light mode
  */
  const onChangeLayoutMode = (value) => {
    //if (changelayoutMode) {
    props.actionCreator({
      type: CHANGE_LAYOUT_THEME,
      payload: {
        layoutMode: value,
        layoutType: layout.layoutType,
      },
    });
    //}
  };

  return (
    <React.Fragment>
      <div className="pace pace-active" id="preloader">
        <div
          className="pace-progress"
          data-progress-text="100%"
          data-progress="99"
          style={{ transform: "translate3d(100%, 0px, 0px)" }}
        >
          <div className="pace-progress-inner"></div>
        </div>
        <div className="pace-activity"></div>
      </div>

      <div id="layout-wrapper">
        <Header
          toggleMenuCallback={toggleMenuCallback}
          onChangeLayoutMode={onChangeLayoutMode}
        />

        <Sidebar
          theme={layout.leftSideBarTheme}
          type={layout.leftSideBarType}
          isMobile={isMobile}
        />
        <div className="main-content">
          {props.children}
          <Footer />
        </div>
      </div>
      {layout.showRightSidebar ? (
        <RightSidebar onChangeLayoutMode={onChangeLayoutMode} />
      ) : (
        ""
      )}
    </React.Fragment>
  );
};

const mapStateToProps = ({ layout }) => {
  return { layout };
};

export default connect(mapStateToProps, { actionCreator })(Layout);
