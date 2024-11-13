import React from "react";
import { Dropdown, DropdownToggle, DropdownMenu } from "reactstrap";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import user1 from "../../../../assets/images/users/avatar-1.jpg";

const ProfileMenu = ({ profile, authentication, ...props }) => {
  const [menu, setMenu] = React.useState(false);
  const [username, setUsername] = React.useState("Guest");

  React.useEffect(() => {
    if (authentication.authenticated) {
      const obj = JSON.parse(localStorage.getItem("authUser"));
      const { username } = JSON.parse(obj.config.data);
      setUsername(username);
    }
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
            {username}
          </span>
          <i className="mdi mdi-chevron-down d-none d-xl-inline-block" />
        </DropdownToggle>
        {!username === "Guest" && (
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
            <Link to="/logout" className="dropdown-item">
              <i className="mdi mdi-logout font-size-16 align-middle me-1"></i>
              <span>{props.t("Logout")}</span>
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

export default connect(mapStateToProps, {})(withTranslation()(ProfileMenu));
