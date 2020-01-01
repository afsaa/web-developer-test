import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem
} from "reactstrap";

const AppNavbar = props => {
  const [collapsed, setCollapsed] = useState(true);
  const isLoggedIn = props.isLoggedIn;
  const toggleNavbar = () => setCollapsed(!collapsed);

  return (
    <div>
      <Navbar color="primary" dark>
        <NavbarBrand href="/" className="mr-auto">
          Tareas
        </NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} className="mr-2" />
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>
            {isLoggedIn ? (
              <React.Fragment>
                <NavItem className="my-2">
                  <Link className="text-light" to="/home">
                    Tareas
                  </Link>
                </NavItem>
                <NavItem className="my-2">
                  <Link className="text-light" to="/">
                    LogOut
                  </Link>
                </NavItem>
              </React.Fragment>
            ) : (
              <NavItem className="my-2">
                <Link className="text-light" to="/">
                  Login
                </Link>
              </NavItem>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default AppNavbar;
