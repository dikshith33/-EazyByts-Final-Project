import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    alert('Logged out successfully!');
    window.location.href = '/login';
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow">
      <div className="container">
        {/* Brand */}
        <Link className="navbar-brand fw-bold" to="/">Event Management</Link>

        {/* Mobile Toggle Button */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link text-white fw-semibold" to="/events">Events</Link>
            </li>

            {token ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-white fw-semibold" to="/profile">Profile</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white fw-semibold" to="/events/create">Create Event</Link>
                </li>
                <li className="nav-item">
                  <button className="btn btn-danger btn-sm ms-2" onClick={handleLogout}>Logout</button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-white fw-semibold" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white fw-semibold" to="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
