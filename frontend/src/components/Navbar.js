import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { connect } from './Home';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

function Navbar(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick1 = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 768) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
            PyDO
            <i class="fa-brands fa-hive"></i>
          </Link>
          <ul className='nav-menu'>
            {/* <li className='nav-item'>
              <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                Home
              </Link>
            </li> */}
          </ul>

          {button && <div>
            <Button
              id="basic-button"
              variant="contained"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick1}
            >
              Login <i class="fa-solid fa-angle-down"></i>
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={() => connect(props.setUserAddress)}>Customer</MenuItem>
              <MenuItem onClick={handleClose}>Retailer</MenuItem>
            </Menu>
          </div>}

          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu-mobile active' : 'nav-menu-mobile'}>
            <li>
              <Link
                to='/'
                className='nav-links-mobile'
                onClick={() => connect(props.setUserAddress)}
              >
                Customer Login
              </Link>
            </li>

            <li>
              <Link
                to='/retailer-login'
                className='nav-links-mobile'
                onClick={closeMobileMenu}
              >
                Retailer Login
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;