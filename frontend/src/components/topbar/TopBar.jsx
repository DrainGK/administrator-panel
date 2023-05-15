import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./topbar.css";
import { useContext } from "react";
import { Context } from '../../context/Context';
import { AppBar, Box, Toolbar, IconButton,
Typography,Menu, MenuItem, Avatar,Button} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Container } from '@mui/system';

const TopBar = () => {
    const { user, dispatch } = useContext(Context);
    const publicFolder = "http://localhost:5000/images/";

    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
      };
      const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
      };
    
      const handleCloseNavMenu = () => {
        setAnchorElNav(null);
      };
    
      const handleCloseUserMenu = () => {
        setAnchorElUser(null);
      };
    

    const handleLogout = () => {
        dispatch({type: "LOGOUT"})
    }
    return (
           <AppBar position="static">
            <Container maxWidth="md">
                <Toolbar disableGutters>
                    <Typography
                        variant='h6'
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: {xs: "none", md: "flex"},
                            letterSpacing: "0.3rem",
                            color:"white",
                            TextDecoration: "none",
                        }}
                        >
                            {user && <span>Bienvenue {user.username}</span>}
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: {xs: "flex", md:"none"}}}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="white">
                                <MenuIcon />
                            </IconButton>
                            <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'flex', md: 'none' },
                                flexDirection:"column"
                            }}
                            >
                            
                            <MenuItem  onClick={handleCloseNavMenu}
                            sx={{
                                display:'flex',
                                flexDirection:"column",
                            }}>
                                <Link className="link" to="/">
                                    <Typography textAlign="center">Acceuil</Typography>
                                </Link>
                                <Link className="link" to="/write">
                                    <Typography textAlign="center">Ecrire</Typography>
                                </Link>
                                <Link className="link" to="/login">
                                    <Typography textAlign="center">{!user && "login"}</Typography>
                                </Link>
                                <Typography
                                onClick={handleLogout}
                                textAlign="center"
                                >
                                        {user && "Logout"} 
                                </Typography>
                            

                            </MenuItem>
                            
                            </Menu>
                        </Box>
                        <Typography
                        variant='h6'
                        noWrap
                        component="a"
                        href="/"
                        textAlign="center"
                        sx={{
                            mr: 2,
                            display: {xs: "flex", md: "none"},
                            letterSpacing: "0.3rem",
                            color:"white",
                            TextDecoration: "none",
                            fontSize: "0.8rem",
                        }}
                        >
                            {user && <span>Bienvenue {user.username}</span>}
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            <Link className="link" to="/">    
                                <Button
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    Acceuil
                                </Button>
                            </Link>
                            <Link className="link" to="/write">    
                                <Button 
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    Ecrire
                                </Button>
                            </Link>
                            <Button
                                onClick={handleLogout}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                    {user && "Logout"} 
                            </Button>
                    
                        </Box>
                        <Box sx={{ flexGrow: 0 }}>
                            

                            {
                                user ? (
                                    <Link className="link" to="/setting">
                                        <Avatar alt="Profile Picture" src={publicFolder+user.profilePic} />
                                    </Link>
                                ):(
                                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                                        <Link className="link" to="/login">    
                                            <Button
                                                onClick={handleCloseNavMenu}
                                                sx={{ my: 2, color: 'white', display: 'block' }}
                                            >
                                                Login
                                            </Button>
                                        </Link>
                                        </Box>
                                )
                            }
                        </Box>

                </Toolbar>
            </Container>
            </AppBar>
    );
};

export default TopBar;