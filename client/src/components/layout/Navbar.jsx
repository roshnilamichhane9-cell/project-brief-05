import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">

      <div className="navbar-brand">
        <NavLink to="/">
          Inventory Management System
        </NavLink>
      </div>

      <div className="navbar-nav">

        <NavLink to="/">
          Home
        </NavLink>

        <NavLink to="/dashboard">
          Dashboard
        </NavLink>

        <NavLink to="/products">
          Products
        </NavLink>

        <NavLink to="/categories">
          Categories
        </NavLink>

        <NavLink to="/suppliers">
          Suppliers
        </NavLink>

        <NavLink to="/purchases">
          Purchases
        </NavLink>

        <NavLink to="/sales">
          Sales
        </NavLink>

      </div>

    </nav>
  );
};

export default Navbar;