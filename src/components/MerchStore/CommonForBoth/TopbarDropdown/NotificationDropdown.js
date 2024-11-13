import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Dropdown, DropdownToggle, DropdownMenu, Row, Col } from "reactstrap";
import SimpleBar from "simplebar-react";

//Import Icons
import FeatherIcon from "feather-icons-react";

//Import images
import avatar3 from "../../../../assets/images/users/avatar-3.jpg";
import avatar4 from "../../../../assets/images/users/avatar-4.jpg";

//i18n
import { withTranslation } from "react-i18next";

const NotificationDropdown = ({ cart, ...props }) => {
  // Declare a new state variable, which we'll call "menu"
  const [menu, setMenu] = useState(false);

  return (
    <React.Fragment>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="dropdown d-inline-block"
        tag="li"
      >
        <DropdownToggle
          className="btn header-item noti-icon position-relative"
          tag="button"
          id="page-header-notifications-dropdown"
        >
          <FeatherIcon icon="shopping-cart" className="icon-lg" />
          <span className="badge bg-danger rounded-pill">
            {cart.data.length}
          </span>
        </DropdownToggle>

        <DropdownMenu className="dropdown-menu-lg dropdown-menu-end p-0">
          <div className="p-3">
            <Row className="align-items-center">
              <Col>
                <h6 className="m-0"> {props.t("Shopping Cart")} </h6>
              </Col>
              <div className="col-auto">
                <Link to="/cart" className="small">
                  {" "}
                  View All
                </Link>
              </div>
            </Row>
          </div>

          <SimpleBar style={{ height: "230px" }}>
            {cart.data.map((item, index) => (
              <Link
                key={index}
                to={"/cart"}
                className="text-reset notification-item"
              >
                <div className="d-flex">
                  {/* <div className="avatar-sm me-3">
                    <span className="avatar-title bg-primary rounded-circle font-size-16">
                      <i className="bx bx-cart" />
                    </span>
                  </div> */}
                  <img
                    src={item.img}
                    className="me-3 rounded-circle avatar-sm"
                    alt="user-pic"
                  />
                  <div className="flex-grow-1">
                    <h6 className="mt-0 mb-1">
                      {props.t("Your order is placed")}
                    </h6>
                    <div className="font-size-12 text-muted">
                      <p className="mb-1">{props.t(item.title)}</p>
                      <p className="mb-0">
                        <i className="mdi mdi-cart-arrow-up" /> Price:{" "}
                        {props.t(item?.price || "")} Qty:{" "}
                        {props.t(item?.quantity || "")}{" "}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </SimpleBar>
          <div className="p-2 border-top d-grid">
            <Link
              className="btn btn-sm btn-link font-size-14 btn-block text-center"
              to="/cart"
            >
              <i className="mdi mdi-arrow-right-circle me-1"></i>{" "}
              {props.t("View all")}{" "}
            </Link>
          </div>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  );
};

const mapStateToProps = ({ cart, authentication }) => ({
  cart,
  authentication,
});

export default withTranslation()(
  connect(mapStateToProps, {})(NotificationDropdown)
);

NotificationDropdown.propTypes = {
  t: PropTypes.any,
};