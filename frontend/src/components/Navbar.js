import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { PopperUnstyled, ClickAwayListener } from '@mui/base';
import {
  Box,
  List,
  ListDivider,
  ListItem,
  ListItemButton,
  ListItemDecorator,
  Sheet,
} from '@mui/joy';
import { KeyboardArrowDown, Person, ShoppingCart } from '@mui/icons-material';
import { WalletContext } from '../contexts/WalletContext';

function Navbar() {
  const { setUserWalletAddress, connectWallet } = useContext(WalletContext);

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
    console.log(window.location.pathname);
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

  const LoginMenu = React.forwardRef(
    ({ focusNext, focusPrevious, ...props }, ref) => {
      const [anchorEl, setAnchorEl] = React.useState(null);

      const open = Boolean(anchorEl);
      const id = open ? 'about-popper' : undefined;
      return (
        <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
          <Box onMouseLeave={() => setAnchorEl(null)}>
            <ListItemButton
              aria-haspopup
              aria-expanded={open ? 'true' : 'false'}
              ref={ref}
              {...props}
              role="menuitem"
              onFocus={(event) => setAnchorEl(event.currentTarget)}
              onMouseEnter={(event) => {
                props.onMouseEnter?.(event);
                setAnchorEl(event.currentTarget);
              }}
              sx={(theme) => ({
                ...(open && theme.variants.plainHover.neutral),
              })}
            >
              Login <KeyboardArrowDown />
            </ListItemButton>
            <PopperUnstyled
              id={id}
              open={open}
              anchorEl={anchorEl}
              disablePortal
              keepMounted
            >
              <Sheet
                variant="outlined"
                sx={{ my: 2, boxShadow: 'md', borderRadius: 'sm' }}
              >
                <List
                  role="menu"
                  aria-label="About"
                  sx={{
                    '--List-radius': '8px',
                    '--List-padding': '4px',
                    '--List-divider-gap': '4px',
                    '--List-decorator-width': '32px',
                  }}
                >
                  <ListItem
                    onClick={() => connectWallet(setUserWalletAddress)}
                    role="none"
                  >
                    <ListItemButton role="menuitem">
                      <ListItemDecorator>
                        <Person />
                      </ListItemDecorator>
                      Customer
                    </ListItemButton>
                  </ListItem>
                  <ListDivider />
                  <Link
                    style={{
                      textDecoration: 'none',
                      color: 'white',
                    }}
                    to="/retailer-login"
                  >
                    <ListItem role="none">
                      <ListItemButton role="menuitem">
                        <ListItemDecorator>
                          <ShoppingCart />
                        </ListItemDecorator>
                        Retailer
                      </ListItemButton>
                    </ListItem>
                  </Link>
                </List>
              </Sheet>
            </PopperUnstyled>
          </Box>
        </ClickAwayListener>
      );
    }
  );

  return (
    <>
      <nav sx={{ backdropFilter: 'blur(20px)' }} className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            PyDO
            <i className="fa-brands fa-hive"></i>
          </Link>
          <ul className="nav-menu">
            {/* <li className='nav-item'>
              <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                Home
              </Link>
            </li> */}
          </ul>

          {button && (
            <div>
              <Box sx={{ minHeight: 190, color: 'white', marginTop: 18 }}>
                <List
                  role="menubar"
                  row
                  sx={{
                    '--List-radius': '8px',
                    '--List-padding': '4px',
                    '--List-gap': '8px',
                  }}
                >
                  <ListItem role="none">
                    <LoginMenu />
                  </ListItem>
                </List>
              </Box>
            </div>
          )}

          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu-mobile active' : 'nav-menu-mobile'}>
            <li>
              <Link
                to="/"
                className="nav-links-mobile"
                onClick={() => connectWallet(setUserWalletAddress)}
              >
                Customer Login
              </Link>
            </li>

            <li>
              <Link
                to="/retailer-login"
                className="nav-links-mobile"
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