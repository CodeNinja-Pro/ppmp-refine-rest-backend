import { SendOutlined } from '@mui/icons-material'
import { Box, Button, Typography } from '@mui/material'
import React from 'react'

const style = {
    // background:
    //     "radial-gradient(100% 80% at 50% 50%,rgba(255, 255, 255, 0) 0%,rgba(0, 0, 0, 0.5) 100%),url('images/bg.jpg')",
    // backgroundSize: "cover",
    // backgroundRepeat: "no-repeat"
}

export default function AdminDashboard() {
  return (
    <Box sx={{...style, width: "100%", height: "100%"}}>
        {/* <Typography variant='h1'>Dashboard</Typography> */}
        <Button variant="outlined" size='large' endIcon={<SendOutlined />} href='/users'>User Management</Button>
    </Box>
  )
}
