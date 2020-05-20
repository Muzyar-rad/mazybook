import React from "react";
import "../css/welcomePage.css";

const WelcomePage = props => {
  const user = props.user;
  if (user != null) window.location = "/home";
  return (
    <div className="welcome">
      Welcome to Mazybook <br />
      <br /> This social media application requires a username and password to
      experience properly. Please use the following demo login or feel free to
      register to create your own credentials. <br />
      <br /> Email: demo <br /> Password: test <br />
      <br /> Thank you for visiting my application!
    </div>
  );
};

export default WelcomePage;
