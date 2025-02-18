import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/actions/user';
import '../css/style.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  return (
    <header className='l-header'>
      <nav className='nav bd-grid'>
        <div>
          <Link to='/' className='nav_logo'>Tio Fulalo</Link>
        </div>

        <div className={`nav__menu ${menuOpen ? 'show' : ''}`} id='nav-menu'>
          <ul className='nav__list'>
            {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item) => (
              <li className='nav__item' key={item}>
                <Link 
                  to={item === 'Home' ? '/' : '#'} 
                  className='nav__link' 
                  onClick={() => item !== 'Home' && document.getElementById(item.toLowerCase()).scrollIntoView({ behavior: 'smooth' })}>
                  {item}
                </Link>
              </li>
            ))}
            
            <li className='nav__item'>
              <Link to='#' className='nav__link' onClick={toggleDropdown}>
                {userInfo ? 'Account' : 'Sign Up'}
                <i className={`bx ${dropdownOpen ? 'bx-chevron-up' : 'bx-chevron-down'}`}></i>
              </Link>
              {dropdownOpen && (
                <ul className='dropdown-menu'>
                  {userInfo ? (
                    <>
                      {userInfo.admin && <li><Link to='/admin' className='dropdown-item'>Admin Dashboard</Link></li>}
                      <li><Link to='/profile' className='dropdown-item'>Profile</Link></li>
                      <li><Link to='#' className='dropdown-item' onClick={handleLogout}>Logout</Link></li>
                    </>
                  ) : (
                    <>
                      <li><Link to='/login' className='dropdown-item'>Login</Link></li>
                      <li><Link to='/register' className='dropdown-item'>Register</Link></li>
                    </>
                  )}
                </ul>
              )}
            </li>
          </ul>
        </div>

        <div className='nav__toggle' id='nav-toggle' onClick={toggleMenu} aria-label='Toggle navigation menu'>
          <i className='bx bx-menu'></i>
        </div>
      </nav>
    </header>
  );
};

export default Header;
