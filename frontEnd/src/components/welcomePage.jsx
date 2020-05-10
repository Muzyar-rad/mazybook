import React from "react";
import "../css/welcomePage.css";

const WelcomePage = props => {
  const user = props.user;
  if (user != null) window.location = "/home";
  return <div className="text">Welcome to MazyBook</div>;
};

export default WelcomePage;
