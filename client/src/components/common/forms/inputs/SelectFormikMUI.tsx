import { FormControl } from '@mui/material';
import { Field } from 'formik';
import SelectMultiple from '@/components/common/SelectMultiple';
import {
  FormikFieldProps,
  FormikFieldTouchedOrErrorObject,
  GenericStringValuesObject,
} from '@/types/index.type';

type Props = {
  isMultiLine?: boolean;
  fieldName: string;
  touched: FormikFieldTouchedOrErrorObject;
  errors: FormikFieldTouchedOrErrorObject;
  options: GenericStringValuesObject[];
  optionLabelKey: string;
  optionIdKey: string;
};

function SelectFormikMUI({
  optionLabelKey,
  optionIdKey,
  isMultiLine,
  options,
  fieldName,
  touched,
  errors,
}: Props) {
  const isError = !!(touched[fieldName] && errors[fieldName]);
  return (
    <Field name={fieldName} key={fieldName}>
      {({ field }: FormikFieldProps) => (
        <FormControl fullWidth margin="normal" error={isError}>
          <SelectMultiple
            multiple={!!isMultiLine}
            value={field.value}
            handleChange={field.onChange}
            name={field.name}
            options={options}
            optionLabelKey={optionLabelKey}
            optionIdKey={optionIdKey}
            error={isError}
            helperText={touched[fieldName] && errors[fieldName]}
          />
        </FormControl>
      )}
    </Field>
  );
}

export default SelectFormikMUI;
