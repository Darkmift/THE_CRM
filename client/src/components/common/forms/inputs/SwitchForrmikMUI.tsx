import { FormikFieldProps, FormikFieldTouchedOrErrorObject } from '@/types/index.type';
import { FormHelperText } from '@mui/material';
import { FormControlLabel } from '@mui/material';
import { Switch } from '@mui/material';
import { FormControl } from '@mui/material';
import { Field } from 'formik';

type Props = {
  isMultiLine?: boolean;
  rowNums?: number;
  fieldName: string;
  label?: string;
  touched: FormikFieldTouchedOrErrorObject;
  errors: FormikFieldTouchedOrErrorObject;
  disabled?: boolean;
};

function SwitchForrmikMUI({ disabled, fieldName, label, touched, errors }: Props) {
  const isError = !!(touched[fieldName] && errors[fieldName]);

  return (
    <Field name={fieldName} key={fieldName}>
      {({ field }: FormikFieldProps) => (
        <FormControl error={isError}>
          <FormControlLabel
            sx={{ color: isError ? '#d32f2f' : '', margin: '15px 0', padding: '0' }}
            value={!!field.value}
            label={label || fieldName.toUpperCase()}
            control={
              <Switch
                disabled={disabled}
                checked={!!field.value}
                onChange={field.onChange}
                name={field.name}
              />
            }
          />

          <FormHelperText error={isError}>{isError ? errors[fieldName] : ' '}</FormHelperText>
        </FormControl>
      )}
    </Field>
  );
}

export default SwitchForrmikMUI;
