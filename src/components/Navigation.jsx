import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { FiHome, FiLogOut } from 'react-icons/fi';
import { FaMoon, FaSun } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import ThemeContext from '../contexts/ThemeContext';

function Navigation({ logout, name }) {
  const { theme, toggleTheme } = useContext(ThemeContext);

  if (!name) {
    return (
      <>
        <nav className="navigation">
          <ul>
            <li>
              <button onClick={toggleTheme}>
                {theme === 'dark' ? <FaSun /> : <FaMoon />}
              </button>
            </li>
          </ul>
        </nav>
      </>
    );
  }

  return (
    <>
      <nav className="navigation">
        <ul>
          <li>
            <button onClick={toggleTheme}>
              {theme === 'dark' ? <FaSun /> : <FaMoon />}
            </button>
          </li>
          <li>
            <Link to="/">
              <FiHome />
            </Link>
          </li>
          <li>
            <button onClick={logout}>
              {name}
              <FiLogOut />
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
}

Navigation.propTypes = {
  logout: PropTypes.func,
  name: PropTypes.string,
};

export default Navigation;
