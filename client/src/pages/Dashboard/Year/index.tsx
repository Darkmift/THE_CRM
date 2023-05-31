import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import mockYears from '@/mockData/years.json';
import CrudDashboard from '@/components/common/partial-views/CrudDashboard';
import type { FieldParam, YupCustomFormData } from '@/types/index.type';

const initialValues = { id: undefined, year: 0, isEnabled: false };

const schema = Yup.object({
  year: Yup.number()
    .min(2000, 'Year is too early')
    .max(2100, 'year is too late')
    .required('Year is required'),
  isEnabled: Yup.boolean(),
  // .oneOf([true], 'Field must be checked').required('isEnabled is required'),
});

const fields: FieldParam[] = [
  {
    name: 'year',
    order: 1,
    type: 'simple',
  },
  {
    name: 'isEnabled',
    label: 'Enabled',
    order: 2,
    type: 'boolean',
  },
];

function YearDashboard() {
  const { t } = useTranslation();

  const handleSubmit = async (year: YupCustomFormData) => {
    console.log('🚀 ~ file: index.tsx:18 ~ handleSubmit ~ year:', year);
    return { success: true, message: 'dummy text' };
  };

  return (
    <CrudDashboard
      formInitialState={initialValues}
      dataSet={mockYears}
      tableRemoveHandler={(item) => {
        console.log('remove handler:', item);
      }}
      viewTitle={t('yearCrudPageTitle')}
      addBtnText={t('addYear')}
      formTitle={t('yearFormTitle')}
      fields={fields}
      schema={schema}
      processCrudFn={handleSubmit}
    />
  );
}

export default YearDashboard;
