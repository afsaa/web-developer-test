import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Alert } from "reactstrap";
import AppNavbar from "../AppNavbar";
import LoginForm from "../LoginForm";
import axios from "axios";

const Login = props => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [formSubmit, setFormSubmit] = useState(false);
  useEffect(() => {
    postLogin();
    return () => {
      source.cancel();
    };
  }, [formSubmit]);

  const [userData, setUserData] = useState({});

  const [loginUserData, setLoginUserData] = useState([]);
  useEffect(() => {
    if (loginUserData.length > 0) {
      localStorage.setItem("userId", loginUserData[0].id);
      localStorage.setItem("username", loginUserData[0].nombre_usuario);
      localStorage.setItem("password", loginUserData[0].contraseña);
      setUserId(localStorage.getItem("userId"));
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [loginUserData]);

  const [userId, setUserId] = useState(undefined);
  useEffect(() => {
    if (userId) {
      return <Redirect push to="/home" />;
    }
  }, [userId]);

  const source = axios.CancelToken.source();

  const handleChange = e => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleLoginFormSubmit = e => {
    e.preventDefault();
    setFormSubmit(true);
  };

  const postLogin = async () => {
    if (formSubmit) {
      try {
        const res = await axios.post("http://localhost:8080/login", userData, {
          cancelToken: source.token
        });
        setLoginUserData(res.data);
      } catch (error) {
        if (axios.isCancel(error)) {
          // request cancelled
        } else {
          throw error;
        }
      }
    }
  };

  if (userId) {
    return <Redirect push to="/home" />;
  } else {
    return (
      <React.Fragment>
        <AppNavbar isLoggedIn={isLoggedIn} />
        <LoginForm
          handleChange={handleChange}
          handleLoginFormSubmit={handleLoginFormSubmit}
        />
      </React.Fragment>
    );
  }
};

export default Login;
