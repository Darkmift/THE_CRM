import useCustomTheme from '@/hooks/useCustomLocal';
import { FormikFieldProps, FormikFieldTouchedOrErrorObject } from '@/types/index.type';
import { FormControl, TextField } from '@mui/material';
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

function InputFormikMUI({
  disabled,
  isMultiLine,
  rowNums,
  fieldName,
  label,
  touched,
  errors,
}: Props) {
  const isError = !!(touched[fieldName] && errors[fieldName]);
  const { isRtl } = useCustomTheme();
  return (
    <Field name={fieldName} key={fieldName}>
      {({ field }: FormikFieldProps) => (
        <FormControl fullWidth margin="normal" error={isError}>
          <TextField
            disabled={disabled}
            key={fieldName}
            sx={{
              py: 1,
              '& label': {
                transformOrigin: isRtl ? 'right !important' : '',
                left: isRtl ? 'inherit !important' : '0 !important',
                right: isRtl ? '0 !important' : 'inherit !important',
                overflow: 'unset',
              },
            }}
            fullWidth
            variant="standard"
            id={fieldName}
            name={field.name}
            value={field.value?field.value:''}
            // InputLabelProps={{ shrink: true }}
            // value={field.value}
            onChange={field.onChange}
            label={label || field.name.toUpperCase()}
            type="text"
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
