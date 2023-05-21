import { Container } from '@mui/material';
import { useTranslation } from 'react-i18next';

function ProjectDashboardPage() {
  const { t } = useTranslation();
  return <Container sx={{ padding: '20px' }}>{t('ProjectPage')}</Container>;
}

export default ProjectDashboardPage;
