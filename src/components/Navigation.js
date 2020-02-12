import React from 'react';
import { NavLink } from 'react-router-dom';

export const Navbar = () => (
        <ul className="navbar">
          <li className="nav-item">
            <NavLink className="nav-link" to="/">Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/game">Game</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/instructions">Instructions</NavLink>
          </li>
        </ul>
)