import React from 'react';
import {Box, Typography } from '@mui/material';
import "./header.css"

const Header = () => {
    return (
        <Box>
            <Box 
            item
            sx={{
                backgroundImage: 'url(https://cdn.home-designing.com/wp-content/uploads/2020/09/white-desk.jpg)',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height:"300px",
                width:"100%",

                display:"flex",
                flexDirection:"column",
                alignItems:"center",
                justifyContent:"center",
              }}>
                <Typography variant='h1' sx={{color:"white"}}>
                    Administrateur
                </Typography>
                <Typography variant='h2' sx={{color:"white"}}>
                    SLPC
                </Typography>
              </Box>
        </Box>
    );
};

export default Header;