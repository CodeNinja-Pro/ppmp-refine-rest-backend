import React, { createRef, useEffect, useState } from "react";
import {
  TextField,
  Grid,
  Typography,
  InputAdornment,
  Stack,
} from "@mui/material";
import {
  CancelRounded,
  CheckCircle,
  GavelOutlined,
  GavelRounded,
  OutlinedFlag,
} from "@mui/icons-material";

const IPSASCodeInput = React.forwardRef(
  ({ onChange, onBlur, name, label, value, ...rest }, ref) => {
    console.log(ref.current);
    const [ipsasCode, setIPSASCode] = useState("");
    useEffect(() => {  
        setIPSASCode(value || "");
        console.log("sdfsdf");
    }, [value])
    const [suppliesCategoryCodeStatus, setSuppliesCategoryCodeStatus] =
      useState("notTouched");
    const [genericCodeStatus, setGenericCodeStatus] = useState("notTouched");
    const [brandCodeStatus, setBrandCodeStatus] = useState("notTouched");
    const [yearPurchasedStatus, setYearPurchasedStatus] =
      useState("notTouched");
    const [modeOfProcurementStatus, setModeOfProcurementStatus] =
      useState("notTouched");
    const [validationReason, setValidationReason] = useState({
      supplyCateogy: "",
      genercCode: "",
      brandCode: "",
      yearPurchased: "",
      modeOfProcurement: "",
    });

    const handleIPSASCodeChange = (event: any) => {
      let { value } = event.target;
      if (value.length === 4 || value.length === 14) {
        if (ipsasCode.length < value.length) {
          value += ".";
        }
      }
      value = value.toUpperCase();
      setIPSASCode(value);

      setValidationReason({
        supplyCateogy: "",
        genercCode: "",
        brandCode: "",
        yearPurchased: "",
        modeOfProcurement: "",
      });
      onChange(event);

      // Validate supplies category code (8 digits including dot)
      const suppliesCategoryCode = value.substring(0, 8);

      const suppliesCategoryCodeRegex = /^\d{4}\.\d{3}$/;
      if (!value) {
        setSuppliesCategoryCodeStatus("notTouched");
      } else if (suppliesCategoryCodeRegex.test(suppliesCategoryCode)) {
        setSuppliesCategoryCodeStatus("valid");
      } else {
        setSuppliesCategoryCodeStatus("invalid");
        setValidationReason({
          supplyCateogy:
            "Invalid supplies category code. It should be 8 digits including a dot placed after the 4th position.",
        });
        return;
      }

      // Validate generic code (3 uppercase English alphabet + 3 digits)
      const genericCode = value.substring(8, 15);
      const genericCodeRegex = /^[A-Z]{3}\d{3}\.$/;
      if (!value || !suppliesCategoryCodeRegex.test(suppliesCategoryCode)) {
        setGenericCodeStatus("notTouched");
      } else if (genericCodeRegex.test(genericCode)) {
        setGenericCodeStatus("valid");
      } else {
        setGenericCodeStatus("invalid");
        setValidationReason({
          genercCode:
            "Invalid generic code. It should start with 3 uppercase English alphabets followed by 3 digits.",
        });
        return;
      }

      // Validate brand code (numeric 4 digits)
      const brandCode = value.substring(15, 19);
      const brandCodeRegex = /^\d{4}$/;
      if (!value || !genericCodeRegex.test(genericCode)) {
        setBrandCodeStatus("notTouched");
      } else if (brandCodeRegex.test(brandCode)) {
        setBrandCodeStatus("valid");
      } else {
        setBrandCodeStatus("invalid");
        setValidationReason({
          brandCode: "Invalid brand code. It should be 4 digits.",
        });
        return;
      }

      // Validate year purchased code (4 digits)
      const yearPurchased = value.substring(20, 24);
      const yearPurchasedRegex = /^\d{4}$/;
      if (!value || !brandCodeRegex.test(brandCode)) {
        setYearPurchasedStatus("notTouched");
      } else if (yearPurchasedRegex.test(yearPurchased)) {
        setYearPurchasedStatus("valid");
      } else {
        setYearPurchasedStatus("invalid");
        setValidationReason({
          yearPurchased: "Invalid year purchased code. It should be 4 digits.",
        });
        return;
      }

      // Validate mode of procurement code (RB, DC, SV, EP, EA)
      const modeOfProcurement = value.substring(24);
      const modeOfProcurementRegex = /^(RB|DC|SV|EP|EA)$/;
      if (!value || !yearPurchasedRegex.test(yearPurchased)) {
        setModeOfProcurementStatus("notTouched");
      } else if (modeOfProcurementRegex.test(modeOfProcurement)) {
        setModeOfProcurementStatus("valid");
      } else {
        setModeOfProcurementStatus("invalid");
        setValidationReason({
          modeOfProcurement:
            "Invalid mode of procurement code. It should be one of the following: RB, DC, SV, EP, EA.",
        });
        return;
      }
    };

    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            {...rest}
            label="IPSAS Code"
            value={ipsasCode}
            ref={ref}
            name={name}
            // ref={ref}
            // onChange={onChange}
            onBlur={onBlur}
            onChange={handleIPSASCodeChange}
            fullWidth
            error={
              suppliesCategoryCodeStatus === "invalid" ||
              genericCodeStatus === "invalid" ||
              brandCodeStatus === "invalid" ||
              yearPurchasedStatus === "invalid" ||
              modeOfProcurementStatus === "invalid"
            }
          />
          {validationReason && (
            <>
              <Stack paddingX={1} marginTop={1}>
                <Typography variant="caption" color="primary">
                  eg: 1231.231GEN123.132143241DC
                </Typography>
                <Typography variant="caption" color="error">
                  {validationReason?.supplyCateogy ||
                    validationReason?.genercCode ||
                    validationReason?.brandCode ||
                    validationReason?.yearPurchased ||
                    validationReason?.modeOfProcurement}
                </Typography>
              </Stack>
            </>
          )}
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            label="Supplies Category Code"
            value={ipsasCode.substring(0, 8)}
            disabled
            size="small"
            fullWidth
            error={suppliesCategoryCodeStatus === "invalid"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {" "}
                  {suppliesCategoryCodeStatus === "valid" && (
                    <CheckCircle color="success" fontSize="small" />
                  )}
                </InputAdornment>
              ),
            }}
            helperText={validationReason?.supplyCateogy}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            label="Generic Code"
            value={ipsasCode.substring(8, 15)}
            disabled
            size="small"
            fullWidth
            error={genericCodeStatus === "invalid"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {" "}
                  {genericCodeStatus === "valid" && (
                    <CheckCircle color="success" fontSize="small" />
                  )}
                </InputAdornment>
              ),
            }}
            helperText={validationReason?.genercCode}
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <TextField
            label="Brand Code"
            size="small"
            value={ipsasCode.substring(15, 19)}
            disabled
            fullWidth
            error={brandCodeStatus === "invalid"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {" "}
                  {brandCodeStatus === "valid" && (
                    <CheckCircle color="success" fontSize="small" />
                  )}
                </InputAdornment>
              ),
            }}
            helperText={validationReason?.brandCode}
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <TextField
            label="Year Purchased Code"
            value={ipsasCode.substring(20, 24)}
            disabled
            size="small"
            fullWidth
            error={yearPurchasedStatus === "invalid"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {" "}
                  {yearPurchasedStatus === "valid" && (
                    <CheckCircle color="success" fontSize="small" />
                  )}
                </InputAdornment>
              ),
            }}
            helperText={validationReason?.yearPurchased}
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            label="Mode of Procurement"
            value={ipsasCode.substring(24)}
            disabled
            size="small"
            fullWidth
            error={modeOfProcurementStatus === "invalid"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {" "}
                  {modeOfProcurementStatus === "valid" && (
                    <CheckCircle color="success" fontSize="small" />
                  )}
                </InputAdornment>
              ),
            }}
            helperText={validationReason?.modeOfProcurement}
          />
        </Grid>
      </Grid>
    );
  }
);

export default IPSASCodeInput;
