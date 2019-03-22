import React from 'react';
import { NavLink } from 'react-router-dom';

export const Navbar = () => (
  <nav className="navbar fixed-top navbar-light bg-light">
      <div className="navbar-expand">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <NavLink className="nav-link" to="/">Home</NavLink>
          </li>
          <li className="nav-item active">
            <NavLink className="nav-link" to="/game">Game</NavLink>
          </li>
          <li className="nav-item active">
            <NavLink className="nav-link" to="/instructions">Instructions</NavLink>
          </li>
        </ul>
      </div>
  </nav>
)