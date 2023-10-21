import React from "react";
import {
  CircleLoader,
  HashLoader,
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
        top: -20,
        left: -20,
        right: -20,
        bottom: -20,
        zIndex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.palette.mode === "light" ? "rgba(0,0,0,0)" : "rgba(255,255,255,0.0)",
      }}
    >
      <HashLoader
        style={{position: "absolute", top: "calc(min(50%, 50vh))"}}
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
