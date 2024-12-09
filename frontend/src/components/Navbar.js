import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ user, setUser }) => {
  const logout = () => {
    setUser(null);
  };

  return (
    <nav className="navbar">
      <Link to="/cla34_coins">Home</Link>
      <div>
        {user ? (
          <>
            <span>Welcome, {user.name}!</span>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <Link to="/cla34_login">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;