import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="bg-light">
      <nav class="navbar navbar-dark bg-dark ">
        <div class="container-fluid">
          <Link to="/" class="navbar-brand">Task Management Tool</Link>
        </div>
      </nav>

      <div className="nav-scroller bg-light shadow-sm p-3  rounded">
        {/* Secondary navigation */}
        <nav className="nav nav-underline" aria-label="Secondary navigation">
          <Link
            className="nav-link active custom-active-tab mt-1"
            aria-current="page"
            to="/"
          >
            Dashboard
          </Link>
          <Link className="nav-link text-dark custom-active-tab mt-1" to="/explore">
            Explore
          </Link>
          <Link className="nav-link text-dark custom-active-tab mt-1" to="/suggestions">
            Suggestions
          </Link>
          <Link className="nav-link text-dark custom-active-tab mt-1" to="#">
            Friends
            <span className="badge bg-secondary rounded-pill align-text-bottom">
              27
            </span>
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
