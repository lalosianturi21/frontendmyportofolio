import React, { useState } from 'react';
import "../css/style.css";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/actions/user';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <header className='l-header'>
      <nav className='nav bd-grid'>
        <div>
          <Link to='/' className='nav_logo'>Tio Fulalo</Link>
        </div>

        <div className={`nav__menu ${menuOpen ? 'show' : ''}`} id='nav-menu'>
          <ul className='nav__list'>
            <li className='nav__item'>
              <Link to='/' className='nav__link active-link'>Home</Link>
            </li>
            <li className="nav__item"><Link to="/about" className="nav__link">About</Link></li>
            <li className="nav__item"><Link to="#skills" className="nav__link">Skills</Link></li>
            <li className="nav__item"><Link to="#work" className="nav__link">Work</Link></li>
            <li className="nav__item"><Link to="#contact" className="nav__link">Contact</Link></li>

            <li className='nav__item'>
              <Link to='#' className='nav__link' onClick={toggleDropdown}>
                {userState.userInfo ? 'Account' : 'Sign Up'}
                <i className={`bx ${dropdownOpen ? 'bx-chevron-up' : 'bx-chevron-down'}`}></i>
              </Link>
              {dropdownOpen && (
                <ul className="dropdown-menu">
                  {userState.userInfo ? (
                    <>
                      {userState.userInfo.admin && (
                        <li><Link to="/admin" className="dropdown-item">Admin Dashboard</Link></li>
                      )}
                      <li><Link to="/profile" className="dropdown-item">Profile</Link></li>
                      <li><Link to="#" className="dropdown-item" onClick={logoutHandler}>Logout</Link></li>
                    </>
                  ) : (
                    <>
                      <li><Link to="/login" className="dropdown-item">Login</Link></li>
                      <li><Link to="/register" className="dropdown-item">Register</Link></li>
                    </>
                  )}
                </ul>
              )}
            </li>
          </ul>
        </div>

        <div className="nav__toggle" id="nav-toggle" onClick={toggleMenu} aria-label="Toggle navigation menu">
          <i className='bx bx-menu'></i>
        </div>
      </nav>
    </header>
  );
};

export default Header;
