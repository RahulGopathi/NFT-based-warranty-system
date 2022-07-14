import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { connect } from '../views/customer/Home';
import { Button, Divider, Menu, MenuItem } from '@mui/material';


function Navbar(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClose = (e) => {

    if (e.currentTarget.localName !== "ul") {
      const menu = document.getElementById("simple-menu").children[2];
      const menuBoundary = {
        left: menu.offsetLeft,
        top: e.currentTarget.offsetTop + e.currentTarget.offsetHeight,
        right: menu.offsetLeft + menu.offsetHeight,
        bottom: menu.offsetTop + menu.offsetHeight
      };
      if (
        e.clientX >= menuBoundary.left &&
        e.clientX <= menuBoundary.right &&
        e.clientY <= menuBoundary.bottom &&
        e.clientY >= menuBoundary.top
      ) {
        return;
      }
    }
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
            <i className="fa-brands fa-hive"></i>
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
              onMouseEnter={(e) => { setAnchorEl(e.currentTarget); }}
              onMouseLeave={handleClose}
            >
              Login <i className="fa-solid fa-angle-down"></i>
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
                onMouseLeave: (e) => {
                  handleClose(e);
                }
              }}
              sx={{ boxShadow: "rgb(0 0 0 / 16%) 0px 4px 16px" }}
            >
              <MenuItem onClick={() => connect(props.setUserAddress)}>Customer</MenuItem>
              <Divider />
              <MenuItem>Retailer</MenuItem>
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