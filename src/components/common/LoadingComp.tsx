import React from "react";
import {
  ClipLoader,
  BarLoader,
  CircleLoader,
  RingLoader,
} from "react-spinners";
export type LengthType = number | string;
// import { useTheme } from '@emotion/react';
import { useTheme } from "@mui/material";
import { isAbsolute } from "path";
import { Palette } from "@mui/icons-material";

const override = {
  display: "block",
  margin: "0 auto",
  borderWidth: 20,
  // borderColor: "#4DAF7C",
};

export default function LoadingComp(
  color: any = "#4DAF7C",
  loading: boolean = true,
  size: LengthType = 50
): React.ReactNode {
  const theme = useTheme();

  return (
    <div
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
        zIndex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transition: "ease-in-out",
        backgroundColor: theme.palette.mode === "light" ? "rgba(0,0,0,0.3)" : "rgba(255,255,255,0.3)",
      }}
    >
      <RingLoader
        color={theme.palette.info.main}
        loading={loading}
        cssOverride={override as any}
        size={size}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}
