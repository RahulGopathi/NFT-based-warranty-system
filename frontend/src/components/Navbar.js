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

const useRovingIndex = (options) => {
  const {
    initialActiveIndex = 0,
    vertical = false,
    handlers = {},
  } = options || {};
  const [activeIndex, setActiveIndex] = React.useState(initialActiveIndex);
  const targetRefs = React.useRef([]);
  const targets = targetRefs.current;
  const focusNext = () => {
    let newIndex = activeIndex + 1;
    if (newIndex >= targets.length) {
      newIndex = 0;
    }
    targets[newIndex]?.focus();
    setActiveIndex(newIndex);
  };
  const focusPrevious = () => {
    let newIndex = activeIndex - 1;
    if (newIndex < 0) {
      newIndex = targets.length - 1;
    }
    targets[newIndex]?.focus();
    setActiveIndex(newIndex);
  };
  const getTargetProps = (index) => ({
    ref: (ref) => {
      if (ref) {
        targets[index] = ref;
      }
    },
    tabIndex: activeIndex === index ? 0 : -1,
    onKeyDown: (e) => {
      if (Number.isInteger(activeIndex)) {
        if (e.key === (vertical ? 'ArrowDown' : 'ArrowRight')) {
          focusNext();
        }
        if (e.key === (vertical ? 'ArrowUp' : 'ArrowLeft')) {
          focusPrevious();
        }
        handlers.onKeyDown?.(e, { setActiveIndex });
      }
    },
    onClick: () => {
      setActiveIndex(index);
    },
  });
  return {
    activeIndex,
    setActiveIndex,
    targets,
    getTargetProps,
    focusNext,
    focusPrevious,
  };
};

const LoginMenu = React.forwardRef(
  ({ focusNext, focusPrevious, ...props }, ref) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const { targets, setActiveIndex, getTargetProps } = useRovingIndex({
      initialActiveIndex: null,
      vertical: true,
      handlers: {
        onKeyDown: (event, fns) => {
          if (event.key.match(/(ArrowDown|ArrowUp|ArrowLeft|ArrowRight)/)) {
            event.preventDefault();
          }
          if (event.key === 'Tab') {
            setAnchorEl(null);
            fns.setActiveIndex(null);
          }
          if (event.key === 'ArrowLeft') {
            setAnchorEl(null);
            focusPrevious();
          }
          if (event.key === 'ArrowRight') {
            setAnchorEl(null);
            focusNext();
          }
        },
      },
    });

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
            onKeyDown={(event) => {
              props.onKeyDown?.(event);
              if (event.key.match(/(ArrowLeft|ArrowRight|Tab)/)) {
                setAnchorEl(null);
              }
              if (event.key === 'ArrowDown') {
                event.preventDefault();
                targets[0]?.focus();
                setActiveIndex(0);
              }
            }}
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
                <ListItem role="none">
                  <ListItemButton role="menuitem" {...getTargetProps(0)}>
                    <ListItemDecorator>
                      <Person />
                    </ListItemDecorator>
                    Customer
                  </ListItemButton>
                </ListItem>
                <ListDivider />
                <ListItem role="none">
                  <ListItemButton role="menuitem" {...getTargetProps(1)}>
                    <ListItemDecorator>
                      <ShoppingCart />
                    </ListItemDecorator>
                    Retailer
                  </ListItemButton>
                </ListItem>
              </List>
            </Sheet>
          </PopperUnstyled>
        </Box>
      </ClickAwayListener>
    );
  }
);

function Navbar() {
  const { targets, getTargetProps, setActiveIndex, focusNext, focusPrevious } =
    useRovingIndex();
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
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

  return (
    <>
      <nav className="navbar">
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
                    <LoginMenu
                      onMouseEnter={() => {
                        setActiveIndex(1);
                        targets[1].focus();
                      }}
                      focusNext={focusNext}
                      focusPrevious={focusPrevious}
                      {...getTargetProps(1)}
                    />
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
