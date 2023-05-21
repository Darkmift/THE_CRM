import { Container } from '@mui/material';
import { useTranslation } from 'react-i18next';

function ProjectEditPage() {
  const { t } = useTranslation();
  return <Container sx={{ padding: '20px' }}>{t('ProjectEditPage')}</Container>;
}

export default ProjectEditPage;
