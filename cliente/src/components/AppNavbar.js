import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";

const AppNavbar = props => {
  const [collapsed, setCollapsed] = useState(true);
  const isLoggedIn = props.isLoggedIn;
  const toggleNavbar = () => setCollapsed(!collapsed);

  useEffect(() => {
    let history = useHistory();
    history.push("/");
  }, [isLoggedIn]);

  return (
    <div>
      <Navbar color="primary" dark>
        {isLoggedIn ? (
          <NavbarBrand href="/" className="mr-auto">
            Tareas
          </NavbarBrand>
        ) : (
          <NavbarBrand href="/" className="mr-auto">
            Login
          </NavbarBrand>
        )}
        <NavbarToggler onClick={toggleNavbar} className="mr-2" />
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>
            {isLoggedIn ? (
              <NavItem className="my-2">
                <Link
                  className="text-light"
                  to="/"
                  onClick={(isLoggedIn = false)}
                >
                  LogOut
                </Link>
              </NavItem>
            ) : (
              <NavItem className="my-2">
                <NavLink href="https://github.com/afsaa/web-developer-test">
                  GitHub
                </NavLink>
              </NavItem>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default AppNavbar;
