import { TextField } from '@mui/material';
import React from 'react'
import { NumericFormat, NumericFormatProps } from 'react-number-format';

interface CustomProps {
    onChange: (event: { target: { name: string; value: string } }) => void;
    name: string;
  }

const NumericFormatCustom = React.forwardRef<NumericFormatProps, CustomProps>(
    function NumericFormatCustom(props, ref) {
      const { onChange, ...other } = props;
  
      return (
        <NumericFormat
          {...other}
          getInputRef={ref}
          onValueChange={(values) => {
            onChange({
              target: {
                name: props.name,
                value: values.value,
              },
            });
          }}
          thousandSeparator
          valueIsNumericString
          prefix="$"
        />
      );
    },
  );
export default function NumberField(props: any) {
    const [values, setValues] = React.useState({
        textmask: '(100) 000-0000',
        numberformat: '1320',
    });
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
    };
    return (
        <TextField
            {...props}
            value={values.numberformat}
            onChange={handleChange}
            InputProps={{
                inputComponent: NumericFormatCustom as any,
            }}
            variant="outlined"
        />
  )
}
