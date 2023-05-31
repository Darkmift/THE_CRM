import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import mockProjects from '@/mockData/projects.json';
import CrudDashboard from '@/components/common/partial-views/CrudDashboard';
import type { FieldParam, YupCustomFormData } from '@/types/index.type';

const initialValues = { id: undefined, Project: 0, isEnabled: false };

const schema = Yup.object({
  name: Yup.string().required('name is required'),
  image: Yup.string().required('image is required'), //TODO: apply file input logic
  description: Yup.string().required('image is required'),
});

const fields: FieldParam[] = [
  {
    name: 'name',
    order: 1,
    type: 'simple',
  },
  {
    name: 'image',
    order: 2,
    type: 'simple',
  },
  {
    name: 'description',
    order: 3,
    type: 'simple',
  },
];

function ProjectDashboardPage() {
  const { t } = useTranslation();

  const handleSubmit = async (item: YupCustomFormData) => {
    console.log('🚀 ~ file: index.tsx:37 ~ handleSubmit ~ item:', item);
    return { success: true, message: 'dummy text' };
  };

  return (
    <CrudDashboard
      formInitialState={initialValues}
      dataSet={mockProjects}
      tableRemoveHandler={(item) => {
        console.log('remove handler:', item);
      }}
      viewTitle={t('projectCrudPageTitle')}
      addBtnText={t('addProject')}
      formTitle={t('projectFormTitle')}
      fields={fields}
      schema={schema}
      processCrudFn={handleSubmit}
    />
  );
}

export default ProjectDashboardPage;
