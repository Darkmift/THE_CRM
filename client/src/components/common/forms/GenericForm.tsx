import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import InputFormikMUI from './inputs/InputFormikMUI';
import { LoadingButton } from '@mui/lab';
import { FieldParam, FormikFieldTouchedOrErrorObject, YupCustomFormData } from '@/types/index.type';
import SwitchForrmikMUI from './inputs/SwitchForrmikMUI';

type Props = {
  fields: FieldParam[];
  initialValues: YupCustomFormData;
  schema: Yup.ObjectSchema<Yup.AnyObject>;
  validator?: (arg: YupCustomFormData) => object;
  handleSubmit: (arg: YupCustomFormData) => void;
  loadingStatus: boolean;
};

const validate = (values: YupCustomFormData) => {
  console.log('🚀 ~ file: GenericForm.tsx:18 ~ validate ~ values:', values);
  return {};
};

function GenericForm({
  loadingStatus,
  validator = validate,
  handleSubmit,
  initialValues,
  schema,
  fields,
}: Props) {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={handleSubmit}
      validate={validator}
      enableReinitialize
    >
      {({ errors, touched, setFieldValue }) => (
        <Form>
          {fields
            .sort((f1, f2) => f1.order - f2.order)
            .map((item, key) => {
              let dynamicInput = <></>;

              switch (item.type) {
                case 'simple':
                  dynamicInput = (
                    <InputFormikMUI
                      key={key}
                      fieldName={item.name}
                      label={item.label}
                      touched={touched as FormikFieldTouchedOrErrorObject}
                      errors={errors}
                    />
                  );
                  break;
                case 'textarea':
                  dynamicInput = (
                    <InputFormikMUI
                      key={key}
                      isMultiLine={true}
                      rowNums={4}
                      fieldName={item.name}
                      touched={touched as FormikFieldTouchedOrErrorObject}
                      errors={errors}
                    />
                  );
                  break;
                case 'boolean':
                  dynamicInput = (
                    <SwitchForrmikMUI
                      key={key}
                      label={item.label}
                      fieldName={item.name}
                      touched={touched as FormikFieldTouchedOrErrorObject}
                      errors={errors}
                    />
                  );
                  break;

                default:
                  dynamicInput = <></>;
                  break;
              }
              return dynamicInput;
            })}

          <LoadingButton
            fullWidth
            variant="contained"
            loading={loadingStatus}
            loadingIndicator="Loading…"
            type="submit"
          >
            Submit
          </LoadingButton>
        </Form>
      )}
    </Formik>
  );
}

export default GenericForm;
