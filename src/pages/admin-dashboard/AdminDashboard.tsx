import { MedicalServicesOutlined, SendOutlined } from '@mui/icons-material'
import { Box, Button, Container, Typography } from '@mui/material'
import { styled } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';
import React from 'react'
import { Link } from 'react-router-dom';

const style = {
    // background:
    //     "radial-gradient(100% 80% at 50% 50%,rgba(255, 255, 255, 0) 0%,rgba(0, 0, 0, 0.5) 100%),url('images/bg.jpg')",
    // backgroundSize: "cover",
    // backgroundRepeat: "no-repeat"
}

export default function AdminDashboard() {
  return (
    <Box sx={{...style, width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}} gap={2}>
        <ButtonBaseDemo />
        {/* <Typography variant='h1'>Dashboard</Typography>
        <Grid container
        <Button variant="outlined" size='large' fullWidth endIcon={<SendOutlined />} href='/users'>User Management</Button>
        <Button variant="contained" color="info" size='large' fullWidth endIcon={<MedicalServicesOutlined />} href='/products'>Product Management</Button>
        <Button variant="contained" color="info" size='large' fullWidth endIcon={<MedicalServicesOutlined />} href='/users'>Product Management</Button> */}
        


    </Box>
  )
}


const images = [
  {
    url: '/images/buttons/user_management.jpg',
    title: 'User Management',
    width: '40%',
    to: "/users"
  },
  {
    url: '/images/buttons/product_management.jpg',
    title: 'Product Management',
    width: '30%',
    to: "products"
  },
  {
    url: '/images/buttons/purchase_cart.jpg',
    title: 'Purchase Cart',
    width: '30%',
    to: "purchase-cart-items"
  },
];

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 600,
  [theme.breakpoints.down('sm')]: {
    width: '100% !important', // Overrides inline-style
    height: 200,
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.15,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
    },
    '& .MuiTypography-root': {
      border: '4px solid currentColor',
    },
  },
}));

const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center 40%',
});

const Image = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create('opacity'),
}));

const ImageMarked = styled('span')(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: 'absolute',
  bottom: -2,
  left: 'calc(50% - 9px)',
  transition: theme.transitions.create('opacity'),
}));

export  function ButtonBaseDemo() {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%' }}>
      {images.map((image) => (
        
        <ImageButton
          focusRipple
          key={image.title}
          style={{
            width: image.width,
          }}
        >
            <Link to={image.to}>
          <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
          <ImageBackdrop className="MuiImageBackdrop-root" />
          <Image>
            <Typography
              component="span"
              variant="subtitle1"
              color="inherit"
              sx={{
                position: 'relative',
                p: 4,
                pt: 2,
                pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
              }}
            >
              {image.title}
              
              <ImageMarked className="MuiImageMarked-root" />
            </Typography>
          </Image>
        </Link>

        </ImageButton>
      ))}
    </Box>
  );
}