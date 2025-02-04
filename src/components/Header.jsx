import React from 'react'
import "../css/style.css";

const Header = () => {
  return (
    <header className='l-header'>
        <nav className='nav bd-grid'>
            <div>
                <a href='#' className='nav_logo'>Tio Fulalo</a>
            </div>

            <div className="nav__menu" id='nav-menu'>
                <ul className='nav__list'>
                    <li className='nav__item'>
                        <a href='#home' className='nav__link active-link'>Home</a>
                    </li>
                    <li className="nav__item"><a href="#about" className="nav__link">About</a></li>
                        <li className="nav__item"><a href="#skills" className="nav__link">Skills</a></li>
                        <li className="nav__item"><a href="#work" className="nav__link">Work</a></li>
                        <li className="nav__item"><a href="#contact" className="nav__link">Contact</a></li>
                </ul>
            </div>
        </nav>
    </header>
  )
}

export default Header
