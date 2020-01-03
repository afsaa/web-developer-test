import React, { useState } from "react";
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
  const toggleNavbar = () => setCollapsed(!collapsed);
  const userId = localStorage.getItem("userId");

  return (
    <React.Fragment>
      <Navbar color="primary" dark>
        <NavbarBrand href="/" className="mr-auto">
          Gestor de Tareas
        </NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} className="mr-2" />
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>
            {userId ? (
              <NavItem className="my-2">
                <NavLink className="text-light" onClick={() => props.logOut()}>
                  LogOut
                </NavLink>
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
    </React.Fragment>
  );
};

export default AppNavbar;
