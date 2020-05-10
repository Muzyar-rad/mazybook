import React from "react";
import Logo from "../media/M.png";
import auth from "../services/authService";
import { Link, NavLink } from "react-router-dom";

const NavBar = () => {
  const user = auth.getCurrentUser();
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-info">
      <Link className="navbar-brand" to={user ? "/home" : "/"}>
        <img
          src={Logo}
          width="30"
          height="30"
          style={{ marginRight: 5 }}
          className="d-inline-block align-top"
          alt=""
        />{" "}
        MazyBook
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          {!user && (
            <React.Fragment>
              <li className="nav-item">
                <NavLink className="nav-link" to="/login">
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink className="nav-link" to="/register">
                  Register
                </NavLink>
              </li>
            </React.Fragment>
          )}
          {user && (
            <React.Fragment>
              <li className="nav-item">
                <NavLink className="nav-link" to="/profile">
                  {user.name}
                </NavLink>
              </li>
              <li>
                <NavLink className="nav-link" to="/logout">
                  Logout
                </NavLink>
              </li>
            </React.Fragment>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
