import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, useMediaQuery, useTheme, Button, Box, Menu, MenuItem, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu'; 
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; 
import ExitToAppIcon from '@mui/icons-material/ExitToApp'; 
import { useNavigate } from 'react-router-dom';

export default function Navbar({ setAuth }) {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavigate = (path) => {
    navigate(path);
    handleClose();
  };

  const handleLogout = () => {
    setAuth(false);
    navigate('/login');
    handleClose();
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Task Manager
        </Typography>
        {!isMobile && (
          <>
            <Button color="inherit" onClick={() => handleNavigate('/tags')}>Tags</Button>
            <Button color="inherit" onClick={() => handleNavigate('/categories')}>Categories</Button>
            <IconButton color="inherit" onClick={() => handleNavigate('/profile')}>
              <Box sx={{ display: 'flex', alignItems: 'center', borderRadius: '50px', backgroundColor: 'white', color: 'black', padding: '5px 10px' }}>
                <AccountCircleIcon />
                <Typography variant="subtitle1" sx={{ marginLeft: 1 }}>
                  User Name
                </Typography>
              </Box>
            </IconButton>
            <IconButton color="inherit" onClick={handleLogout}>
              <ExitToAppIcon />
            </IconButton>
          </>
        )}
        {isMobile && (
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={handleMenu}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={() => handleNavigate('/profile')}>Profile</MenuItem>
          <Divider />
          <MenuItem onClick={() => handleNavigate('/tags')}>Tags</MenuItem>
          <MenuItem onClick={() => handleNavigate('/categories')}>Categories</MenuItem>
          <Divider />
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

