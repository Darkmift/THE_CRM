import { Button, Card, CardContent, Chip, Container, Typography } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import BasicTable from '../BasicTable';
import GenericForm from '../forms/GenericForm';
import type * as Yup from 'yup';
import type { CrudResult, FieldParam, GenericUknownValuesObject } from '@/types/index.type';

type Props = {
  formInitialState: GenericUknownValuesObject;
  dataSet: GenericUknownValuesObject[];
  tableRemoveHandler: (item: unknown) => void;
  viewTitle: string;
  addBtnText: string;
  formTitle: string;
  fields: FieldParam[];
  schema: Yup.ObjectSchema<Yup.AnyObject, Yup.AnyObject, unknown, ''>;
  processCrudFn: (item: GenericUknownValuesObject) => Promise<CrudResult>;
};

function compareObjects(obj1: unknown, obj2: unknown): boolean {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}

function CrudDashboard({
  viewTitle,
  addBtnText,
  formTitle,
  formInitialState,
  fields,
  dataSet,
  schema,
  tableRemoveHandler,
  processCrudFn,
}: Props) {
  const { t } = useTranslation();

  const [crudItem, setCrudItem] = useState<typeof formInitialState>(formInitialState);
  const [loadingStatus, setLoadingStatus] = useState(false);

  const openDeleteConfirmModal = () => {
    // use crudItem and open modal to confirm delete
    tableRemoveHandler(crudItem);
  };

  const handleSubmit = (item: typeof formInitialState) => {
    setLoadingStatus(true);
    processCrudFn(item)
      .then((result: CrudResult) => {
        console.log('🚀 ~ file: CrudDashboard.tsx:45 ~ .then ~ result:', result);
      })
      .catch((error: Error) => {
        console.log('🚀 ~ file: CrudDashboard.tsx:46 ~ processCrudFn ~ error:', error);
      })
      .finally(() => {
        setLoadingStatus(false);
      });
  };
  return (
    <Container sx={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <Typography variant="h4">{viewTitle}</Typography>
      <BasicTable
        dataset={dataSet}
        withCrudActions
        onDelete={openDeleteConfirmModal}
        onUpdate={setCrudItem}
      />
      <Button
        sx={{ height: '70px', width: 'max-content' }}
        onClick={() => setCrudItem(structuredClone(formInitialState))} //just to be safe :3
        variant="contained"
      >
        {addBtnText}
      </Button>
      <Card raised>
        <CardContent>
          <Typography variant="h5">{formTitle}</Typography>
          <Typography variant="h6">
            {`${t('currentMode')}: `}
            <Chip
              label={
                compareObjects(formInitialState, crudItem)
                  ? `${t('Create New')}`
                  : `${t('Updating')} ${crudItem?.id ? '> ' + crudItem?.id : ` ${t('entry')}`}`
              }
            />
          </Typography>
          <GenericForm
            handleSubmit={handleSubmit}
            initialValues={crudItem}
            schema={schema}
            fields={fields}
            loadingStatus={loadingStatus}
          />
        </CardContent>
      </Card>
    </Container>
  );
}

export default CrudDashboard;
