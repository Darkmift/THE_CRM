import { Container } from '@mui/material';
import { useTranslation } from 'react-i18next';

function ProjectAddPage() {
  const { t } = useTranslation();
  return <Container sx={{ padding: '20px' }}>{t('ProjectAddPage')}</Container>;
}

export default ProjectAddPage;
