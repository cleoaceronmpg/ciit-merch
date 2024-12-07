import React from "react";
import { Dropdown, DropdownToggle, DropdownMenu } from "reactstrap";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { actionCreator, types } from "../../../../store";
import user1 from "../../../../assets/images/users/ciit-avatar.png";

const ProfileMenu = ({ profile, authentication, ...props }) => {
  const [menu, setMenu] = React.useState(false);
  const [fullName, setFullName] = React.useState("Guest");

  React.useEffect(() => {
    setFullName(authentication.data?.fields?.FullName || "Guest");
  }, [authentication]);

  return (
    <React.Fragment>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="d-inline-block"
      >
        <DropdownToggle
          className="btn header-item bg-soft-light border-start border-end"
          id="page-header-user-dropdown"
          tag="button"
        >
          <img
            className="rounded-circle header-profile-user"
            src={user1}
            alt="Header Avatar"
          />
          <span className="d-none d-xl-inline-block ms-1 fw-medium">
            {fullName}
          </span>
          <i className="mdi mdi-chevron-down d-none d-xl-inline-block" />
        </DropdownToggle>
        {authentication.authenticated ? (
          <DropdownMenu className="dropdown-menu-end">
            <Link to={"/profile"} className="dropdown-item">
              <i className="mdi mdi mdi-face-man font-size-16 align-middle me-1"></i>{" "}
              {props.t("Profile")}{" "}
            </Link>{" "}
            <Link to="/page-lock-screen" className="dropdown-item">
              <i className="mdi mdi-lock font-size-16 align-middle me-1"></i>
              {props.t("Lock screen")}
            </Link>
            <div className="dropdown-divider" />
            <Link
              className="dropdown-item"
              onClick={() => {
                props.actionCreator({
                  type: types.LOGOUT_USER,
                });
              }}
            >
              <i className="mdi mdi-logout font-size-16 align-middle me-1"></i>
              <span>{props.t("Logout")}</span>
            </Link>
          </DropdownMenu>
        ) : (
          <DropdownMenu className="dropdown-menu-end">
            <Link to={"/login"} className="dropdown-item">
              <i className="mdi mdi mdi-login font-size-16 align-middle me-1"></i>{" "}
              Login
            </Link>{" "}
            <Link to="/register" className="dropdown-item">
              <i className="mdi mdi-registered-trademark font-size-16 align-middle me-1"></i>
              Register
            </Link>
          </DropdownMenu>
        )}
      </Dropdown>
    </React.Fragment>
  );
};

const mapStateToProps = ({ profile, authentication }) => ({
  profile,
  authentication,
});

export default connect(mapStateToProps, { actionCreator })(
  withTranslation()(ProfileMenu)
);
