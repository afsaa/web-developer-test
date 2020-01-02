import React, { useState } from "react";
import { Route, Redirect, useHistory, useLocation } from "react-router-dom";
import AppNavbar from "../AppNavbar";
import LoginForm from "../LoginForm";
import axios from "axios";

const Login = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState({});

  const handleChange = e => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleLoginFormSubmit = e => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/login", userData)
      .then(function(response) {
        console.log(response.data);
        let data = response.data;
        if (data !== []) {
          setIsAuthenticated(true);
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  return (
    <React.Fragment>
      <AppNavbar isLoggedIn={isAuthenticated} />
      <LoginForm
        handleChange={handleChange}
        handleLoginFormSubmit={handleLoginFormSubmit}
      />
    </React.Fragment>
  );
};

export default Login;
