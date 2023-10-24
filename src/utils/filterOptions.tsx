import { createFilterOptions } from "@mui/material";

export const filterOptions = createFilterOptions({
    matchFrom: "any",
    stringify: (option: any) => option.name,
  });