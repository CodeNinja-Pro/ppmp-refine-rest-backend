import React from 'react'
import { ClipLoader, BarLoader, CircleLoader, ClockLoader } from 'react-spinners'
export type LengthType = number | string;
// import { useTheme } from '@emotion/react';
import { useTheme } from '@mui/material';

const override = {
  display: "block",
  margin: "0 auto",
  borderWidth: 20
  // borderColor: "#4DAF7C",
};

export default function LoadingComp(color: any='#4DAF7C', loading: boolean=true, size: LengthType=50): React.ReactNode {
  const theme = useTheme();
  
  return (
    <ClockLoader
        color={theme.palette.info.main}
        loading={loading}
        cssOverride={override as any}
        size={size}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
  )
}
