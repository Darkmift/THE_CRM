import { FormikFieldProps, FormikFieldTouchedOrErrorObject } from '@/types/index.type';
import { FormControl, TextField } from '@mui/material';
import { Field } from 'formik';

type Props = {
  isMultiLine?: boolean;
  rowNums?: number;
  fieldName: string;
  touched: FormikFieldTouchedOrErrorObject;
  errors: FormikFieldTouchedOrErrorObject;
  disabled?: boolean;
};

function InputFormikMUI({ disabled, isMultiLine, rowNums, fieldName, touched, errors }: Props) {
  const isError = !!(touched[fieldName] && errors[fieldName]);

  return (
    <Field name={fieldName} key={fieldName}>
      {({ field }: FormikFieldProps) => (
        <FormControl fullWidth margin="normal" error={isError}>
          <TextField
            disabled={disabled}
            key={fieldName}
            sx={{ py: 1 }}
            fullWidth
            variant={field.name === 'description' ? 'outlined' : 'standard'}
            id={fieldName}
            name={field.name}
            value={field.value}
            onChange={field.onChange}
            label={field.name.toUpperCase()}
            type="text"
            // InputLabelProps={{shrink: item === 'image'}}
            error={isError}
            helperText={touched[fieldName] && errors[fieldName]}
            {...(isMultiLine
              ? {
                  multiline: true,
                  rows: rowNums,
                }
              : {})}
          />
        </FormControl>
      )}
    </Field>
  );
}

export default InputFormikMUI;
